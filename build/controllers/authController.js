import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Auth from '../models/auth.ts';
import Worker from '../models/worker.ts';
const verifyPassword = async (currentPassword, userPassword) => await bcrypt.compare(currentPassword, userPassword);
export const registerUser = async (req, res) => {
    try {
        const { userName, password, user } = req.body;
        if (!userName && !password) {
            res.status(400).json({ msg: 'Username and Password Are Required' });
        }
        // Check if user exists
        const existingUser = await Worker.findOne({
            _id: user
        });
        if (existingUser) {
            res.status(400).json({ msg: 'User already exists. Please log in' });
        }
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        // Create token
        const userToken = jwt.sign({ userId: user }, `${process.env.TOKEN_KEY}`);
        const newAuthRegistration = await Auth.create({
            userName,
            password: encryptedPassword,
            user,
            userToken
        });
        if (newAuthRegistration instanceof Auth) {
            await Worker.findOneAndUpdate({
                _id: user
            }, {
                authorization: newAuthRegistration._id
            });
            res.status(201).json({ msg: 'User authorization successfully created' });
        }
        else {
            res.status(500).json({ msg: 'There was an error updating the user' });
        }
    }
    catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(404).json({ msg: 'Username and Password Are Required' });
        }
        const userAuth = await Auth.findOne({ userName });
        if (userAuth && await verifyPassword(password, userAuth.password)) {
            // Get user info
            const verifiedUser = await Worker.findOne({ id: userAuth.user });
            if (verifiedUser) {
                // Mark user as active
                userAuth.active = true;
                // Create token
                const token = jwt.sign({ userId: verifiedUser._id, class: verifiedUser.class }, `${process.env.TOKEN_KEY}`);
                verifiedUser.userToken = token;
                const user = {
                    firstName: verifiedUser.firstName,
                    lastName: verifiedUser.lastName,
                    middleInitial: verifiedUser.middleInitial ? verifiedUser.middleInitial : null,
                    class: verifiedUser.class,
                    userToken: verifiedUser.userToken
                };
                res.cookie('user', user);
            }
            else {
                res.status(400).json({ msg: 'Unable to verifiy user' });
            }
        }
        else {
            res.status(401).json({ msg: 'Cannot authenicate' });
        }
    }
    catch (error) {
        console.log(error);
    }
};
export const logout = async (req, res) => {
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
                res.status(200).send('User successfully logged out');
            }
            else {
                res.status(400).json({ msg: 'Could not verify user' });
            }
        }
        else {
            res.status(400).json({ msg: 'Error finding user auth' });
        }
    }
    catch (error) {
        console.log(error);
    }
};
export const updateUsername = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;
        await Auth.findOneAndUpdate({
            user: id
        }, {
            userName
        });
        res.status(201).json({ msg: ', Username successfully updated' });
    }
    catch (error) {
        console.log(error);
    }
};
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        await Auth.findOneAndUpdate({
            user: id
        }, {
            encryptedPassword
        });
        res.status(201).json({ msg: ', Username successfully updated' });
    }
    catch (error) {
        console.log(error);
    }
};
