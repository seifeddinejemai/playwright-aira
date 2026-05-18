import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async () => {
  browser = await chromium.launch({
    headless: false
  });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();

  // disponible dans les steps
  this.page = page;
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