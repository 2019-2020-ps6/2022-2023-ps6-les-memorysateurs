import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Liste des themes', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/liste-theme`);
    const appComponentFixture = new AppFixture(page);

    // Vérification du titre
    const title = await page.waitForSelector('h2');
    const titleText = await title.textContent();
    expect(titleText).toBe('Ajouter un thème');

    // Vérification de l'existence du bouton "Ajouter un patient"
    const ajouterThemeButton = await page.waitForSelector('.bouton-ajouter-theme');
    const isThemeVisible = await ajouterThemeButton.isVisible();
    expect(isThemeVisible).toBe(true);

    // Vérification des éléments de la liste des patients
    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(2);

    const themeData = await items[0].getAttribute('item');
    expect(themeData).toBeDefined();

    const editerEnable = await items[0].getAttribute('editerEnable');
    expect(editerEnable).toBe(null);

    await items[0].dispatchEvent('selectionneEvent', { 
      detail: {
        nom: 'defaut',
        id: 'id'
      }
    });

  }); 
});
