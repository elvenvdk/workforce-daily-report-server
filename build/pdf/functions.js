import puppeteer from "puppeteer";
export const printPDF = async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/checklistreports-pdf', { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', path: './pdfs/checklist-report.pdf' });
    await browser.close();
    return pdf;
};
