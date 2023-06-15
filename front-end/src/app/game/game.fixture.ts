import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class GameFixture extends E2EComponentFixture {

    async getFlipped() {
        return await this.page.locator('.flipped').all();
    }

    async getCards() {
        return await this.page.locator('.card').all();
    }

    async getIdCards() {
        const cards = await this.getCards();
        const idcard = [];
        for(let i=0;i<cards.length;i++ ) {
            let num = await cards[i].getAttribute('id');
            if(num !='0')
                idcard.push(num);
        }
        return idcard;
    }

    async indice() {
        const indice = await this.page.waitForSelector('#boutonIndice');
        await indice.click();
    }

    async retournerCarte(idcard1 : string, idcard2 : any = null) {
        const cards = await this.getCards();
        const idcard = await this.getIdCards();
        if(idcard2 == null) {
            await cards[idcard.indexOf(idcard1)].click();
        } else {
            await cards[idcard.indexOf(idcard1,idcard2)].click();
        }
    }

    async avertissement() {
        const avertissement = await this.page.waitForSelector('#combSection ');
        await avertissement.click();
    }


}