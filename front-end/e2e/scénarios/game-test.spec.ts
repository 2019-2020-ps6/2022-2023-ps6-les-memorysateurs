import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import {Card} from "../../src/app/game/card.component";

test.describe('Jouer une partie', () => {
  test('Test de jouer une partie', async ({ page }) => {
    Math.random = () => {
      return 1;
    }
    await page.goto(`${testUrl}/game`);
    const appComponentFixture = new AppFixture(page);

  /*  const cardContainer = await page.$$('app-cardcontainer');
    const cards = await cardContainer[0].$$('app-card');
    for(let i=0;i<cards.length;i++ ){
      let div = await cards[i].$$('div');
      let num = null;
      while (num == null)
        num = await div[0].getAttribute('data-id');
      console.log(num);

    }*/
    const idcard = [];
    let cards = await page.locator('.card').all();
    for(let i=0;i<cards.length;i++ ) {
      let num = await cards[i].getAttribute('id');
      if(num !='0')
        idcard.push(num);

    }


    const indice = await page.waitForSelector('#boutonIndice');

    await indice.click();
    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('2')].click();
    await page.waitForTimeout(5000);
    await indice.click();




  });

});


