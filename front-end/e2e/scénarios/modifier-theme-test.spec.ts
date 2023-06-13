import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Modification du profil d\'un patient', () => {
    test('Test de modification du profil du patient', async ({ page }) => {
      await page.goto(`${testUrl}/liste-theme`);
      const appComponentFixture = new AppFixture(page);
  
      // Cliquer sur le bouton de modification du profil du patient
      const themes = await page.$$('app-item-frame');
      await themes[0].dispatchEvent('editerEvent', 'click');

    // Vérification du texte "NOUVEAU THEME"
    const titre = await page.waitForSelector('#Titre-Nouveau-theme');
    const titreText = await titre.textContent();
    expect(titreText).toBe('MODIFIER LE THEME');

    // Remplissage des informations du thème
    await page.fill('#div-nom-theme', 'test modifier thème');

    //Retirer une image des images choisies
    await page.dblclick('#imageChoisi img');

    await page.setInputFiles('#recup-fichier', ['src/assets/images/patient-homme.png']);

    // Vérification de la présence de l'image en attente
    const imageEnAttente = await page.waitForSelector('#imageEnAttente');
    const imageEnAttenteChildren = await imageEnAttente.$$eval('img', (imgs) => imgs.length);
    expect(imageEnAttenteChildren).toBe(7);

    // double-Clique sur l'image en attente pour la déplacer vers les images choisies
    await page.dblclick('#imageEnAttente img');

    // Vérification de la présence de l'image dans les images choisies
    const imageChoisi = await page.waitForSelector('#imageChoisi');
    const imageChoisiChildren = await imageChoisi.$$eval('img', (imgs) => imgs.length);
    expect(imageChoisiChildren).toBe(4);

    // Vérification du nom du thème
    const inputNomTheme = await page.waitForSelector('#div-nom-theme');
    const nomThemeValue = await inputNomTheme.inputValue();
    expect(nomThemeValue).toBe('test modifier thème');

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
        nom: 'test modifier thème',
        id: 'id'
    }
    });

    });

});


