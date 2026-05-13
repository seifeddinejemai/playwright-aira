// import { expect, type Locator, type Page } from '@playwright/test';

// export class Projetpage {
//     readonly page: Page;
//     readonly projectbt: Locator;
//     readonly addprojectbt: Locator;
//     readonly giturlinput: Locator;
//     readonly depotinput: Locator;
//     readonly tokenInput: Locator;
//     readonly languageSelect: Locator;
//     readonly equipeSelect: Locator;
//     readonly tutorielButton: Locator; 
//     readonly tutorielDialog: Locator;
//     readonly nextButton: Locator;
//     readonly previousButton: Locator;
//     readonly closeButton: Locator;
//     readonly saveButton: Locator;
//     readonly frameworkSelect: Locator;






//     constructor(page: Page) {
//         this.page = page;
//         this.projectbt = page.getByRole('button', { name: 'Projet', exact: true });
//         this.addprojectbt = page.getByRole('button', {name: ' créer un projet '});
//         this.giturlinput = page.getByRole('textbox', {name: 'https://plateform.xyz'});
//         this.depotinput =page.getByRole('textbox', {name: 'ID du projet / Nom du dépôt'});
//         this.tokenInput = page.getByRole('textbox', {name: 'Entrez votre jeton d\'accès'}); 
//         this.tutorielButton=page.getByText('Tutoriel');
//         this.tutorielDialog=page.getByRole('dialog');
//         this.nextButton=page.locator('button:has(mat-icon:text("navigate_next"))');
//         this.previousButton=page.locator('button:has(mat-icon:text("navigate_before"))' );
//         this.closeButton=page.getByRole('button', {name: 'Close'});
//         this.languageSelect = page.locator('mat-select[formcontrolname="language"] .mat-mdc-select-trigger');
//         this.equipeSelect = page.getByRole('combobox', { name: 'Choisir une équipe' });
//         this.saveButton = page.getByRole('button', { name: 'Enregistrer' });
//         this.frameworkSelect = page.locator('mat-select[formcontrolname="framework"] .mat-mdc-select-trigger');


//     }


//     // async ouvrirListeEquipes() {
//     //     await this.equipeSelect.click();
//     // }

//    async listeprojets() {
//         console.log("######,",this.projectbt);

//     await this.projectbt.click();
//     //await this.page.waitForURL('**/teams?tab=projects');
//     await this.page.waitForLoadState('networkidle');
//     }
//     async choisirEquipe(nomEquipe: string) {
//         await this.equipeSelect.click();
//         await this.page.getByRole('option', {name: nomEquipe }).click();
//     }


// //    async createproject(giturl: string,depot: string,token: string,language: string,equipe: string) {

// //     await this.addprojectbt.click();
// //     await this.giturlinput.fill(giturl);
// //     await this.depotinput.fill(depot);
// //     await this.tokenInput.fill(token);
// //     await expect(this.languageSelect).toBeVisible();
// //     await this.languageSelect.click();
// //     await this.page.waitForLoadState('networkidle');
// //     await this.page.getByRole('option', { name: language }).click();

// //     await this.choisirEquipe(equipe);

// //     await this.saveButton.click();
// //     await this.page.waitForLoadState('networkidle');

// // }

// async createproject(
//     giturl: string,
//     depot: string,
//     token: string,
//     language: string,
//     framework: string,
//     equipe: string
// ) {
//     await this.addprojectbt.click();
//     await this.page.waitForLoadState('networkidle');

//     // ✅ Remplir l'URL git
//     await this.giturlinput.fill(giturl);

//     // ✅ Remplir l'ID du dépôt
//     await this.depotinput.fill(depot);

//     // ✅ Remplir le token
//     await this.tokenInput.fill(token);

//     // ✅ Sélectionner le langage
//     await this.languageSelect.click();
//     await this.page.getByRole('option', { name: language, exact: true }).click();
    

//     // ✅ Sélectionner le framework
//     await this.frameworkSelect.click();
//     await this.page.getByRole('option', { name: framework, exact: true }).click();

//     // ✅ Sélectionner l'équipe
//     await this.choisirEquipe(equipe);

//     await this.saveButton.click();
//     await this.page.locator('.spinner-overlay').waitFor({ state: 'detached' });
// }
// }


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

        // ✅ .mat-mdc-select-trigger évite l'interception par mat-label
        // this.languageSelect = page.locator('mat-select[formcontrolname="language"] .mat-mdc-select-trigger');
        this.languageSelect= page
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

    // async choisirEquipe(nomEquipe: string) {
    //     await this.equipeSelect.click();
    //     await this.page.getByRole('option', { name: nomEquipe }).click();
    // }

    async createproject(
    giturl: string,
    depot: string,
    token: string,
    language: string,
    framework: string,
    equipe: string
) {
    // console.log(language,framework,'..................');
    
    await this.addprojectbt.click();

    // ✅ Attendre disparition du spinner après ouverture du formulaire
    await this.spinner.waitFor({ state: 'detached' });

    await this.giturlinput.fill(giturl);
    await this.depotinput.fill(depot);
    await this.tokenInput.fill(token);

    // ✅ Attendre à nouveau le spinner (peut réapparaître après fill du token)
    await this.spinner.waitFor({ state: 'detached' });

    // ✅ force: true ignore tous les éléments qui interceptent
    await this.languageSelect.click();
    

    const escapedLanguage = this.regFunction(language)

    await this.page.getByRole('option', {
    name: new RegExp(`^${escapedLanguage}$`),
    selected: false
    }).click();


    const escapedFramework = this.regFunction(framework)

    await this.frameworkSelect.click();
     await this.page.getByRole('option', {
    name: new RegExp(`^${escapedFramework}$`),
    selected: false
    }).click();
    await this.page.locator('mat-option span', { hasText: framework }).click();
    // await this.page.getByRole('option', { name: framework, exact: false }).click();

    const escapedTeam= this.regFunction(equipe)


    // await this.choisirEquipe(equipe);
     await this.equipeSelect.click();
     await this.page.getByRole('option', {
    name: new RegExp(`^${escapedTeam}$`),
    selected: false
    }).click();

    await this.saveButton.click();
    await this.spinner.waitFor({ state: 'detached' });
}


regFunction(str:string){
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

}
}