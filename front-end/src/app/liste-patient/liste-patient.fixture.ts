import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ListePatientFixture extends E2EComponentFixture {

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

    async getPatients() {
        return await this.page.$$('app-item-frame');
    }

    async getPatient(index: number) {
        const patients = await this.getPatients();
        return patients[index];
    }

    async getPatientsLength() {
        return this.page.$$('app-item-frame').then((patients) => patients.length);
    }

    async getAjouterPatientButton() {
        return await this.page.locator('.bouton-ajouter-patient');
    }

    async getAjouterPatientButtonVisible() {
        const ajouterPatientButton = await this.getAjouterPatientButton();
        return await ajouterPatientButton.isVisible();
    }

    async ajouterPatient() {
        const ajouterPatientButton = await this.getAjouterPatientButton();
        await ajouterPatientButton.click();
    }

    async selectionnerPatient(index: number) {
        const patients = await this.page.getByRole('button', {name:'SELECTIONNER'}).all();
        await patients[index].click();
    }

}
