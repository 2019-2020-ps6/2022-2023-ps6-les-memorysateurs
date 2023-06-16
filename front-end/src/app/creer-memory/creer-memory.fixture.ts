import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreerMemoryFixture extends E2EComponentFixture {

    async choisirTheme() {
        const choisirTheme = await this.page.getByRole('button', {name:'CHOISIR UN THEME'}).all();
        await choisirTheme[0].click();
    }

    async getSliders() {
        return await this.page.locator('.nombre-slider').all();
    }

    async setNombreDeCartes(nb: number) {
        let boutons = await this.getSliders();
        await boutons[2].click();
        const nombreDeCartes = nb;
    }

    async setNombreIndices(nb: number) {
        let boutons = await this.getSliders();
        await boutons[5].click();
        const nombreIndices = nb;
    }

    async setNombreErreurs(nb: number) {
        let boutons = await this.getSliders();
        await boutons[7].click();
        const ErreurConsecutivesAvantIndice = nb;
    }

    async setNombreCombinaisons(nb: number) {
        let boutons = await this.getSliders();
        await boutons[11].click();
        const CombinaisonConsecutivesAvantAvertissement = nb; 
    }

    async setTempsIndice(nb: number) {
        const sliderTemps = await this.page.locator('.slider').all();
        await sliderTemps[0].scrollIntoViewIfNeeded();
        const boundingBox = await sliderTemps[0].boundingBox();
        // @ts-ignore
        const x = boundingBox.x ; // Décalage de 10 pixels à gauche de l'élément
        // @ts-ignore
        const y = boundingBox.y + boundingBox.height / 2; // Position verticale centrale de l'élément
        await this.page.mouse.click(x, y, { button: 'left' });
        const tempsIndice = nb;
    }

    async lancePartie() {
        await this.page.click('.btn-lauch');
    }



}