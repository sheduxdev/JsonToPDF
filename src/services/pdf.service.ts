import fs from 'fs/promises';
import path from 'path';
import puppeteer, { Browser, PDFOptions as PuppeteerPDFOptions } from 'puppeteer';
import handlebars from 'handlebars';
import { PDFData } from '../types';
import { config } from '../config';

export class PDFService {
    private static browser: Browser | null = null;

    private static async getBrowser(): Promise<Browser> {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: config.puppeteer.headless as any,
                args: config.puppeteer.args,
            });
        }
        return this.browser;
    }

    public static async closeBrowser(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }

    private static registerHelpers(): void {
        if (handlebars.helpers && 'math' in handlebars.helpers) return;

        handlebars.registerHelper('math', (lvalue: string | number, operator: string, rvalue: string | number) => {
            const left = parseFloat(lvalue.toString());
            const right = parseFloat(rvalue.toString());

            const operations: Record<string, number | string> = {
                '+': left + right,
                '-': left - right,
                '*': (left * right).toFixed(2),
                '/': left / right,
                '%': left % right,
            };

            return operations[operator];
        });
    }

    public static async generatePDF(data: PDFData): Promise<void> {
        const startTime = performance.now();
        let browser: Browser | null = null;

        try {
            const templatePath = path.join(process.cwd(), 'template.html');
            const templateHtml = await fs.readFile(templatePath, 'utf8');

            this.registerHelpers();
            const template = handlebars.compile(templateHtml);
            const finalHtml = template({ ...data, ui: config.ui });

            const pdfOptions: PuppeteerPDFOptions = {
                format: config.pdf.format,
                printBackground: true,
                margin: config.pdf.margin,
                path: config.pdf.fileName,
            };

            browser = await this.getBrowser();
            const page = await browser.newPage();

            await page.setViewport(config.puppeteer.viewport);
            await page.setContent(finalHtml, { waitUntil: 'networkidle0' });
            await page.pdf(pdfOptions);
            await page.close();

            const endTime = performance.now();
            const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
            console.log(`[SUCCESS] ${config.pdf.fileName} (${elapsedTime}s)`);
        } catch (err) {
            throw err;
        }
    }
}
