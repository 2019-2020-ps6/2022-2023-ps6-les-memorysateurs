import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Liste des patients', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/liste-patient`);
    const appComponentFixture = new AppFixture(page);

    // Vérification du titre
    const title = await page.waitForSelector('h2');
    const titleText = await title.textContent();
    expect(titleText).toBe('Ajouter un patient');

    // Vérification de l'existence du bouton "Ajouter un patient"
    const ajouterPatientButton = await page.waitForSelector('.bouton-ajouter-patient');
    const isButtonVisible = await ajouterPatientButton.isVisible();
    expect(isButtonVisible).toBe(true);

    //Verification de l'action du bouton "Ajouter un patient"
    await ajouterPatientButton.click();
    const url = await page.url();
    expect(url).toBe(`${testUrl}/creer-patient`);
    await page.goBack();

    // Vérification des éléments de la liste des patients
    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(4);

    // Vérification des attributs et événements des éléments de la liste
    for (const item of items) {
      const patientData = await item.getAttribute('item');
      expect(patientData).toBeDefined();

      const editerEnable = await item.getAttribute('editerEnable');
      expect(editerEnable).toBe(null);

      await item.dispatchEvent('editerEvent', { 
        detail: {
          nom: 'nom',
          prenom: 'prenom',
          stade: 'stade',
          id: 'id'
        }
       });

      await item.dispatchEvent('selectionneEvent', { 
        detail: {
          nom: 'nom',
          prenom: 'prenom',
          stade: 'stade',
          id: 'id'
        }
       });
    }
    await page.goBack();
  });
});
