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