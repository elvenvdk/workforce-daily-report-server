import { TypedRequestBody, TypedResponse, RegisterUserType, RegisterUserResponseType } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Auth from "../models/auth.ts";
import Worker from "../models/worker.ts";
import { sendEmail } from "../aws/emailService.ts";
import fs from "fs";

const verifyPassword = async (currentPassword: string, userPassword: string) => await bcrypt.compare(currentPassword, userPassword);

export const registerUser = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { userName, password } = req.body;
    if (!userName && !password) {
      res.status(400).json({ msg: "Username and Password Are Required" });
    }
    if (userName === "" || password === "") {
      res.status(400).json({ msg: "Username and Password Are Required" });
    }
    // Check if user exists
    const existingUser = await Worker.findOne({
      email: userName,
    });
    if (existingUser) {
      const userAuthCheck = await Auth.findOne({
        user: existingUser.id,
      });
      if (userAuthCheck) {
        return res.status(400).json({ msg: "User currently exists.  Please log in" });
      }
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      // Create token
      jwt.sign(
        {
          userId: existingUser.id,
          level: existingUser.level,
          role: existingUser.role,
        },
        `${process.env.TOKEN_KEY}`,
        { algorithm: "HS256" },
        async (err, userToken) => {
          if (err) {
            console.log("TOKEN ERROR: ", err);
            return res.status(400).json({ msg: err.message });
          }
          const newAuthRegistration = await Auth.create({
            userName,
            password: encryptedPassword,
            user: existingUser.id,
            userToken,
          });

          if (newAuthRegistration instanceof Auth) {
            await Worker.findOneAndUpdate(
              {
                _id: existingUser.id,
              },
              {
                $set: {
                  authorization: newAuthRegistration._id,
                },
              }
            );
            res.status(201).json({ msg: "User authorization successfully created" });
          } else {
            return res.status(500).json({ msg: "There was an error updating the user" });
          }
        }
      );
    } else {
      return res.status(400).json({ msg: "Please enter user's profile before registering or updating their username and password" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(404).json({ msg: "Username and Password Are Required" });
    }
    // const verified = await verifyPassword(password, userAuth.password)
    // if (!verified) {
    //   return res.status(404).json({ msg: "Username or Password not recognized" });
    // }
    const userAuth = await Auth.findOne({ userName });
    if (userAuth) {
      const verifiedPassword = await verifyPassword(password, userAuth.password);

      // Get user info
      const verifiedUser = await Worker.findOne({ _id: userAuth.user });
      if (!verifiedPassword) {
        return res.status(404).json({ msg: "Username or Password Incorrect" });
      }
      if (verifiedUser) {
        // Mark user as active
        // Create token
        jwt.sign({ userId: verifiedUser.id, level: 1 }, `${process.env.TOKEN_KEY}`, { algorithm: "HS256" }, async (err, userToken) => {
          if (err) {
            console.log("TOKEN ERROR: ", err);
            return res.status(400).json({ msg: err.message });
          } else {
            await Auth.findOneAndUpdate(
              {
                user: verifiedUser.id,
              },
              {
                $set: {
                  userToken,
                },
              }
            );

            await Worker.findOneAndUpdate(
              {
                id: verifiedUser.id,
              },
              {
                $set: {
                  userToken,
                },
              }
            );
            const user = {
              userId: verifiedUser.id,
              firstName: verifiedUser.firstName,
              lastName: verifiedUser.lastName,
              middleInitial: verifiedUser.middleInitial ? verifiedUser.middleInitial : null,
              class: verifiedUser.class,
              level: verifiedUser.level,
              role: verifiedUser.role,
            };
            // res.send(user);
            res.cookie("userToken", userToken).send({ msg: "User successfully set", user });
          }
        });
      } else {
        return res.status(404).json({ msg: "Username or Password not recognized" });
      }
    } else {
      return res.status(401).json({ msg: "Cannot authenicate" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { userName } = req.body;
    const userAuth = await Auth.findOne({ userName });
    if (userAuth) {
      // Mark user active false
      userAuth.active = false;

      // Remove token from user document
      const verifiedUser = await Worker.findById(userAuth.id);
      if (verifiedUser) {
        verifiedUser.userToken = null;
        res.status(200).send("User successfully logged out");
      } else {
        res.status(400).json({ msg: "Could not verify user" });
      }
    } else {
      res.status(400).json({ msg: "Error finding user auth" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUsername = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;
    await Auth.findOneAndUpdate(
      {
        user: id,
      },
      {
        userName,
      }
    );
    res.status(201).json({ msg: ", Username successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await Auth.findOneAndUpdate(
      {
        user: id,
      },
      {
        encryptedPassword,
      }
    );
    res.status(201).json({ msg: ", Username successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

const setIntSixCodes = () => {
  const randSix = Array.from({ length: 6 }, (r: any, idx: number) => getRandomInt(1, 9));
  const time = 600000;
  fs.writeFileSync("./tempAuthCode.txt", randSix.toString());
  setInterval(() => {
    fs.writeFileSync("./tempAuthCode.txt", randSix.toString());
  }, time);
};

const getIntSixCodes = () => {
  return fs.readFileSync("./tempAuthCode.txt");
};

export const confirmationEmail = async (req: TypedRequestBody<any>, res: TypedResponse<RegisterUserResponseType>) => {
  // const randSix: number[] = [];
  // Array.from({ length: 6 }, (r: any, idx: number) => {
  //   randSix.push(getRandomInt(1, 9));
  // });
  setIntSixCodes();
  console.log("GET RAND SIX: ", getIntSixCodes().toString());
  const { body } = req;
  body.code = getIntSixCodes().toString();
  body.text = "Please click the link and enter the 6 digit code below";

  try {
    fs.writeFileSync("./tempAuthCode.txt", body.code);
    const emailRes = await sendEmail(body, body.email);
    res.send(emailRes);
  } catch (error) {
    console.log("SEND MAIL ERROR: ", error);
  }
};

export const getIntCode = async (req: TypedRequestBody<any>, res: TypedResponse<RegisterUserResponseType>) => {
  setIntSixCodes();
  try {
    const authIntCode = getIntSixCodes();
    res.send(authIntCode);
  } catch (error) {
    console.log("SEND MAIL ERROR: ", error);
  }
};
