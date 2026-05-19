import { Page, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;

  // Sélecteurs
  private emailInput;
  private passwordInput;
  private loginButton;
  private toastMessage;
  private teamsPageText;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'E-mail :' });
    this.passwordInput = page.getByRole('textbox', { name: 'Mot de passe :' });
    this.loginButton = page.getByRole('button', { name: 'Connexion' });
    this.toastMessage = page.locator('.toast-message');
    this.teamsPageText = page.locator('text=Suivi et gestion en temps réel des equipes');
  }

  // Actions
  async navigateTo(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async enterEmail(email: string) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getToastMessage(): Promise<string> {
    await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.toastMessage.textContent())?.trim() ?? '';
  }

  async waitForSuccessfulLogin() {
    await this.page.waitForURL('**/client/teams', { timeout: 20000 });
    await this.teamsPageText.waitFor({ state: 'visible', timeout: 15000 });
  }

  async shouldSeeText(expectedText: string) {
    // Cas 1 : texte sur la page après login réussi
    if (expectedText === 'Suivi et gestion en temps réel des equipes') {
      await this.waitForSuccessfulLogin();
      return;
    }

    // Cas 2 : message d'erreur dans le toast
    try {
      await this.toastMessage.waitFor({ state: 'visible', timeout: 8000 });
      const text = await this.toastMessage.textContent();
      if (!text?.includes(expectedText)) {
        throw new Error(`Toast affiche "${text?.trim()}" au lieu de "${expectedText}"`);
      }
    } catch {
      // Fallback : chercher dans toute la page (erreurs de validation inline)
      await this.page.locator(`text=${expectedText}`)
        .waitFor({ state: 'visible', timeout: 10000 });
    }
  }
}