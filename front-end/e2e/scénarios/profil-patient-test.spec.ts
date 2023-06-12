import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Liste des patients', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/liste-patient`);
    const appComponentFixture = new AppFixture(page);

    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(4);

    const patientData = await items[0].getAttribute('item');
    expect(patientData).toBeDefined();

    const editerEnable = await items[0].getAttribute('editerEnable');
    expect(editerEnable).toBe(null);

    await items[0].dispatchEvent('selectionneEvent', 'click');

    // Vérification de la redirection vers la page de détails du patient
    const detailsPatientUrl = await page.url();
    expect(detailsPatientUrl).toContain(`${testUrl}/profil-patient`);

    // Vérification des informations mises à jour du patient
    const prenomText = await page.textContent('#input-prenom');
    expect(prenomText).toBe('Marie');

    const nomText = await page.textContent('#input-nom');
    expect(nomText).toBe('Perroti');

    const stadeText = await page.textContent('#info-stade');
    expect(stadeText).toBe('Stade 3');

    const photoSrc = await page.getAttribute('#affichage-photo', 'src');
    expect(photoSrc).toContain('patient-femme.png');

    });
});