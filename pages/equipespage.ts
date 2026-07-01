
import { expect, type Locator, type Page } from '@playwright/test';

export class Equipepage {
    page: Page;
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
    readonly membresTab: Locator;
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
        // await this.page.waitForLoadState('networkidle');

        // ✅ Fermer tout overlay encore ouvert
        const backdrop = this.page.locator('.cdk-overlay-backdrop');
        if (await backdrop.count() > 0) {
            await this.page.keyboard.press('Escape');
            await backdrop.waitFor({ state: 'detached', timeout: 5000 }).catch(() => { });
        }

        // ✅ Attendre fin spinner et toast
        await this.page.locator('.spinner-overlay')
            .waitFor({ state: 'detached', timeout: 10000 }).catch(() => { });
        await this.page.locator('.toast-message')
            .waitFor({ state: 'detached', timeout: 5000 }).catch(() => { });

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




    async openManageTeam(teamName: string) {
        const rows = this.page.locator('tr').filter({
            has: this.page.locator('td.mat-column-teamName', { hasText: teamName })
        });

        const count = await rows.count();
        let targetRow = rows.first();

        if (count > 1) {
            for (let i = 0; i < count; i++) {
                const row = rows.nth(i);
                const cellText = await row.locator('td.mat-column-teamName').textContent();
                console.log(`Row ${i}: |${cellText?.trim()}|`);
                if (cellText?.trim() === teamName) {
                    targetRow = row;
                    break;
                }
            }
        }

        // ✅ Vérifier si le clic ouvre un nouvel onglet ou navigue sur la même page
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page').catch(() => null), // null si pas de nouvelle page
            targetRow.getByLabel("Gérer l'").click()
        ]);

        if (newPage) {
            // ✅ Le bouton a ouvert un nouvel onglet — on bascule dessus
            console.log('Nouvelle page détectée:', newPage.url());
            await newPage.waitForLoadState('networkidle');
            this.page = newPage as any; // basculer sur la nouvelle page
        } else {
            // ✅ Navigation sur la même page
            await this.page.waitForLoadState('networkidle');
        }
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
            .waitFor({ state: 'detached', timeout: 10000 }).catch(() => { });

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
            .waitFor({ state: 'detached', timeout: 10000 }).catch(() => { });
        await memberRow.waitFor({ state: 'visible', timeout: 10000 });
        await memberRow.getByLabel('Supprimer le membre').click();

        await this.confirmMemberDeleteButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.confirmMemberDeleteButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}