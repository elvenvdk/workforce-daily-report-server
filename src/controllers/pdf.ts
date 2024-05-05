import { TypedRequestBody, TypedResponse, RegisterUserType, RegisterUserResponseType } from "'../types'.ts";

import { printPDF } from "../pdf/functions.js";
import puppeteer from "puppeteer";

export const savePdf = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  console.log("SAVING PDF...");
  try {
    const checklistPdf = await printPDF();
    if (checklistPdf) {
      res.send({ msg: true });
    } else res.send({ msg: false });
  } catch (error) {
    console.log(error);
  }
};

export const createPdf = async (req: TypedRequestBody<RegisterUserType>, res: TypedResponse<RegisterUserResponseType>) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/checklistreports-pdf", { waitUntil: "networkidle2" });
    const pdf = await page.pdf({ format: "A4", path: "./pdfs/checklist-report.pdf" });
    if (!pdf) console.log("PDF ERROR: no pdf...");
    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
