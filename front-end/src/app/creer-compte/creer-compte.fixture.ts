import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreerCompteFixture extends E2EComponentFixture {
  getInput(id: string) {
    const selector = `#${id}`;
    return this.page.waitForSelector(selector);
  }
  getValiderButton() {
    return this.page.getByRole('button', { name: 'Valider' });
  }
   generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }
}
