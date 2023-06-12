import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Création nouveau patient', () => {
  test('Test de création du profil du patient', async ({ page }) => {
    await page.goto(`${testUrl}/creer-patient`);
    const appComponentFixture = new AppFixture(page);

    // Vérification du texte "NOUVEAU PROFIL"
    const titre = await page.waitForSelector('#text-nouveau-profil');
    const titreText = await titre.textContent();
    expect(titreText).toBe('NOUVEAU PROFIL');

    // Remplissage des informations du patient
    await page.fill('#input-prenom', 'Lucy');
    await page.fill('#input-nom', 'Borg');
    await page.check('#radio1');
    await page.setInputFiles('#photo-button', ['src/assets/images/patient-femme.png']);

    // Validation de la création du profil du patient
    const creerProfilButton = await page.waitForSelector('#creer-profil');
    await creerProfilButton.click();

    // Vérification de la création réussie
    const profilPatientUrl = await page.url();
    expect(profilPatientUrl).toContain(`${testUrl}/liste-patient`);

    // Vérification des éléments de la liste des patients
    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(5);

    const patientData = await items[4].getAttribute('item');
    expect(patientData).toBeDefined();

    const editerEnable = await items[4].getAttribute('editerEnable');
    expect(editerEnable).toBe(null);

    await items[4].dispatchEvent('selectionneEvent', { 
      detail: {
        nom: 'Perroti',
        prenom: 'Marie',
        stade: 'stade 3',
        id: 'id'
      }
    });

  });

});

