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

    // Vérification des éléments de la liste des patients
    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(4);

    // Vérification des attributs et événements des éléments de la liste
    for (const item of items) {
      // Vérification de l'attribut "item" avec les données du patient
      const patientData = await item.getAttribute('item');
      expect(patientData).toBeDefined();

      // Vérification de la désactivation de l'édition (attribut "editerEnable")
      const editerEnable = await item.getAttribute('editerEnable');
      expect(editerEnable).toBe(null);

      // Simulation d'un événement d'édition
      await item.dispatchEvent('editerEvent', {  });

      // Simulation d'un événement de sélection
      await item.dispatchEvent('selectionneEvent', {  });
    }
  });
});
