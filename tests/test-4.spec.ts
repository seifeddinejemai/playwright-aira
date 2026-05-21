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

    // ✅ Ouvrir la gestion de l'équipe 'seiftest'
    await equipepages.openManageTeam('seiftest');

    // ✅ Rechercher avec un terme invalide
    await equipepages.searchMember('zzz');

    // ✅ Réinitialiser la recherche
    await equipepages.resetSearch();

    // ✅ Rechercher avec un terme valide
    await equipepages.searchMember('sei');

    // ✅ Vider la recherche
    await equipepages.searchMember('');

    // ✅ Aller sur l'onglet Invitations
    await equipepages.goToInvitationsTab();

    // ✅ Inviter un membre
    await equipepages.inviteMember('raniabenammar491@gmail.com', 'DEV');

    // ✅ Modifier le rôle du membre (DEV → MAINTAINER)
await equipepages.editMemberRole('MAINTAINER', 'raniabenammar491@gmail.com');

    // ✅ Renvoyer la demande
    await equipepages.resendInvitation();

    // ✅ Supprimer le membre
    await equipepages.deleteMember();
});

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
        'seiftest'
    );

    // ✅ Plus besoin du waitFor ici — déjà géré dans createproject()
    await projetpage.editproject('Python', 'Chalice', 0);

    await page.waitForTimeout(1000);

    await projetpage.deleteproject(0);
});

  test('creer une equipe et la supprimer', async ({ page }) => {
    const equipepages = new Equipepage(page);
    await equipepages.createteam('#playwright-seiftest', '#playwright-test', 'publique');
    await page.waitForLoadState('networkidle');
    await equipepages.cancelDeleteteam();
    await equipepages.deleteteam();



  });






  test.afterEach(async ({ page }) => {
    const equipepages = new Equipepage(page);
    await equipepages.Deconnexion();

    // await page.getByRole('button', { name: 'S', exact: true }).click();
    // await page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();

  });




});

