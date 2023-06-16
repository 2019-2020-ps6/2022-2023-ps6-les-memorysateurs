import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AuthentificationFixture extends E2EComponentFixture {

    getByLabel(label: string) {
        return this.page.getByText(label, { exact: true });
    }

    getInput(id: string) {
        const selector = `#${id}`;
        return this.page.waitForSelector(selector);
    }

    getConnectButton() {
        return this.page.getByRole('button', { name: 'Me Connecter' });
    }

  getCreerCompteButton() {
    return this.page.getByRole('link', { name: 'CREER UN COMPTE' });
  }

    seConnecter(numberOfClick = 1) {
        return this.getConnectButton().click({ clickCount: numberOfClick });
    }

}
