import puppeteer from 'puppeteer';
import { marked } from 'marked';
import { promises as fs } from 'fs';
import path from 'path';

interface PageDimensions {
    width: number;
    height: number;
}

async function convertMarkdownToImage(markdownPath: string): Promise<void> {
    try {
        const markdownContent = await fs.readFile(markdownPath, 'utf-8');
        
        const htmlContent = marked(markdownContent);
        
        const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        padding: 20px;
                        max-width: 900px;
                        margin: 0 auto;
                        background: white;
                        color: #24292e;
                    }
                    pre {
                        background-color: #f6f8fa;
                        padding: 16px;
                        border-radius: 6px;
                        overflow-x: auto;
                    }
                    code {
                        font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
                        font-size: 85%;
                    }
                    img {
                        max-width: 100%;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        margin-top: 24px;
                        margin-bottom: 16px;
                        font-weight: 600;
                        line-height: 1.25;
                    }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `;

        await fs.mkdir('output', { recursive: true });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        const dimensions = await page.evaluate((): PageDimensions => {
            return {
                width: document.documentElement.offsetWidth,
                height: document.documentElement.offsetHeight
            };
        });

        await page.setViewport({
            width: dimensions.width,
            height: dimensions.height,
            deviceScaleFactor: 2
        });

        const outputPath = path.join(
            'output',
            `${path.basename(markdownPath, '.md')}.png`
        );

        await page.screenshot({
            path: outputPath,
            fullPage: true,
            type: 'png'
        });

        await browser.close();
        console.log(`Successfully converted ${markdownPath} to ${outputPath}`);
    } catch (error) {
        console.error('Conversion error:', error);
        throw error;
    }
}

async function main(): Promise<void> {
    const inputFile = process.argv[2];
    
    if (!inputFile) {
        console.log('Usage: npm start <markdown-file>');
        console.log('Example: npm start input/document.md');
        return;
    }

    await convertMarkdownToImage(inputFile);
}

main().catch(console.error);