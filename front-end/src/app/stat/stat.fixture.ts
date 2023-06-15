import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class StatistiquesFixture extends E2EComponentFixture {

    async getContainers() {
        return await this.page.$$('.containerStats app-statcontainer');
    }

    async getNombreContainers() {
        return this.getContainers().then(containers => containers.length);
    }  

    async getPlusVisible(container : any) {
        const toggleButton = await container.$('.plus');
        // @ts-ignore
        return await toggleButton.isVisible();
    }
    
    async appuyerSurPlus(container : any) {
        const statistiquesPlus = await container.$('.plus');
        // @ts-ignore
        await statistiquesPlus.click();
    }

    async getContainerVisible(container : any) {
        const contentStat = await container.$('.content');
        // @ts-ignore
        return await contentStat.getAttribute('class');
    }

    async getHeadersTableau(container : any) {
        return await container.$$('#header p');
    }

    async getNombreHeadersTableau(container : any) {
        return this.getHeadersTableau(container).then(headers => headers.length);
    }

    async getTableau(container : any) {
        const tableauStat = await container.$('.tableau');
        // @ts-ignore
        return await tableauStat.getAttribute('id');
    }
}