import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ProfilPatientFixture extends E2EComponentFixture {

    async modifierProfil() {
        const modifierProfilButton = await this.page.locator('#modifier-le-profil');
        await modifierProfilButton.click();
    }

    async getPatientData(label: string) {
        return await this.page.textContent(label);
    }

    async voirStatistiques() {
        const statistiquesButton = await this.page.waitForSelector('#stats');
        await statistiquesButton.click();
    }

    async lancePartie() {
        await this.page.click('#lancer-partie');
    }

}