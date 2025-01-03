import {expect, FrameLocator, Locator, test} from "@playwright/test";
import { describe } from "node:test";

describe("Home_work_12", () => {
    test("Task_1", async ( {page} ) => {

        await page.goto("https://the-internet.herokuapp.com/login");

        const userNameField: Locator = page.locator("#username");
        const passwordField: Locator = page.locator("#password");
        const loginButton: Locator = page.locator(".radius");
        const message: Locator = page.locator("#flash");
        const logoutButton: Locator = page.locator(".button .icon-signout");

        // Login attempt with invalid credentials
        await userNameField.fill('Test Username');
        await passwordField.fill('Test Password');
        loginButton.click();

        expect(message).toBeVisible();
        await expect(message).toContainText('Your username is invalid!');

        // Login attempt with valid credentials
        userNameField.clear();
        passwordField.clear();
        await userNameField.fill('tomsmith');
        await passwordField.fill('SuperSecretPassword!');
        loginButton.click();

        expect(message).toBeVisible();
        await expect(message).toContainText('You logged into a secure area!');

        // Logout
        logoutButton.click();

        expect(message).toBeVisible();
        await expect(message).toContainText('You logged out of the secure area!');

    });

    test("Task_2", async ( {page} ) => {

        await page.goto("https://demo.guru99.com/test/radio.html");

        const checkbox1: Locator = page.locator('[value="checkbox1"]');
        const checkbox2: Locator = page.locator('[value="checkbox2"]');
        const checkbox3: Locator = page.locator('[value="checkbox3"]');

        let checkboxes: Locator[] = [checkbox1, checkbox2, checkbox3]

        for (let checkbox of checkboxes) {
            await checkbox.click();
        }

        for (let checkbox of checkboxes) {
            await checkbox.check();
        }

        for (let checkbox of checkboxes) {
            await checkbox.click();
        }

        for (let checkbox of checkboxes) {
            await checkbox.uncheck();
        }

    });

    test("Task_3", async ( {page} ) => {

        await page.goto("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select");

        const iframeResult: FrameLocator = page.frameLocator('[name="iframeResult"]');
        const chooseACarDropdown: Locator = iframeResult.locator('#cars');
        const submitButton: Locator = iframeResult.locator('[value="Submit"]');
        const result: Locator = iframeResult.locator(".w3-border");

        await chooseACarDropdown.selectOption('saab');
        const selectedValue: string = await chooseACarDropdown.inputValue();
        expect(selectedValue).toBe('saab');
        await submitButton.click();
        await expect(result).toHaveText("cars=saab");

    });

    test("Task_4", async ( {page} ) => {

        await page.goto("http://formy-project.herokuapp.com/form");

        const firstNameField: Locator = page.getByPlaceholder("Enter first name");
        const lastNameField: Locator = page.getByPlaceholder("Enter last name");
        const jobTitleField: Locator = page.getByPlaceholder("Enter your job title");
        const collegeRadioButton: Locator = page.locator('[value="radio-button-2"]');
        const maleCheckbox: Locator = page.locator('#checkbox-1');
        const yearsOfExperience: Locator = page.locator('#select-menu');
        const datePicker: Locator = page.locator('#datepicker');
        const submitButton: Locator = page.getByRole('button');
        const submissionForm: Locator = page.getByRole('alert');

        await firstNameField.fill("Sam");
        await lastNameField.fill("Robertson");
        await jobTitleField.fill("Test Automation Engineer");
        await collegeRadioButton.click();
        await maleCheckbox.click();
        await yearsOfExperience.selectOption('5-9');
        await datePicker.fill("14/12/2024");
        await submitButton.click();

        await expect(submissionForm).toHaveText("The form was successfully submitted!");

    });

    test("Task_5", async ( {page} ) => {

        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=common/home");

        const allCategoriesDropDown: Locator = page.getByRole('button', { name: 'All Categories' });
        const phonesPDAsOption: Locator = page.getByRole('link', { name: 'Phones & PDAs' });
        const searchButton: Locator = page.getByText("Search");
        const minimumPriceInput: Locator = page.getByPlaceholder("Minimum Price").last();
        const maximumPriceInput: Locator = page.getByPlaceholder("Maximum Price").last();
        const filterResultsCount: Locator = page.getByText('Showing 1 to 8 of 8 (1 Pages)');
        const addToCartButton: Locator = page.getByTitle('Add to Cart').first();
        const allPhones: Locator = page.getByText('HTC Touch HD');
        const singlePhone: Locator = page.getByAltText('HTC Touch HD').first();
        const cartIcon: Locator = page.getByRole('button', {name: '0'});
        const total: Locator = page.getByRole('row', { name: 'Total: $146.00' });
        
        await allCategoriesDropDown.click();
        await phonesPDAsOption.click();
        await searchButton.click();
        await minimumPriceInput.clear();
        await minimumPriceInput.fill('135');
        await maximumPriceInput.clear();
        await maximumPriceInput.fill('165');
        await expect(filterResultsCount).toBeVisible();
        await expect(allPhones).toHaveCount(8);
        await singlePhone.hover();
        await addToCartButton.click();
        await cartIcon.click();
        await expect(total).toBeVisible();
    });
})