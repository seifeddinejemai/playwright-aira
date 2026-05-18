// login.steps.ts - CLEANED UP
import { Given, When, Then } from "@cucumber/cucumber";
import { Page } from "@playwright/test";

Given('I navigate to {string}', async function (url: string) {
  await (this.page as Page).goto(url);
});

When('I enter my email {string}', async function (email: string) {
  await (this.page as Page).getByRole('textbox', { name: 'E-mail :' }).fill(email);
});

When('I enter my password {string}', async function (password: string) {
  await (this.page as Page).getByRole('textbox', { name: 'Mot de passe :' }).fill(password);
});

When('I click the button login', async function () {
  await (this.page as Page).getByRole('button', { name: 'Connexion' }).click();
});

Then('I should see {string}', async function (expectedText: string) {
  const page = this.page as Page;
  await page.waitForLoadState('networkidle');
  const content = await page.textContent("body");
  if (!content || !content.includes(expectedText)) {
    throw new Error(`Expected text not found: ${expectedText}`);
  }
});