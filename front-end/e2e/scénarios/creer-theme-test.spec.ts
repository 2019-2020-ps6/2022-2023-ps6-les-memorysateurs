import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Création d\'un nouveau thème', () => {
  test('Test de création du thème avec une image', async ({ page }) => {
    await page.goto(`${testUrl}/creer-theme`);
    const appComponentFixture = new AppFixture(page);

    // Vérification du texte "NOUVEAU THEME"
    const titre = await page.waitForSelector('#Titre-Nouveau-theme');
    const titreText = await titre.textContent();
    expect(titreText).toBe('NOUVEAU THEME');

    // Remplissage des informations du thème
    await page.fill('#div-nom-theme', 'Nouveau thème');
    await page.setInputFiles('#recup-fichier', ['src/assets/images/patient-homme.png']);

    // Vérification de la présence de l'image en attente
    const imageEnAttente = await page.waitForSelector('#imageEnAttente');
    const imageEnAttenteChildren = await imageEnAttente.$$eval('img', (imgs) => imgs.length);
    expect(imageEnAttenteChildren).toBe(5);

    // double-Clique sur l'image en attente pour la déplacer vers les images choisies
    await page.dblclick('#imageEnAttente img');

    // Vérification de la présence de l'image dans les images choisies
    const imageChoisi = await page.waitForSelector('#imageChoisi');
    const imageChoisiChildren = await imageChoisi.$$eval('img', (imgs) => imgs.length);
    expect(imageChoisiChildren).toBe(2);

    // Vérification du nom du thème
    const inputNomTheme = await page.waitForSelector('#div-nom-theme');
    const nomThemeValue = await inputNomTheme.inputValue();
    expect(nomThemeValue).toBe('Nouveau thème');

    // Clique sur le bouton d'importation d'une URL
    await page.click('#importer-URL');

    // Vérification de la présence de l'image en attente après l'importation d'une URL
    const imageEnAttenteAfterURL = await page.waitForSelector('#imageEnAttente');
    const imageEnAttenteChildrenAfterURL = await imageEnAttenteAfterURL.$$eval('img', (imgs) => imgs.length);
    expect(imageEnAttenteChildrenAfterURL).toBe(3);

    // Vérification de l'URL importée
    const urlInput = await page.waitForSelector('#url-image');
    const urlInputValue = await urlInput.inputValue();
    expect(urlInputValue).toBe('');

    // Vérification du formulaire de thème
    const formTheme = await page.waitForSelector('#form-nom-theme');
    const formThemeValue = await formTheme.$eval('input', (input) => input.value);
    expect(formThemeValue).toBe('Nouveau thème');

    // ajout de 2 autres images
    await page.dblclick('#imageEnAttente img');
    await page.dblclick('#imageEnAttente img');

    // Clique sur le bouton de validation du thème
    await page.click('#boutonValidationTheme');

    // Vérification de la création réussie
    const profilPatientUrl = await page.url();
    expect(profilPatientUrl).toContain(`${testUrl}/liste-theme`);

    // Vérification des éléments de la liste des themes
    const items = await page.$$('app-item-frame');
    expect(items.length).toBe(2);

    const patientData = await items[1].getAttribute('item');
    expect(patientData).toBeDefined();

    const editerEnable = await items[1].getAttribute('editerEnable');
    expect(editerEnable).toBe(null);

    await items[1].dispatchEvent('selectionneEvent', { 
    detail: {
        nom: 'Nouveau thème',
        id: 'id'
    }
    });

    });

});


