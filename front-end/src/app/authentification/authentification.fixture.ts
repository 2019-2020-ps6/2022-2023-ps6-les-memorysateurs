import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AuthentificationFixture extends E2EComponentFixture {
    getByLabel(label: string) {
        return this.page.getByText(label, { exact: true }).allTextContents();
    }
}
