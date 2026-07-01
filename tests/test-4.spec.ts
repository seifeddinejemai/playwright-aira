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



  test('creer une equipe ', async ({ page }) => {
    const equipepages = new Equipepage(page);
    await equipepages.createteam('seiftest', 'seiftest', 'publique');
    await page.waitForLoadState('networkidle');

  });

  test('gerer une equipe', async ({ page }) => {
    const equipepages = new Equipepage(page);

    // ✅ Créer l'équipe
    await equipepages.createteam('testnum0', 'testnum0', 'publique');
    await page.waitForLoadState('networkidle');

    // ✅ Ouvrir la gestion
    await equipepages.openManageTeam('testnum0');

    // ✅ Recherches sur l'onglet Membres (onglet par défaut)
    await equipepages.searchMember('zzz');
    await equipepages.resetSearch();
    await equipepages.searchMember('sei');
    await equipepages.searchMember('');

    // ✅ Aller sur Invitations et inviter
    await equipepages.goToInvitationsTab();
    await equipepages.inviteMember('youssefbenmiled40@gmail.com', 'DEV');

    // ✅ Modifier le rôle dans Invitations (membre en attente)
    await equipepages.editMemberRole('MAINTAINER', 'youssefbenmiled40@gmail.com');


    // ✅ Supprimer le membre
    await equipepages.deleteMember('youssefbenmiled40@gmail.com');

    // ✅ Revenir à la liste et supprimer l'équipe
    await page.goto('https://app-uat.codereview.allence.cloud/client/teams');
    await page.waitForLoadState('networkidle');
    // await equipepages.deleteteam();
});

 
test('modifier et supprimer un projet', async ({ page }) => {
    const projetpage = new Projetpage(page);

    await projetpage.listeprojets();

    // ✅ Créer le projet (inclut déjà la navigation et le waitFor more_vert)
    await projetpage.createproject(
        'https://gitlab.com/',
        '82160145',
        'glpat-QcELBQxN3a9FOq6Dj7imuGM6MQpvOjEKdTprcDhjMg8.01.170dmd12h',
        'Node.JS',
        'Nest.JS',
        'testnum0'
    );

    // ✅ Plus besoin du waitFor ici — déjà géré dans createproject()
    await projetpage.editproject('Python', 'Chalice', 0);

    await page.waitForTimeout(1000);

    await projetpage.deleteproject(0);
});

  test('creer une equipe et la supprimer', async ({ page }) => {
    const equipepages = new Equipepage(page);
    await equipepages.createteam('#playwright-auto', '#playwright-auto', 'publique');
    await page.waitForLoadState('networkidle');
    await equipepages.cancelDeleteteam();
    await equipepages.deleteteam();



  });






  test.afterEach(async ({ page }) => {
    const equipepages = new Equipepage(page);
    await equipepages.Deconnexion();

  });




});

