import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ListeThemeFixture extends E2EComponentFixture {

    getTitle() {
      return this.page.getByLabel('h2');
    }





}
