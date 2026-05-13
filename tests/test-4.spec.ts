import { test, expect } from '@playwright/test';
import { Equipepage } from '../pages/equipespage';
import { Projetpage } from '../pages/projetspage';


test.describe('aira case test', () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (
        url.includes("ads") ||      // bloquer les pubs
        url.includes("socket.io") ||   //bloquer les connexions socket.io
        url.includes("analytics")   //bloquer les Google Analytics
      ) {
        route.abort();
      } else {
        route.continue();
      }
    })
    const equipepages = new Equipepage(page);
    await equipepages.navigateToApp();
  });

  //  test('test1', async ({ page }) => {

  //     await page.goto('https://app-uat.codereview.allence.cloud/client/teams');
  //     // await page.locator('.spinner-overlay').waitFor({ state: 'detached' });
  //     await page.waitForLoadState('networkidle');
  //     await page.getByRole('button', { name: 'Projet' }).click();

  //     await page.getByRole('button', { name: 'Réinitialiser' }).click();
  //     await page.getByRole('link', { name: 'bar_chart Stats' }).click();
  //     // await page.getByRole('button', { name: 'S', exact: true }).click();
  //     // await page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
  //   });

//   test('creer une equipe et la supprimer', async ({ page }) => {
//     const equipepages = new Equipepage(page);
//     await equipepages.createteam('#playwright-seiftest', '#playwright-test', 'publique');
//     await page.waitForLoadState('networkidle');
//     await equipepages.deletefirstteam();
   
   
//    //** //await page.locator('.spinner-overlay').waitFor({ state: 'detached' });
//     //await page.waitForURL('https://app-uat.codereview.allence.cloud/client/teams');
//     //await page.goto('https://app-uat.codereview.allence.cloud/client/teams');**
// *
//   });


 
test('creer un projet', async ({ page }) => {
    const projetpage = new Projetpage(page);
    await projetpage.listeprojets();
    await projetpage.createproject(
        'https://gitlab.com/',
        '82160145',
        'glpat-QcELBQxN3a9FOq6Dj7imuGM6MQpvOjEKdTprcDhjMg8.01.170dmd12h',
        'Node.JS',
        'Nest.JS',
        'seiftest'
    );
});

  });



  test.afterEach(async ({ page }) => {
    const equipepages = new Equipepage(page);
    await equipepages.Deconnexion();

        // await page.getByRole('button', { name: 'S', exact: true }).click();
        // await page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();

  });





