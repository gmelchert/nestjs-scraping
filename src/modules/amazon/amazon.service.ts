import { Injectable } from '@nestjs/common';
import { executablePath } from 'puppeteer';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AmazonService {
    async findAllProducts(products: string) {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: executablePath(),
        });

        try {
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(1200000);

            await Promise.all([
                page.waitForNavigation(),
                page.goto('https://amazon.com')
            ])

            await page.type('#twotabsearchtextbox', products);
            await Promise.all([
                page.waitForNavigation(),
                page.click('#nav-search-submit-button')
            ])

            return page.evaluate(() => {
                const resultItems = Array.from(document.querySelectorAll('.s-search-results .s-result-item[data-component-type]'))

                const itemsParsed = resultItems.map(resultItem => {
                    const url = resultItem.querySelector('a').href;
                    const title = resultItem.querySelector('.s-title-instructions-style h2 span')?.textContent;
                    const price = resultItem.querySelector('.a-price .a-offscreen')?.textContent;

                    return ({
                        url,
                        title,
                        price,
                    })
                })

                return itemsParsed
            });
        } catch (err) {
            return {
                success: false,
                message: 'Fail to scrap site',
            }
        } finally {
            await browser.close();
        }
    }
}
