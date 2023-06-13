import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Liste des themes', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);
    const appComponentFixture = new AppFixture(page);

    // Connexion
    const titreConnexion = await page.waitForSelector('#connexion');
    const titreTextConnexion = await titreConnexion.textContent();
    expect(titreTextConnexion).toBe('CONNEXION');

    await page.fill('#identifiant', 'SarahGentille');
    await page.fill('#motDePasse', '1234');

    await page.getByRole('button', {name:'Me Connecter'}).click();

    const menuItems = await page.locator('.burger-menu').all();
    await menuItems[0].click();

    const lienTheme =await page.locator('#lien-themes');
    await lienTheme.click();

    // Liste des themes
    
    const title = await page.waitForSelector('h2');
    const titleText = await title.textContent();
    expect(titleText).toBe('Ajouter un thème');

    const ajouterThemeButton = await page.waitForSelector('.bouton-ajouter-theme');
    const isThemeVisible = await ajouterThemeButton.isVisible();
    expect(isThemeVisible).toBe(true);

    const themes = await page.$$('app-item-frame');
    expect(themes.length).toBe(2);

    for (const theme of themes) {
        const themeData = await theme.getAttribute('item');
        expect(themeData).toBeDefined();
  
        const editerEnable = await theme.getAttribute('editerEnable');
        expect(editerEnable).toBe(null);
      }


    // Creation d'un nouveau theme

    await page.click('.bouton-ajouter-theme');

    const titre = await page.waitForSelector('#Titre-Nouveau-theme');
    const titreText = await titre.textContent();
    expect(titreText).toBe('NOUVEAU THEME');

    await page.fill('#div-nom-theme', 'test nouveau thème');
    await page.setInputFiles('#recup-fichier', ['src/assets/images/patient-homme.png']);

    const imageEnAttente = await page.waitForSelector('#imageEnAttente');
    const imageEnAttenteChildren = await imageEnAttente.$$eval('img', (imgs) => imgs.length);
    expect(imageEnAttenteChildren).toBe(5);

    await page.dblclick('#imageEnAttente img');

    const imageChoisi = await page.waitForSelector('#imageChoisi');
    const imageChoisiChildren = await imageChoisi.$$eval('img', (imgs) => imgs.length);
    expect(imageChoisiChildren).toBe(2);

    const inputNomTheme = await page.waitForSelector('#div-nom-theme');
    const nomThemeValue = await inputNomTheme.inputValue();
    expect(nomThemeValue).toBe('test nouveau thème');

    await page.fill('#url-image', 'https://img.freepik.com/vecteurs-premium/pouce-air-traiter-accepter-symbole-silhouette-geste-bras-noir_532867-358.jpg');
    await page.click('#importer-URL');
    await page.dblclick('#imageEnAttente img');

    const imageChoisiChildrenURL = await imageChoisi.$$eval('img', (imgs) => imgs.length);
    expect(imageChoisiChildrenURL).toBe(4);

    const urlInput = await page.waitForSelector('#url-image');
    const urlInputValue = await urlInput.inputValue();
    expect(urlInputValue).toBe('');

    const formTheme = await page.waitForSelector('#form-nom-theme');
    const formThemeValue = await formTheme.$eval('input', (input) => input.value);
    expect(formThemeValue).toBe('test nouveau thème');

    await page.click('#boutonValidationTheme');
    
    const profilPatientUrl = await page.url();
    expect(profilPatientUrl).toContain(`${testUrl}/liste-theme`);

    const themesApresCreationListe = await page.$$('app-item-frame');
    expect(themesApresCreationListe.length).toBe(3);


    // Modification d'un theme

    const themesApresCreation = await page.getByRole('button', {name:'EDITER'}).all();
    await themesApresCreation[2].click();

    await page.fill('#div-nom-theme', 'test modifier thème');

    await page.dblclick('#imageChoisi img');

    await page.setInputFiles('#recup-fichier', ['src/assets/images/patient-homme.png']);

    const imageEnAttenteModif = await page.waitForSelector('#imageEnAttente');
    const imageEnAttenteChildrenModif = await imageEnAttenteModif.$$eval('img', (imgs) => imgs.length);
    expect(imageEnAttenteChildrenModif).toBe(7);

    await page.dblclick('#imageEnAttente img');

    const imageChoisiModif = await page.waitForSelector('#imageChoisi');
    const imageChoisiChildrenModif = await imageChoisiModif.$$eval('img', (imgs) => imgs.length);
    expect(imageChoisiChildrenModif).toBe(4);

    const inputNomThemeModif = await page.waitForSelector('#div-nom-theme');
    const nomThemeValueModif = await inputNomThemeModif.inputValue();
    expect(nomThemeValueModif).toBe('test modifier thème');

    await page.click('#boutonValidationTheme');
    
    const profilPatientUrlModif = await page.url();
    expect(profilPatientUrlModif).toContain(`${testUrl}/liste-theme`);


    // Suppression d'un theme

    const themesApresModification = await page.getByRole('button', {name:'EDITER'}).all();
    await themesApresModification[2].click();
    await page.click('#boutonChangeant');    


    // Selectionner un theme

    const themeChoisi = await page.getByRole('button', {name:'SELECTIONNER'}).all();
    await themeChoisi[1].click();

  }); 
});
