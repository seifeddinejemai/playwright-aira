import { test, expect } from '@playwright/test';


test.describe('aira case test', () => {

  test.beforeEach(async ({page}) =>{

    await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
   
  });




 test('test1', async ({ page }) => {

   await page.goto('https://app-uat.codereview.allence.cloud/client/teams');
    // await page.locator('.spinner-overlay').waitFor({ state: 'detached' });
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Projet' }).click();

    await page.getByRole('button', { name: 'Réinitialiser' }).click();
    await page.getByRole('link', { name: 'bar_chart Stats' }).click();
    // await page.getByRole('button', { name: 'S', exact: true }).click();
    // await page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();

  });

  test('test', async ({ page }) => {
   
    //await page.locator('.spinner-overlay').waitFor({ state: 'detached' });
    //await page.waitForURL('https://app-uat.codereview.allence.cloud/client/teams');
    await page.goto('https://app-uat.codereview.allence.cloud/client/teams');
    await page.waitForLoadState('networkidle');

    // await page.locator('.spinner-overlay').waitFor({ state: 'detached' });

    await page.getByRole('button', { name: /créer une équipe/i }).click();
    // await page.getByRole('button', { name: 'créer une équipe' }).click();
    await page.getByRole('textbox', { name: 'Nom de l\'équipe' }).fill('#playwright-seiftest');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page.getByRole('textbox', { name: 'Description' }).fill('#playwright-test');
    await page.getByRole('button', { name: 'Enregistrer' }).click();
    await page.locator('.spinner-overlay').waitFor({ state: 'detached' });

    // await page.getByRole('button', { name: 'S', exact: true }).click();
    // await page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
  });

test.afterEach(async ({page}) =>{

    await page.getByRole('button', { name: 'S', exact: true }).click();
    await page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
   
  });

 
})
