import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreerPatientFixture extends E2EComponentFixture {

    getByLabel(label: string) {
        return this.page.getByText(label, { exact: true });
    }

    getInput(id: string) {
        const selector = `#${id}`;
        return this.page.waitForSelector(selector);
    }  

    async creerPatient() {
        await this.page.click('#creer-profil');
    }

    async getCreerPatientButtonVisible() {
        return this.page.isVisible('#creer-profil');
    }

    async clickRadioButton(id: string) {
        await this.page.dispatchEvent(id, 'click');
    }

    async getRadioButtonChecked(id: string) {
        return this.page.isChecked(`#${id}`);
    }

    async ajouterPhoto(photo: string) {
        await this.page.setInputFiles('#photo-button', [photo]);
    }


}
