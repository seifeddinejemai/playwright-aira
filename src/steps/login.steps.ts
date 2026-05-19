import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../pages/loginpage";

setDefaultTimeout(30 * 1000);

// Helper pour récupérer la LoginPage depuis le contexte Cucumber
function getLoginPage(context: any): LoginPage {
  if (!context.loginPage) {
    context.loginPage = new LoginPage(context.page);
  }
  return context.loginPage;
}

Given('I navigate to {string}', async function (url: string) {
  const loginPage = getLoginPage(this);
  await loginPage.navigateTo(url);
});

When('I enter my email {string}', async function (email: string) {
  const loginPage = getLoginPage(this);
  await loginPage.enterEmail(email);
});

When('I enter my password {string}', async function (password: string) {
  const loginPage = getLoginPage(this);
  await loginPage.enterPassword(password);
});

When('I click the button login', async function () {
  const loginPage = getLoginPage(this);
  await loginPage.clickLogin();
});

Then('I should see {string}', async function (expectedText: string) {
  const loginPage = getLoginPage(this);
  await loginPage.shouldSeeText(expectedText);
});
// import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
// import { expect, Page } from "@playwright/test";

// setDefaultTimeout(30 * 1000); // 30 secondes pour tous les steps

// Given('I navigate to {string}', async function (url: string) {
//   const page = this.page as Page;
//   await page.goto(url);
//   // Attendre que la page soit réellement prête
//   await page.waitForLoadState('domcontentloaded');
//   await page.getByRole('textbox', { name: 'E-mail :' }).waitFor({ state: 'visible', timeout: 15000 });
// });

// When('I enter my email {string}', async function (email: string) {
//   const page = this.page as Page;
//   const emailInput = page.getByRole('textbox', { name: 'E-mail :' });
//   await emailInput.waitFor({ state: 'visible', timeout: 10000 });
//   await emailInput.fill(email);
// });

// When('I enter my password {string}', async function (password: string) {
//   const page = this.page as Page;
//   const passwordInput = page.getByRole('textbox', { name: 'Mot de passe :' });
//   await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
//   await passwordInput.fill(password);
// });

// When('I click the button login', async function () {
//   await (this.page as Page).getByRole('button', { name: 'Connexion' }).click();
// });

// // Un seul step pour les deux cas (login réussi et erreurs)
// Then('I should see {string}', async function (expectedText: string) {
//   const page = this.page as Page;
//   await page.locator(`text=${expectedText}`).waitFor({ state: 'visible', timeout: 20000 });
// });