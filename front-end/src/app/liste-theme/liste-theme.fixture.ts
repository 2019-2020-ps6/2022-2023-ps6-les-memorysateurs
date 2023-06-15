import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ListeThemeFixture extends E2EComponentFixture {

  getByLabel(label: string) {
    return this.page.getByText(label, { exact: true });
  }

  async getThemes() {
    return await this.page.$$('app-item-frame');
  }

  async getTheme(index: number) {
      const themes = await this.getThemes();
      return themes[index];
  } 

  async getThemesLength() {
      return this.page.$$('app-item-frame').then((themes) => themes.length);
  }

  async getAjouterThemeButton() {
    return await this.page.locator('.bouton-ajouter-theme');
  }

  async getAjouterThemeButtonVisible() {
    const ajouterThemeButton = await this.getAjouterThemeButton();
    return await ajouterThemeButton.isVisible();
  }

  async ajouterTheme() {
    const ajouterThemeButton = await this.getAjouterThemeButton();
    await ajouterThemeButton.click();
}

async selectionnerTheme(index: number) {
    const themes = await this.page.getByRole('button', {name:'SELECTIONNER'}).all();
    await themes[0].click();
}

async editerTheme(index: number) {
  const themes = await this.page.getByRole('button', {name:'EDITER'}).all();
  await themes[0].click();
}

}
