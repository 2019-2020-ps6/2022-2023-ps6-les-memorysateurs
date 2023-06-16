import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AuthentificationFixture } from 'src/app/authentification/authentification.fixture';
import { AppFixture } from 'src/app/app.fixture';
import { ListePatientFixture } from 'src/app/liste-patient/liste-patient.fixture';
import { ListeThemeFixture } from 'src/app/liste-theme/liste-theme.fixture';
import { CreerThemeFixture } from 'src/app/creer-theme/creer-theme.fixture';
import { MenuFixture } from 'src/app/menu/menu.fixture';

test.describe('Liste des themes', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);

    //create all fixtures

    const appComponentFixture = new AppFixture(page);
    const authentificationFixture = new AuthentificationFixture(page);
    const listePatientFixture = new ListePatientFixture(page);
    const listeThemeFixture = new ListeThemeFixture(page);
    const creerThemeFixture = new CreerThemeFixture(page);
    const menuFixture = new MenuFixture(page);


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

      await listePatientFixture.selectionnerPatient(0);
      await menuFixture.ouvrirMenu();
      await menuFixture.goTheme();

      expect(await page.url()).toContain(`${testUrl}/liste-theme`);

      expect(await listeThemeFixture.getThemesLength()).toBe(2);

      expect(await listeThemeFixture.getAjouterThemeButtonVisible()).toBe(true);

      const themes = await listeThemeFixture.getThemes();
    });


    // Creation d'un nouveau theme

    await test.step('Creer un theme', async () => {
      await listeThemeFixture.ajouterTheme();

      expect(await page.url()).toContain(`${testUrl}/creer-theme`);

      const inputName = await creerThemeFixture.getInput('div-nom-theme');
      await inputName.fill('test nouveau thème');
      expect(await inputName.inputValue()).toBe('test nouveau thème');


      expect (await creerThemeFixture.getPhotosChoisies()).toBe(0);
      await creerThemeFixture.importerPhoto('src/assets/images/patient-homme.png');
      expect (await creerThemeFixture.getPhotosChoisies()).toBe(1);

      await creerThemeFixture.importerPhotoUrl('https://img.freepik.com/vecteurs-premium/pouce-air-traiter-accepter-symbole-silhouette-geste-bras-noir_532867-358.jpg');
      expect (await creerThemeFixture.getPhotosChoisies()).toBe(2);

      const urlInput = await page.waitForSelector('#url-image');
      const urlInputValue = await urlInput.inputValue();
      expect(urlInputValue).toBe('');

      await creerThemeFixture.ajoutePhoto();
      await creerThemeFixture.ajoutePhoto();
      expect (await creerThemeFixture.getPhotosChoisies()).toBe(4);
      expect (await creerThemeFixture.getPhotosEnAttente()).toBe(2);

      await page.click('#boutonValidationTheme');

      expect(await page.url()).toContain(`${testUrl}/liste-theme`);

      expect(await listeThemeFixture.getThemesLength()).toBe(3);

    });


    // Modification d'un theme

    await test.step('Modifier un theme', async () => {
      await listeThemeFixture.editerTheme(1);

      expect(await page.url()).toContain(`${testUrl}/creer-theme`);

      const inputName = await creerThemeFixture.getInput('div-nom-theme');
      await inputName.fill('test modifier thème');
      expect(await inputName.inputValue()).toBe('test modifier thème');

      await creerThemeFixture.retirerPhoto();

      expect (await creerThemeFixture.getPhotosChoisies()).toBe(3);
      expect (await creerThemeFixture.getPhotosEnAttente()).toBe(5);

      await creerThemeFixture.importerPhotoUrl('https://teteamodeler.ouest-france.fr/assets/coloriages/dessin-dune-tte-de-koala.png')

      expect (await creerThemeFixture.getPhotosChoisies()).toBe(4);
      expect (await creerThemeFixture.getPhotosEnAttente()).toBe(5);

      await creerThemeFixture.creerTheme();

      expect(await page.url()).toContain(`${testUrl}/liste-theme`);

    });


    // Suppression d'un theme

    await test.step('Supprimer un theme', async () => {
      await listeThemeFixture.editerTheme(1);
      await creerThemeFixture.supprimerTheme();

      expect(await page.url()).toContain(`${testUrl}/liste-theme`);

      expect(await listeThemeFixture.getThemesLength()).toBe(2);

    });


    // Selectionner un theme

    await test.step('Selectionner un theme', async () => {
      await listeThemeFixture.selectionnerTheme(1);
    });

    // Déconnexion

    await test.step('Deconnexion', async () => {

      await menuFixture.deconnexion();

      expect(await page.url()).toContain(`${testUrl}/authentification`);

    });

  });
});
