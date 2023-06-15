import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class MenuFixture extends E2EComponentFixture {

    getByLabel(label: string) {
        return this.page.getByText(label, { exact: true });
    }

    async ouvrirMenu(numberOfClick = 1) {
        const menuItems = await this.page.locator('.burger-menu').all();
        return menuItems[0].click();
    }

    async goTheme() {
        const lienTheme = await this.page.locator('#lien-themes');
        return await lienTheme.click();
    }

    async goAccueil() {
        const lienAccueil = await this.page.locator('#lien-accueil');
        return await lienAccueil.click();
    }

    async deconnexion() {
        await this.ouvrirMenu();
        const deco =await this.page.locator('#deconection');
        await this.page.on('dialog', async (dialog) => {
            await dialog.accept(); // Accepter la fenêtre contextuelle (appuyer sur OK)
        });
        await deco.click();
    }

}