import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Modification du profil d\'un patient', () => {
  test('Test de modification du profil du patient', async ({ page }) => {
    await page.goto(`${testUrl}/profil-patient`);
    const appComponentFixture = new AppFixture(page);

    // Cliquer sur le bouton de modification du profil du patient
    await page.click('#modifier-le-profil');

    // Modification des informations du patient
    await page.fill('#input-prenom', 'John');
    await page.fill('#input-nom', 'Doe');
    await page.dispatchEvent('#radio3', 'click');
    await page.setInputFiles('#photo-button', ['src/assets/images/patient-homme.png']);

    // Validation de la modification du profil du patient
    await page.click('#creer-profil');

    // Aller sur la page du profil du patient
    const items = await page.$$('app-item-frame');
    await items[0].dispatchEvent('selectionneEvent', 'click');

    // Vérification des informations mises à jour du patient
    const prenomText = await page.textContent('#input-prenom');
    expect(prenomText).toBe('John');

    const nomText = await page.textContent('#input-nom');
    expect(nomText).toBe('Doe');

    const stadeText = await page.textContent('#info-stade');
    expect(stadeText).toBe('Stade 5');


  });
});
