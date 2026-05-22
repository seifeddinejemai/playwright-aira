// // import { expect, type Locator, type Page } from '@playwright/test';

// // export class Equipepage {
// //     readonly page: Page;
// //     readonly Addnewteambt: Locator;
// //     readonly Teamsbt: Locator;
// //     readonly tname: Locator;
// //     readonly description: Locator;
// //     readonly radioPublique: Locator;
// //     readonly radioPrivee: Locator;
// //     readonly deleteButtons: Locator;
// //     readonly confirmDeleteButton: Locator;
// //     readonly cancelDeleteButton: Locator;
// //     private readonly baseUrl = 'https://app-uat.codereview.allence.cloud';
// //     private team_name:string =""
// //     readonly searchInput: Locator;
// //     readonly searchButton: Locator;
// //     readonly resetButton: Locator;
// //     readonly invitationsTab: Locator;
// //     readonly addMemberButton: Locator;
// //     readonly emailMemberInput: Locator;
// //     readonly roleSelect: Locator;
// //     readonly sendInvitationButton: Locator;
// //     readonly editMemberButton: Locator;
// //     readonly resendRequestButton: Locator;
// //     readonly deleteMemberButton: Locator;
// //     readonly confirmMemberDeleteButton: Locator;
// //     readonly membresTab: Locator;



// //     constructor(page: Page) {
// //         this.page = page;
// //         this.Teamsbt = page.getByRole('button', { name: / Équipe/i });
// //         this.Addnewteambt = page.getByRole('button', { name: /créer une équipe/i });
// //         this.description = page.getByRole('textbox', { name: 'Description' });
// //         this.tname = page.getByRole('textbox', { name: 'Nom de l\'équipe' });
// //         this.radioPublique = page.getByLabel('Publique');
// //         this.radioPrivee = page.getByLabel('Privée');
// //         this.deleteButtons = page.locator('button mat-icon:text-is("delete")');
// //         this.confirmDeleteButton = page.locator('mat-dialog-container button.confirm');
// //         this.cancelDeleteButton = page.locator('mat-dialog-container button.cancel');
// //         this.searchInput = page.getByRole('textbox', { name: 'Rechercher' });
// //         this.searchButton = page.getByRole('button', { name: 'Search' });
// //         this.resetButton = page.getByRole('button', { name: 'Réinitialiser' });
// //         this.invitationsTab = page.getByText('Invitations');
// //         this.addMemberButton = page.getByRole('button', { name: 'Ajouter un membre' });
// //         this.emailMemberInput = page.getByRole('textbox', { name: 'Email' });
// //         this.roleSelect = page.locator('mat-form-field').filter({
// //         has: page.locator('mat-select[formcontrolname="role"]')
// //         });
// //         this.sendInvitationButton = page.getByRole('button', { name: "Envoyer l'invitation" });
// //         this.editMemberButton = page.getByRole('button', { name: 'Modifier' });
// //         this.resendRequestButton = page.getByRole('button', { name: 'Renvoyer la demande' });
// //         this.deleteMemberButton = page.getByRole('button', { name: 'Supprimer le membre' });
// //         this.confirmMemberDeleteButton = page.getByRole('button', { name: 'Confirmer' });
// //         this.membresTab = page.getByRole('tab', { name: 'Membres' });



// //     }

// //     async navigateToApp() {
// //         await this.page.goto(`${this.baseUrl}/client/teams`);
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     async goto() {
// //         await this.page.goto('https://app-uat.codereview.allence.cloud/client/teams');
// //     }




// //     async createteam(tname: string, description: string, type: 'publique' | 'privee' = 'publique') {
// //         this.team_name=tname;
// //         await this.page.waitForLoadState('networkidle');
// //         await this.Addnewteambt.click();
// //         await this.page.waitForLoadState('networkidle');
// //         await this.tname.fill(tname);
// //         await this.description.click();
// //         await this.description.fill(description);
// //         if (type === 'publique') {
// //             await this.radioPublique.click();
// //         } else {
// //             await this.radioPrivee.click();
// //         }
// //         await this.page.getByRole('button', { name: 'Enregistrer' }).click();
// //         // await this.page.locator('.spinner-overlay').waitFor({ state: 'detached' });
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     async deleteteam() {
        
// //         await this.getDeleteButtonForTeam(this.team_name).click();

      

// //         // Attendre que la modale de confirmation s'ouvre
// //         await this.confirmDeleteButton.waitFor({ state: 'visible' });

// //         // Confirmer la suppression
// //         await this.confirmDeleteButton.click();
// //         // await this.cancelDeleteteam()

// //         // Attendre la fin du chargement
// //         //await this.spinner.waitFor({ state: 'detached' });
// //         await this.page.waitForLoadState('networkidle');

// //     }

// //     async cancelDeleteteam() {
// //         await this.getDeleteButtonForTeam(this.team_name).click();
// //         await this.cancelDeleteButton.waitFor({ state: 'visible' });
// //         await this.cancelDeleteButton.click();
// //         await this.confirmDeleteButton.waitFor({ state: 'hidden' });

// //     }

// //    async Deconnexion() {
// //     // ✅ Attendre que la page soit stable avant de chercher le bouton
// //     await this.page.waitForLoadState('networkidle');

// //     // ✅ Option 1 : sélecteur actuel avec waitFor
// //     const avatarButton = this.page.locator('button.avatar.mat-mdc-menu-trigger');
    
// //     try {
// //         await avatarButton.waitFor({ state: 'visible', timeout: 5000 });
// //         await avatarButton.click();
// //     } catch {
// //         // ✅ Option 2 : si le bouton avatar n'est pas trouvé, naviguer vers teams d'abord
// //         console.log('Avatar non trouvé, navigation vers teams...');
// //         await this.page.goto(`${this.baseUrl}/client/teams`);
// //         await this.page.waitForLoadState('networkidle');
// //         await avatarButton.waitFor({ state: 'visible', timeout: 10000 });
// //         await avatarButton.click();
// //     }

// //     await this.page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
// // }
// // // ✅ Récupérer la ligne (tr) contenant le nom de l'équipe, puis le bouton delete dans cette ligne
// // getDeleteButtonForTeam(teamName: string): Locator {
// //     return this.page
// //         .locator('tr')
// //         .filter({ has: this.page.locator('td.mat-column-teamName', { hasText: teamName }) })
// //         .locator('button mat-icon:text-is("delete")');
// // }


// //     /**
// //      * Ouvrir la page de gestion d'une équipe par son nom
// //      */
// //     async openManageTeam(teamName: string) {
// //         await this.page
// //             .getByRole('row', { name: new RegExp(teamName) })
// //             .getByLabel("Gérer l'")
// //             .click();
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     /**
// //      * Rechercher dans la liste des membres
// //      * @param searchTerm - terme de recherche (vide pour réinitialiser)
// //      */
// //     async searchMember(searchTerm: string) {
// //         await this.searchInput.fill(searchTerm);
// //         await this.searchButton.click();
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     /**
// //      * Réinitialiser la recherche
// //      */
// //     async resetSearch() {
// //         await this.resetButton.click();
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     /**
// //      * Aller sur l'onglet Invitations
// //      */
// //     async goToInvitationsTab() {
// //         await this.invitationsTab.click();
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     /**
// //      * Inviter un membre dans l'équipe
// //      * @param email - email du membre à inviter
// //      * @param role  - rôle : 'DEV' ou 'MAINTAINER'
// //      */
// //   async inviteMember(email: string, role: 'DEV' | 'MAINTAINER') {
// //     await this.addMemberButton.click();
// //     await this.emailMemberInput.waitFor({ state: 'visible', timeout: 5000 });
// //     await this.emailMemberInput.fill(email);

// //     // ✅ Cliquer sur le trigger du select, pas sur le label
// //     await this.roleSelect.locator('.mat-mdc-select-trigger').click();
// //     await this.page.getByRole('option', { name: role, exact: true }).click();
// //     await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

// //     await this.sendInvitationButton.click();
// //     await this.page.waitForLoadState('networkidle');
// // }

// //     /**
// //      * Modifier le rôle d'un membre existant
// //      * @param newRole - nouveau rôle : 'DEV' ou 'MAINTAINER'
// //      */
// //   async editMemberRole(newRole: 'DEV' | 'MAINTAINER') {
// //     // ✅ S'assurer d'être sur l'onglet Membres
// //     await this.membresTab.click();
// //     await this.page.waitForLoadState('networkidle');

// //     // ✅ Attendre le bouton Modifier
// //     await this.editMemberButton.waitFor({ state: 'visible', timeout: 10000 });
// //     await this.editMemberButton.click();

// //     // ✅ Cliquer sur l'icône svg du rôle actuel
// //     const currentRole = newRole === 'MAINTAINER' ? 'DEV' : 'MAINTAINER';
// //     await this.page.getByRole('cell', { name: currentRole })
// //         .locator('svg')
// //         .click();

// //     await this.page.getByText(newRole, { exact: true }).click();
// //     await this.page.waitForLoadState('networkidle');
// // }

// //     /**
// //      * Renvoyer la demande d'invitation
// //      */
// //     async resendInvitation() {
// //         await this.resendRequestButton.click();
// //         await this.page.waitForLoadState('networkidle');
// //     }

// //     /**
// //      * Supprimer un membre de l'équipe
// //      */
// //     async deleteMember() {
// //         await this.deleteMemberButton.click();
// //         await this.confirmMemberDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
// //         await this.confirmMemberDeleteButton.click();
// //         await this.page.waitForLoadState('networkidle');
// //     }

// // }    

// import { expect, type Locator, type Page } from '@playwright/test';

// export class Equipepage {
//     readonly page: Page;
//     readonly Addnewteambt: Locator;
//     readonly Teamsbt: Locator;
//     readonly tname: Locator;
//     readonly description: Locator;
//     readonly radioPublique: Locator;
//     readonly radioPrivee: Locator;
//     readonly deleteButtons: Locator;
//     readonly confirmDeleteButton: Locator;
//     readonly cancelDeleteButton: Locator;

//     // ✅ NOUVEAUX locators pour gérer une équipe
//     readonly searchInput: Locator;
//     readonly searchButton: Locator;
//     readonly resetButton: Locator;
//     readonly invitationsTab: Locator;
//     readonly addMemberButton: Locator;
//     readonly emailMemberInput: Locator;
//     readonly roleSelect: Locator;
//     readonly sendInvitationButton: Locator;
//     readonly editMemberButton: Locator;
//     readonly resendRequestButton: Locator;
//     readonly deleteMemberButton: Locator;
//     readonly confirmMemberDeleteButton: Locator;

//     private readonly baseUrl = 'https://app-uat.codereview.allence.cloud';
//     private team_name: string = "";

//     constructor(page: Page) {
//         this.page = page;
//         this.Teamsbt = page.getByRole('button', { name: / Équipe/i });
//         this.Addnewteambt = page.getByRole('button', { name: /créer une équipe/i });
//         this.description = page.getByRole('textbox', { name: 'Description' });
//         this.tname = page.getByRole('textbox', { name: 'Nom de l\'équipe' });
//         this.radioPublique = page.getByLabel('Publique');
//         this.radioPrivee = page.getByLabel('Privée');
//         this.deleteButtons = page.locator('button mat-icon:text-is("delete")');
//         this.confirmDeleteButton = page.locator('mat-dialog-container button.confirm');
//         this.cancelDeleteButton = page.locator('mat-dialog-container button.cancel');

//         // ✅ NOUVEAUX locators
//         this.searchInput = page.getByRole('textbox', { name: 'Rechercher' });
//         this.searchButton = page.getByRole('button', { name: 'Search' });
//         this.resetButton = page.getByRole('button', { name: 'Réinitialiser' });
//         this.invitationsTab = page.getByText('Invitations');
//         this.addMemberButton = page.getByRole('button', { name: 'Ajouter un membre' });
//         this.emailMemberInput = page.getByRole('textbox', { name: 'Email' });
//         this.roleSelect = page.locator('mat-form-field').filter({
//             has: page.locator('mat-select[formcontrolname="role"]')
//         });
//         this.sendInvitationButton = page.getByRole('button', { name: "Envoyer l'invitation" });
//         this.editMemberButton = page.getByRole('button', { name: 'Modifier' });
//         this.resendRequestButton = page.getByRole('button', { name: 'Renvoyer la demande' });
//         this.deleteMemberButton = page.getByRole('button', { name: 'Supprimer le membre' });
//         this.confirmMemberDeleteButton = page.getByRole('button', { name: 'Confirmer' });
//     }

//     // ─── Méthodes existantes ───────────────────────────────────────────

//     async navigateToApp() {
//         await this.page.goto(`${this.baseUrl}/client/teams`);
//         await this.page.waitForLoadState('networkidle');
//     }

//     async goto() {
//         await this.page.goto('https://app-uat.codereview.allence.cloud/client/teams');
//     }

//     async createteam(tname: string, description: string, type: 'publique' | 'privee' = 'publique') {
//         this.team_name = tname;
//         await this.page.waitForLoadState('networkidle');
//         await this.Addnewteambt.click();
//         await this.page.waitForLoadState('networkidle');
//         await this.tname.fill(tname);
//         await this.description.click();
//         await this.description.fill(description);
//         if (type === 'publique') {
//             await this.radioPublique.click();
//         } else {
//             await this.radioPrivee.click();
//         }
//         await this.page.getByRole('button', { name: 'Enregistrer' }).click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     async deleteteam() {
//         await this.getDeleteButtonForTeam(this.team_name).click();
//         await this.confirmDeleteButton.waitFor({ state: 'visible' });
//         await this.confirmDeleteButton.click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     async cancelDeleteteam() {
//         await this.getDeleteButtonForTeam(this.team_name).click();
//         await this.cancelDeleteButton.waitFor({ state: 'visible' });
//         await this.cancelDeleteButton.click();
//         await this.confirmDeleteButton.waitFor({ state: 'hidden' });
//     }

//     async Deconnexion() {
//         await this.page.locator('button.avatar.mat-mdc-menu-trigger').click();
//         await this.page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
//     }

//     getDeleteButtonForTeam(teamName: string): Locator {
//         return this.page
//             .locator('tr')
//             .filter({ has: this.page.locator('td.mat-column-teamName', { hasText: teamName }) })
//             .locator('button mat-icon:text-is("delete")');
//     }

//     // ─── NOUVELLES méthodes ────────────────────────────────────────────

//     /**
//      * Ouvrir la page de gestion d'une équipe par son nom
//      */
//     async openManageTeam(teamName: string) {
//         await this.page
//             .getByRole('row', { name: new RegExp(teamName) })
//             .getByLabel("Gérer l'")
//             .click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     /**
//      * Rechercher dans la liste des membres
//      * @param searchTerm - terme de recherche (vide pour réinitialiser)
//      */
//     async searchMember(searchTerm: string) {
//         await this.searchInput.fill(searchTerm);
//         await this.searchButton.click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     /**
//      * Réinitialiser la recherche
//      */
//     async resetSearch() {
//         await this.resetButton.click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     /**
//      * Aller sur l'onglet Invitations
//      */
//     async goToInvitationsTab() {
//         await this.invitationsTab.click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     /**
//      * Inviter un membre dans l'équipe
//      * @param email - email du membre à inviter
//      * @param role  - rôle : 'DEV' ou 'MAINTAINER'
//      */
//     // async inviteMember(email: string, role: 'DEV' | 'MAINTAINER') {
//     //     await this.addMemberButton.click();
//     //     await this.emailMemberInput.waitFor({ state: 'visible', timeout: 5000 });
//     //     await this.emailMemberInput.fill(email);

//     //     // Sélectionner le rôle
//     //     await this.roleSelect.click();
//     //     await this.page.getByRole('option', { name: role }).click();

//     //     await this.sendInvitationButton.click();
//     //     await this.page.waitForLoadState('networkidle');
//     // }
// async inviteMember(email: string, role: 'DEV' | 'MAINTAINER') {
//     await this.addMemberButton.click();
//     await this.emailMemberInput.waitFor({ state: 'visible', timeout: 5000 });
//     await this.emailMemberInput.fill(email);

//     // ✅ Sélectionner le rôle
//     await this.roleSelect.locator('.mat-mdc-select-trigger').click();
//     await this.page.getByRole('option', { name: role, exact: true }).click();
//     await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

//     await this.sendInvitationButton.click();
//     await this.page.waitForLoadState('networkidle');

//     // ✅ Vérifier si le toast "déjà invité" apparaît
//     const alreadyInvitedToast = this.page.locator('[role="alert"]', {
//         hasText: 'Une invitation a déjà été envoyée récemment'
//     });

//     const isAlreadyInvited = await alreadyInvitedToast.isVisible().catch(() => false);

//     if (isAlreadyInvited) {
//         console.log('Membre déjà invité — annulation du formulaire');

//         // ✅ Cliquer sur Annuler pour fermer le formulaire
//         await this.page.getByRole('button', { name: 'Annuler' }).click();

//         // ✅ Attendre que le dialog se ferme
//         await this.page.locator('.cdk-overlay-backdrop')
//             .waitFor({ state: 'detached', timeout: 5000 })
//             .catch(() => {});

//         // ✅ Attendre la fin du toast
//         await alreadyInvitedToast
//             .waitFor({ state: 'detached', timeout: 5000 })
//             .catch(() => {});
//     }
// }
//     /**
//      * Modifier le rôle d'un membre existant
//      * @param newRole - nouveau rôle : 'DEV' ou 'MAINTAINER'
//      */
//    async editMemberRole(newRole: 'DEV' | 'MAINTAINER', memberEmail: string) {
//     // ✅ Aller sur l'onglet Membres
//     await this.goToMembresTab();
//     await this.page.locator('.spinner-overlay').waitFor({ state: 'detached', timeout: 10000 });

//     // ✅ Screenshot + log de toutes les lignes visibles
//     await this.page.screenshot({ path: 'screenshots/membres-tab.png', fullPage: true });
    
//     const rows = await this.page.getByRole('row').all();
//     console.log(`Nombre de lignes: ${rows.length}`);
//     for (const row of rows) {
//         const text = await row.textContent();
//         console.log('Ligne:', text?.trim().replace(/\s+/g, ' '));
//     }

//     // ✅ Cibler la ligne du membre
//     const memberRow = this.page.getByRole('row', { name: new RegExp(memberEmail) });
//     const count = await memberRow.count();
//     console.log(`Lignes trouvées pour ${memberEmail}: ${count}`);

//     await memberRow.waitFor({ state: 'visible', timeout: 10000 });
//     await memberRow.getByLabel('Modifier').click();

//     const currentRole = newRole === 'MAINTAINER' ? 'DEV' : 'MAINTAINER';
//     await memberRow.getByRole('cell', { name: currentRole }).locator('svg').click();
//     await this.page.getByText(newRole, { exact: true }).click();
//     await this.page.waitForLoadState('networkidle');
// }

//     /**
//      * Renvoyer la demande d'invitation
//      */
//     async resendInvitation() {
//         await this.resendRequestButton.click();
//         await this.page.waitForLoadState('networkidle');
//     }

//     /**
//      * Supprimer un membre de l'équipe
//      */
//     async deleteMember() {
//         await this.deleteMemberButton.click();
//         await this.confirmMemberDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
//         await this.confirmMemberDeleteButton.click();
//         await this.page.waitForLoadState('networkidle');
//     }
// }
import { expect, type Locator, type Page } from '@playwright/test';

export class Equipepage {
    readonly page: Page;
    readonly Addnewteambt: Locator;
    readonly Teamsbt: Locator;
    readonly tname: Locator;
    readonly description: Locator;
    readonly radioPublique: Locator;
    readonly radioPrivee: Locator;
    readonly deleteButtons: Locator;
    readonly confirmDeleteButton: Locator;
    readonly cancelDeleteButton: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly resetButton: Locator;
    readonly invitationsTab: Locator;
    readonly membresTab: Locator;        // ✅ AJOUT
    readonly addMemberButton: Locator;
    readonly emailMemberInput: Locator;
    readonly roleSelect: Locator;
    readonly sendInvitationButton: Locator;
    readonly editMemberButton: Locator;
    readonly resendRequestButton: Locator;
    readonly deleteMemberButton: Locator;
    readonly confirmMemberDeleteButton: Locator;

    private readonly baseUrl = 'https://app-uat.codereview.allence.cloud';
    private team_name: string = "";

    constructor(page: Page) {
        this.page = page;
        this.Teamsbt = page.getByRole('button', { name: / Équipe/i });
        this.Addnewteambt = page.getByRole('button', { name: /créer une équipe/i });
        this.description = page.getByRole('textbox', { name: 'Description' });
        this.tname = page.getByRole('textbox', { name: 'Nom de l\'équipe' });
        this.radioPublique = page.getByLabel('Publique');
        this.radioPrivee = page.getByLabel('Privée');
        this.deleteButtons = page.locator('button mat-icon:text-is("delete")');
        this.confirmDeleteButton = page.locator('mat-dialog-container button.confirm');
        this.cancelDeleteButton = page.locator('mat-dialog-container button.cancel');
        this.searchInput = page.getByRole('textbox', { name: 'Rechercher' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.resetButton = page.getByRole('button', { name: 'Réinitialiser' });

        // ✅ Onglets — ciblés par mat-tab pour éviter les ambiguïtés
        this.invitationsTab = page.locator('mat-tab-header .mat-mdc-tab').filter({ hasText: 'Invitations' });
        this.membresTab = page.locator('mat-tab-header .mat-mdc-tab').filter({ hasText: 'Membres' });

        this.addMemberButton = page.getByRole('button', { name: 'Ajouter un membre' });
        this.emailMemberInput = page.getByRole('textbox', { name: 'Email' });
        this.roleSelect = page.locator('mat-form-field').filter({
            has: page.locator('mat-select[formcontrolname="role"]')
        });
        this.sendInvitationButton = page.getByRole('button', { name: "Envoyer l'invitation" });
        this.editMemberButton = page.getByRole('button', { name: 'Modifier' });
        this.resendRequestButton = page.getByRole('button', { name: 'Renvoyer la demande' });
        this.deleteMemberButton = page.getByRole('button', { name: 'Supprimer le membre' });
        this.confirmMemberDeleteButton = page.getByRole('button', { name: 'Confirmer' });
    }

    // ─── Méthodes existantes ───────────────────────────────────────────

    async navigateToApp() {
        await this.page.goto(`${this.baseUrl}/client/teams`);
        await this.page.waitForLoadState('networkidle');
    }

    async goto() {
        await this.page.goto(`${this.baseUrl}/client/teams`);
    }

    async createteam(tname: string, description: string, type: 'publique' | 'privee' = 'publique') {
        this.team_name = tname;
        await this.page.waitForLoadState('networkidle');
        await this.Addnewteambt.click();
        await this.page.waitForLoadState('networkidle');
        await this.tname.fill(tname);
        await this.description.click();
        await this.description.fill(description);
        if (type === 'publique') {
            await this.radioPublique.click();
        } else {
            await this.radioPrivee.click();
        }
        await this.page.getByRole('button', { name: 'Enregistrer' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async deleteteam() {
        await this.getDeleteButtonForTeam(this.team_name).click();
        await this.confirmDeleteButton.waitFor({ state: 'visible' });
        await this.confirmDeleteButton.click();
        await this.confirmDeleteButton.waitFor({ state: 'hidden' });
    }

    async cancelDeleteteam() {
        await this.getDeleteButtonForTeam(this.team_name).click();
        await this.cancelDeleteButton.waitFor({ state: 'visible' });
        await this.cancelDeleteButton.click();
        await this.confirmDeleteButton.waitFor({ state: 'hidden' });
    }

    async Deconnexion() {
        await this.page.waitForLoadState('networkidle');

        // ✅ Fermer tout overlay encore ouvert
        const backdrop = this.page.locator('.cdk-overlay-backdrop');
        if (await backdrop.count() > 0) {
            await this.page.keyboard.press('Escape');
            await backdrop.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        }

        // ✅ Attendre fin spinner et toast
        await this.page.locator('.spinner-overlay')
            .waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
        await this.page.locator('.toast-message')
            .waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

        const avatarButton = this.page.locator('button.avatar.mat-mdc-menu-trigger');

        try {
            await avatarButton.waitFor({ state: 'visible', timeout: 5000 });
            await avatarButton.click();
        } catch {
            console.log('Avatar non trouvé, navigation vers teams...');
            await this.page.goto(`${this.baseUrl}/client/teams`);
            await this.page.waitForLoadState('networkidle');
            await avatarButton.waitFor({ state: 'visible', timeout: 10000 });
            await avatarButton.click();
        }

        await this.page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
    }

    getDeleteButtonForTeam(teamName: string): Locator {
        return this.page
            .locator('tr')
            .filter({ has: this.page.locator('td.mat-column-teamName', { hasText: teamName }) })
            .locator('button mat-icon:text-is("delete")');
    }

    // ─── Gestion équipe ────────────────────────────────────────────────

// async openManageTeam(teamName: string) {
//     // ✅ Match exact : la cellule doit contenir exactement ce nom
//     await this.page
//         .locator('tr')
//         .filter({ has: this.page.locator('td.mat-column-teamName', { hasText: new RegExp(`^${teamName}$`) }) })
//         .locator('button mat-icon:text-is("manage_accounts")')
//         // .getByLabel("Gérer l'")
//         .click();
//     await this.page.waitForLoadState('networkidle');
// }

async openManageTeam(teamName: string) {
    const row = this.page.locator('tr').filter({
    has: this.page.locator(
        `td.mat-column-teamName:text-is("${teamName}")`
    )
});
        console.log(await row.count());
        await row.highlight();

        await row
        .locator('button', {
            has: this.page.locator('mat-icon', {
                hasText: 'manage_accounts'
            })
        })
        .click();

    await this.page.waitForLoadState('networkidle');
}

    async searchMember(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async resetSearch() {
        await this.resetButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    // ✅ AJOUT — navigation onglets
    async goToInvitationsTab() {
        await this.invitationsTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToMembresTab() {
        await this.membresTab.click();
        await this.page.waitForLoadState('networkidle');
    }

    async inviteMember(email: string, role: 'DEV' | 'MAINTAINER') {
        await this.addMemberButton.click();
        await this.emailMemberInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.emailMemberInput.fill(email);

        await this.roleSelect.locator('.mat-mdc-select-trigger').click();
        await this.page.getByRole('option', { name: role, exact: true }).click();
        await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

        await this.sendInvitationButton.click();
        await this.page.waitForLoadState('networkidle');

        // ✅ Gérer le cas "déjà invité"
        // const alreadyInvitedToast = this.page.locator('[role="alert"]', {
        //     hasText: 'Une invitation a déjà été envoyée récemment'
        // });
        // const alreadyInvitedToast2 = this.page.locator('[role="alert"]', {
        //     hasText: 'invité'
        // });

        // const isAlreadyInvited = await alreadyInvitedToast.isVisible().catch(() => false);
        // const isAlreadyInvited2 = await alreadyInvitedToast2.isVisible().catch(() => false);

        // if (isAlreadyInvited || isAlreadyInvited2) {
        //     console.log('Membre déjà invité — annulation');
        //     await this.page.getByRole('button', { name: 'Annuler' }).click();
        //     await this.page.locator('.cdk-overlay-backdrop')
        //         .waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        //     await alreadyInvitedToast
        //         .waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
        // }
    }

    /**
     * Modifier le rôle d'un membre dans l'onglet Invitations
     * Le membre invité reste en "attente" dans Invitations, pas dans Membres
     */
    async editMemberRole(newRole: 'DEV' | 'MAINTAINER', memberEmail: string) {
        // ✅ Aller sur l'onglet Invitations (pas Membres — le membre est en attente)
        // await this.goToInvitationsTab();
        await this.page.locator('.spinner-overlay')
            .waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});

        // ✅ Debug — lister les lignes visibles
        const rows = await this.page.getByRole('row').all();
        console.log(`Lignes dans Invitations: ${rows.length}`);
        for (const row of rows) {
            const text = await row.textContent();
            console.log('Ligne:', text?.trim().replace(/\s+/g, ' '));
        }

        // ✅ Cibler la ligne du membre par email
        const memberRow = this.page.getByRole('row', { name: new RegExp(memberEmail) });
        await memberRow.waitFor({ state: 'visible', timeout: 10000 });

        // ✅ Cliquer sur Modifier dans cette ligne
        await memberRow.getByLabel('Modifier').click();

        // ✅ Changer le rôle via l'icône svg
        const currentRole = newRole === 'MAINTAINER' ? 'DEV' : 'MAINTAINER';
        await memberRow.getByRole('cell', { name: currentRole }).locator('svg').click();
        await this.page.getByText(newRole, { exact: true }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async deleteMember(memberEmail: string) {
        // ✅ Cibler la ligne du membre par email
        const memberRow = this.page.getByRole('row', { name: new RegExp(memberEmail) });
        await this.page.locator('.spinner-overlay')
            .waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
        await memberRow.waitFor({ state: 'visible', timeout: 10000 });
        await memberRow.getByLabel('Supprimer le membre').click();

        await this.confirmMemberDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.confirmMemberDeleteButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}