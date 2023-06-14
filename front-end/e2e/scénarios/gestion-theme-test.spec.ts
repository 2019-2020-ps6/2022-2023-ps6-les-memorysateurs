import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AuthentificationFixture } from 'src/app/authentification/authentification.fixture';
import { AppFixture } from 'src/app/app.fixture';
import { ListePatientFixture } from 'src/app/liste-patient/liste-patient.fixture';
import { ListeThemeFixture } from 'src/app/liste-theme/liste-theme.fixture';

test.describe('Liste des themes', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);

    //create all fixtures

    const appComponentFixture = new AppFixture(page);
    const authentificationFixture = new AuthentificationFixture(page);
    const listePatientFixture = new ListePatientFixture(page);
    const listeThemeFixture = new ListeThemeFixture(page);



    // Connexion

    await test.step('Connexion', async () => {
      const titreConnexion = authentificationFixture.getByLabel('CONNEXION');
      expect(await titreConnexion.textContent()).toEqual('CONNEXION');

      const inputName = await authentificationFixture.getInput('identifiant');
      await inputName.type('SarahGentille');
      const inputPassword = await authentificationFixture.getInput('motDePasse');
      await inputPassword.type('1234');

      await authentificationFixture.seConnecter();
    });

    // Liste des themes

    await test.step('Liste des themes', async () => {

      await listePatientFixture.ouvrirMenu();
      await listePatientFixture.goTheme();

      expect(await page.url()).toContain(`${testUrl}/liste-theme`);

      expect(await listeThemeFixture.getThemesLength()).toBe(2);

      expect(await listeThemeFixture.getAjouterThemeButtonVisible()).toBe(true);

      const themes = await listeThemeFixture.getThemes();

      for (const theme of themes) {
        expect(await listeThemeFixture.getThemeData(theme)).toBeDefined();
      }
    });


    // Creation d'un nouveau theme

    await test.step('Creer un theme', async () => {
      await listeThemeFixture.ajouterTheme();
      
      const titre = await page.waitForSelector('#Titre-Nouveau-theme');
      const titreText = await titre.textContent();
      expect(titreText).toBe('NOUVEAU THEME');

      await page.fill('#div-nom-theme', 'test nouveau thème');
      await page.setInputFiles('#recup-fichier', ['src/assets/images/patient-homme.png']);


      const imageChoisi = await page.waitForSelector('#imageChoisi');
      const imageChoisiChildren = await imageChoisi.$$eval('img', (imgs) => imgs.length);
      expect(imageChoisiChildren).toBe(1);

      const imageEnAttente = await page.waitForSelector('#imageEnAttente');
      const imageEnAttenteChildren = await imageEnAttente.$$eval('img', (imgs) => imgs.length);
      expect(imageEnAttenteChildren).toBe(4);

      await page.click('#imageEnAttente img');


      const inputNomTheme = await page.waitForSelector('#div-nom-theme');
      const nomThemeValue = await inputNomTheme.inputValue();
      expect(nomThemeValue).toBe('test nouveau thème');

      await page.fill('#url-image', 'https://img.freepik.com/vecteurs-premium/pouce-air-traiter-accepter-symbole-silhouette-geste-bras-noir_532867-358.jpg');
      await page.click('#importer-URL');
      await page.click('#imageEnAttente img');

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
    });


    // Modification d'un theme

    await test.step('Modifier un theme', async () => {
      const themesApresCreation = await page.getByRole('button', {name:'EDITER'}).all();
      await themesApresCreation[1].click();

      await page.fill('#div-nom-theme', 'test modifier thème');

      await page.click('#imageChoisi img');

      await page.fill('#url-image', 'https://teteamodeler.ouest-france.fr/assets/coloriages/dessin-dune-tte-de-koala.png');
      await page.click('#importer-URL');

      const imageEnAttenteModif = await page.waitForSelector('#imageEnAttente');
      const imageEnAttenteChildrenModif = await imageEnAttenteModif.$$eval('img', (imgs) => imgs.length);
      expect(imageEnAttenteChildrenModif).toBe(5);

      //await page.click('#imageEnAttente img');

      const imageChoisiModif = await page.waitForSelector('#imageChoisi');
      const imageChoisiChildrenModif = await imageChoisiModif.$$eval('img', (imgs) => imgs.length);
      expect(imageChoisiChildrenModif).toBe(4);

      const inputNomThemeModif = await page.waitForSelector('#div-nom-theme');
      const nomThemeValueModif = await inputNomThemeModif.inputValue();
      expect(nomThemeValueModif).toBe('test modifier thème');

      await page.click('#boutonValidationTheme');

      const profilPatientUrlModif = await page.url();
      expect(profilPatientUrlModif).toContain(`${testUrl}/liste-theme`);
    });


    // Suppression d'un theme

    await test.step('Supprimer un theme', async () => {
      const themesApresModification = await page.getByRole('button', {name:'EDITER'}).all();
      await themesApresModification[1].click();
      await page.on('dialog', async (dialog) => {
        await dialog.accept(); // Accepter la fenêtre contextuelle (appuyer sur OK)
      });
      await page.click('#boutonChangeant');
    });


    // Selectionner un theme

    await test.step('Selectionner un theme', async () => {
      const themeChoisi = await page.getByRole('button', {name:'SELECTIONNER'}).all();
      await themeChoisi[1].click();
    });

  });
});
