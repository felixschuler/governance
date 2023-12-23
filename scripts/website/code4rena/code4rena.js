import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const jsonFilePath = 'code4rena.json';
const reports = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

async function downloadPDF(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.pdf({ path: outputPath, format: 'A4' });
  await browser.close();
}

async function processReports() {
  for (const report of reports) {
    const auditee = report.auditee;
    const date = report.date;
    const url = report.report;
    const fileName = `${auditee}.pdf`;
    const dir = path.join(auditee, date);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, fileName);
    await downloadPDF(url, filePath);
    console.log(`Downloaded ${url} to ${filePath}`);
  }
}

processReports().catch(console.error);
