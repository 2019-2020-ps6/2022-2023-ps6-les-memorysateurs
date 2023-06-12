import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Création d\'un nouveau thème', () => {
  test('Test de création du thème', async ({ page }) => {
    await page.goto(`${testUrl}/creer-theme`);
    const appComponentFixture = new AppFixture(page);

    // Vérification du texte "NOUVEAU THEME"
    const titre = await page.waitForSelector('#Titre-Nouveau-theme');
    const titreText = await titre.textContent();
    expect(titreText).toBe('NOUVEAU THEME');

    // Ajout d'une image au thème
    const image = await page.waitForSelector('#image');
    await image.setInputFiles('src/assets/images/patient-homme.png');

    //ajout d'une iage par url
    const url = await page.waitForSelector('#url');
    await url.fill('https://www.google.com/url?sa=i&url=https%3A%2F%2Femojis.wiki%2Ffr%2Fpouce-pointant-vers-le-haut%2F&psig=AOvVaw0t0UZwhavUs-9M2r33L5ko&ust=1686661734897000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCID8rN_mvf8CFQAAAAAdAAAAABAD');

    // Validation de la création du thème
    const creerThemeButton = await page.waitForSelector('#bas-vert');
    await creerThemeButton.click();
    
    // Vérification de la création réussie
    const profilPatientUrl = await page.url();
    expect(profilPatientUrl).toContain(`${testUrl}/liste-theme`);

    // Vérification des éléments de la liste des themes
    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(3);

    const patientData = await items[2].getAttribute('item');
    expect(patientData).toBeDefined();

    const editerEnable = await items[2].getAttribute('editerEnable');
    expect(editerEnable).toBe(null);

    await items[2].dispatchEvent('selectionneEvent', { 
    detail: {
        nom: 'Nouveau thème',
        id: 'id'
    }
    });

    });

});


