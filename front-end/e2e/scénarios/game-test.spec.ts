import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';



test.describe('Jouer une partie', () => {
  test('Test de jouer une partie', async ({ page }) => {
    await page.goto(`${testUrl}/game`);
    const appComponentFixture = new AppFixture(page);


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
    await indice.click();
    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('1',idcard.indexOf('1')+1)].click();
    await page.waitForTimeout(5000);
  });

});


