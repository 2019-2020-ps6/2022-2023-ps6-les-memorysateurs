import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Sélection d\' un thème dans la liste des thèmes en partant du menu burger', () => {
  test('Test de sélection d\'un thème', async ({page}) => {
    await page.goto(`${testUrl}/liste-patient`);
    const appComponentFixture = new AppFixture(page);

    const menuItems = await page.locator('.burger-menu').all();
    await menuItems[0].click();

    const lienTheme =await page.locator('#lien-themes');
    await lienTheme.click();


    const items = await page.getByRole('button', {name:'SELECTIONNER'}).all();
    await items[1].click();
  })
})
