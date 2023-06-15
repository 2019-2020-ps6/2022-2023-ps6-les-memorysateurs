import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ResultatPartieFixture extends E2EComponentFixture {

    async getImages() {
        return await this.page.locator('#boite-images-trouvees img').all();
    }

    async voirStatistiques() {
        const boutonStat = await this.page.getByRole('button', {name:'Statistiques'}).all();
        await boutonStat[0].click();
    }



}