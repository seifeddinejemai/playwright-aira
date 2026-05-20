import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();

  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (
      url.includes("socket.io") ||
      url.includes("analytics") ||
      url.includes("ads")
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });

  this.page = page;
  this.loginPage = null; // réinitialisé à chaque scénario
});

After(async function ({ result }) {
  if (result?.status === Status.FAILED) {
    await page.screenshot({
      path: `screenshots/failed-${Date.now()}.png`,
      fullPage: true
    });
  }
  await context.close();
});

AfterAll(async () => {
  await browser.close();
});