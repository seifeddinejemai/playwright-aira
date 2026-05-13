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
    private readonly baseUrl = 'https://app-uat.codereview.allence.cloud';



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

    }
    // setPage(page: Page){
    //     this.page=page;
    // }
    async navigateToApp() {
        await this.page.goto(`${this.baseUrl}/client/teams`);
        await this.page.waitForLoadState('networkidle');
    }

    async goto() {
        await this.page.goto('https://app-uat.codereview.allence.cloud/client/teams');
    }




    async createteam(tname: string, description: string, type: 'publique' | 'privee' = 'publique') {
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
        // await this.page.locator('.spinner-overlay').waitFor({ state: 'detached' });
        await this.page.waitForLoadState('networkidle');
    }

    async deletefirstteam() {
        // Cliquer sur le premier bouton delete
        await this.deleteButtons.first().click();

        // Attendre que la modale de confirmation s'ouvre
        await this.confirmDeleteButton.waitFor({ state: 'visible' });

        // Confirmer la suppression
        await this.confirmDeleteButton.click();

        // Attendre la fin du chargement
        //await this.spinner.waitFor({ state: 'detached' });
        await this.page.waitForLoadState('networkidle');

    }

    async cancelDeletefirstteam() {
        await this.deleteButtons.first().click();
        await this.cancelDeleteButton.waitFor({ state: 'visible' });
        await this.cancelDeleteButton.click();
    }

    async Deconnexion (){
    await this.page.locator('button.avatar.mat-mdc-menu-trigger').click();
    await this.page.getByRole('menuitem', { name: 'logout Déconnexion' }).click();
    }
}    