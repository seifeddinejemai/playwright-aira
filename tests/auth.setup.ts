import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://app-uat.codereview.allence.cloud/auth/login');
  await page.getByRole('textbox', { name: 'E-mail :' }).click();
  await page.getByRole('textbox', { name: 'E-mail :' }).fill('seifeddinejemai@gmail.com');
  await page.getByRole('textbox', { name: 'E-mail :' }).press('Tab');
  await page.getByRole('textbox', { name: 'Mot de passe :' }).fill('sei756');
  await page.getByRole('button', { name: 'Connexion' }).click();
  
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://app-uat.codereview.allence.cloud/client/teams');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.

  
  //**await expect(page.getByText('Suivi et gestion en temps réel des equipes')).toBeVisible();
  await expect(page.getByRole('button', { name: ' créer une équipe ' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});