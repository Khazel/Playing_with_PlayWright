import {expect, Locator, test} from "@playwright/test";
import { describe } from "node:test";

describe('Home_work_11', () => {

    test('Task_1', async ( {page} ) => {

        await page.goto("https://example.com");
    
        const title: string = await page.title();
        const pageUrl: string = page.url();
        const text: string | null = await page.textContent('body');
        const header: Locator = page.locator('h1');
    
        expect(title).toBe("Example Domain");
        expect(pageUrl).toContain("example.com");
        expect(text).toMatch(/This domain is for use in illustrative examples/);
        await expect(header).toHaveText(/Example Domain/);

    });

    test('Task_2', async ( {page} ) => {

        await page.goto("https://playwright.dev");

        const pageUrl: string = page.url();
        const getStartedButton: Locator = page.locator('a:text("Get started")');

        expect(pageUrl.startsWith('https://playwright.dev')).toBeTruthy();
        await expect(getStartedButton).toHaveCount(1);

    });

    test('Task_3', async ( {page} ) => {

        await page.goto("https://www.google.com");

        const searchTextArea: Locator = page.getByTitle('Пошук');
        const googleSearchButton: Locator = page.getByText("Пошук Google").first();
        const searchResultArea: Locator[] = await page.locator('//div[@id = "rso"]/div/div').all();

        await searchTextArea.fill('Playwright');
        await googleSearchButton.click();

        for (const l of searchResultArea) {
            expect(l).toContainText('Playwright')
        }

    });

    test('Task_4', async ( {page} ) => {

        await page.goto("https://playwright.dev");

        const title: string = await page.title();

        expect(title).toContain("Playwright");
        await page.locator('a:text("Get started")').click();
        await expect(page).toHaveURL(/.*docs/);
    });
})