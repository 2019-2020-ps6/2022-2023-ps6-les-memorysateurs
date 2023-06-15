import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreerThemeFixture extends E2EComponentFixture {

    getByLabel(label: string) {
        return this.page.getByText(label, { exact: true });
    }

    getInput(id: string) {
        const selector = `#${id}`;
        return this.page.waitForSelector(selector);
    }  

    async importerPhoto(photo: string) {
        await this.page.setInputFiles('#recup-fichier', [photo]);
    }

    async importerPhotoUrl(photo: string) {
        const inputUrl = await this.getInput('url-image');
        await inputUrl.type(photo);
        await this.page.click('#importer-URL');

    }

    async ajoutePhoto() {
        await this.page.click('#imageEnAttente img');
    }

    async creerTheme() {
        await this.page.click('#boutonValidationTheme');
    }

    async getCreerThemesButtonVisible() {
        return this.page.isVisible('#boutonValidationTheme');
    }

    async supprimerTheme() {
        await this.page.on('dialog', async (dialog) => {
            await dialog.accept();
          });
          await this.page.click('#boutonChangeant');
    }

    async getPhotosChoisies() {
        const imageChoisi = await this.page.waitForSelector('#imageChoisi');
        return await imageChoisi.$$eval('img', (imgs) => imgs.length);
    }

    async getPhotosEnAttente() {
        const imageEnAttente = await this.page.waitForSelector('#imageEnAttente');
        return await imageEnAttente.$$eval('img', (imgs) => imgs.length);
    }


}
