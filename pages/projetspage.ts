import { expect, type Locator, type Page } from '@playwright/test';

export class Projetpage {
    readonly page: Page;
    readonly projectbt: Locator;
    readonly addprojectbt: Locator;
    readonly giturlinput: Locator;
    readonly depotinput: Locator;
    readonly tokenInput: Locator;
    readonly languageSelect: Locator;
    readonly frameworkSelect: Locator;
    readonly equipeSelect: Locator;
    readonly tutorielButton: Locator;
    readonly tutorielDialog: Locator;
    readonly nextButton: Locator;
    readonly previousButton: Locator;
    readonly closeButton: Locator;
    readonly saveButton: Locator;
    readonly spinner: Locator;
    readonly moreVertButton: Locator;
    readonly editMenuItem: Locator;
    readonly deleteMenuItem: Locator;
    readonly confirmDeleteButton: Locator;
    readonly confirmDeleteDialog: Locator;
    constructor(page: Page) {
        this.page = page;
        this.projectbt = page.getByRole('button', { name: 'Projet', exact: true });
        this.addprojectbt = page.getByRole('button', { name: /créer un projet/i });
        this.giturlinput = page.getByRole('textbox', { name: 'https://plateform.xyz' });
        this.depotinput = page.getByRole('textbox', { name: 'ID du projet / Nom du dépôt' });
        this.tokenInput = page.getByRole('textbox', { name: "Entrez votre jeton d'accès" });
        this.tutorielButton = page.getByText('Tutoriel');
        this.tutorielDialog = page.getByRole('dialog');
        this.nextButton = page.locator('button:has(mat-icon:text("navigate_next"))');
        this.previousButton = page.locator('button:has(mat-icon:text("navigate_before"))');
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.moreVertButton = page.getByRole('button').filter({ hasText: 'more_vert' });
        this.editMenuItem = page.getByRole('menuitem', { name: 'Mettez à jour le projet' });
        this.deleteMenuItem = page.getByRole('menuitem', { name: 'Supprimer le projet' });
        this.confirmDeleteButton = page.getByRole('button', { name: 'Confirmer' });
        this.confirmDeleteDialog = page.getByRole('dialog');

        // ✅ .mat-mdc-select-trigger évite l'interception par mat-label
        // this.languageSelect = page.locator('mat-select[formcontrolname="language"] .mat-mdc-select-trigger');
        this.languageSelect = page
            .locator('mat-form-field')
            .filter({ has: page.locator('mat-select[formcontrolname="language"]') })

        this.frameworkSelect = page
            .locator('mat-form-field')
            .filter({ has: page.locator('mat-select[formcontrolname="framework"]') })


        // locator('mat-select[formcontrolname="framework"] .mat-mdc-select-trigger');

        this.equipeSelect = page.locator('mat-form-field')
            .filter({ has: page.locator('mat-select[formcontrolname="teamId"]') })
        // page.getByRole('combobox', { name: 'Choisir une équipe' });
        this.saveButton = page.getByRole('button', { name: 'Enregistrer' });
        this.spinner = page.locator('.spinner-overlay');
    }

    async listeprojets() {
        await this.projectbt.click();
        await this.addprojectbt.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }


   async createproject(
    giturl: string,
    depot: string,
    token: string,
    language: string,
    framework: string,
    equipe: string
) {
    await this.addprojectbt.click();
    await this.spinner.waitFor({ state: 'detached' });

    await this.giturlinput.fill(giturl);
    await this.depotinput.fill(depot);
    await this.tokenInput.fill(token);
    await this.spinner.waitFor({ state: 'detached' });

    await this.languageSelect.click();
    await this.page.getByRole('option', {
        name: new RegExp(`^${this.regFunction(language)}$`),
    }).click();
    await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

    await this.frameworkSelect.click();
    await this.page.getByRole('option', {
        name: new RegExp(`^${this.regFunction(framework)}$`),
    }).click();
    await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

    await this.equipeSelect.click();
    await this.page.waitForSelector('mat-option', { state: 'visible' });
    await this.page.getByRole('option', {
        name: new RegExp(`^${this.regFunction(equipe)}$`),
    }).click();

    await this.saveButton.click();
    await this.spinner.waitFor({ state: 'detached' });

    // ✅ Re-naviguer vers la liste des projets après création
    await this.page.goto('https://app-uat.codereview.allence.cloud/client/teams?tab=projects');
    await this.page.waitForLoadState('networkidle');

    // ✅ Attendre que les boutons more_vert soient visibles
    await this.moreVertButton.first().waitFor({ state: 'visible', timeout: 15000 });
}

    /**
     * Ouvre le menu ⋮ d'un projet par son index (0 = premier projet)
     * Si projectIndex n'est pas fourni, utilise le premier (0)
     */
    private async openMoreMenu(projectIndex: number = 0) {
    // ✅ Vérifier qu'il y a bien des projets
    const count = await this.moreVertButton.count();
    console.log(`more_vert buttons found: ${count}`);

    if (count === 0) {
        throw new Error('Aucun projet trouvé dans la liste');
    }

    await this.moreVertButton.nth(projectIndex).scrollIntoViewIfNeeded();
    await this.moreVertButton.nth(projectIndex).click();
    await this.editMenuItem.waitFor({ state: 'visible', timeout: 5000 });
}

    /**
     * Modifier le langage d'un projet
     * @param newLanguage  - nouveau langage ex: 'Angular'
     * @param projectIndex - index du projet dans la liste (0 = premier)
     */
    


    async editproject(
    newLanguage: string,
    newFramework: string,
    projectIndex: number = 0
) {
    await this.openMoreMenu(projectIndex);
    await this.editMenuItem.click();
    await this.spinner.waitFor({ state: 'detached' });

    await this.languageSelect.click();
    await this.page.getByRole('option', {
        name: new RegExp(`^${this.regFunction(newLanguage)}$`),
    }).click();
    await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

    await this.frameworkSelect.click();
    await this.page.getByRole('option', {
        name: new RegExp(`^${this.regFunction(newFramework)}$`),
    }).click();
    await this.page.locator('mat-option').first().waitFor({ state: 'detached' });

    await this.saveButton.click();
    await this.spinner.waitFor({ state: 'detached' });

    // ✅ Re-naviguer comme dans createproject()
    await this.page.goto('https://app-uat.codereview.allence.cloud/client/teams?tab=projects');
    await this.page.waitForLoadState('networkidle');

    // ✅ Retry jusqu'à 30s
    let count = 0;
    for (let i = 0; i < 6; i++) {
        count = await this.moreVertButton.count();
        console.log(`Tentative ${i + 1} — more_vert count: ${count}`);
        if (count > 0) break;
        await this.page.waitForTimeout(5000);
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
    }

    if (count === 0) {
        await this.page.screenshot({ path: 'screenshots/after-edit-no-project.png', fullPage: true });
        throw new Error('Aucun projet trouvé après modification');
    }
}

    /**
     * Supprimer un projet
     * @param projectIndex - index du projet dans la liste (0 = premier)
     */
    async deleteproject(projectIndex: number = 0) {
        // ✅ Ouvrir le menu ⋮ du projet ciblé
        await this.openMoreMenu(projectIndex);

        // ✅ Cliquer sur "Supprimer le projet"
        await this.deleteMenuItem.click();

        // ✅ Attendre le dialog et confirmer
        await this.confirmDeleteDialog.waitFor({ state: 'visible', timeout: 5000 });
        await this.confirmDeleteButton.click();
        await this.spinner.waitFor({ state: 'detached' });
    }




    regFunction(str: string) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    }
}