import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import {AuthentificationFixture} from "../../src/app/authentification/authentification.fixture";
import {ListePatientFixture} from "../../src/app/liste-patient/liste-patient.fixture";
import {CreerPatientFixture} from "../../src/app/creer-patient/creer-patient.fixture";
import {ProfilPatientFixture} from "../../src/app/profil-patient/profil-patient.fixture";
import {StatistiquesFixture} from "../../src/app/stat/stat.fixture";
import {MenuFixture} from "../../src/app/menu/menu.fixture";
import {CreerCompteFixture} from "../../src/app/creer-compte/creer-compte.fixture";
import {ListeThemeFixture} from "../../src/app/liste-theme/liste-theme.fixture";
import {CreerThemeFixture} from "../../src/app/creer-theme/creer-theme.fixture";

test.describe("Scénario d'erreur", () => {
  test("L'ergothérapeute fait des manipulations en faisant des erreurs" , async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);
    const deco =await page.locator('#deconection');
    await page.on('dialog', async (dialog) => {
      await dialog.accept(); // Accepter la fenêtre contextuelle (appuyer sur OK)
    });

    const authentificationFixture = new AuthentificationFixture(page);
    const listePatientFixture = new ListePatientFixture(page);
    const creerPatientFixture = new CreerPatientFixture(page);
    const profilPatientFixture = new ProfilPatientFixture(page);
    const statistiquesFixture = new StatistiquesFixture(page);
    const listeThemeFixture = new ListeThemeFixture(page);
    const creerThemeFixture = new CreerThemeFixture(page);
    const creerCompteFixture = new CreerCompteFixture(page);
    const menuFixture = new MenuFixture(page);

    await test.step('Création de compte', async () => {
      const BTNcreerCompte = await authentificationFixture.getCreerCompteButton();
      await BTNcreerCompte.click();

      const inputName = await creerCompteFixture.getInput('identifiant');
      await inputName.type('Ergo1');
     await creerCompteFixture.getValiderButton().click();
      const inputMail = await creerCompteFixture.getInput('adresseEmail');



      const randomString = creerCompteFixture.generateRandomString(10);

      await inputMail.type(randomString + 'mail.fr'); // pour qu'on puisse relancer les tests sans relancer le back-end
      await creerCompteFixture.getValiderButton().click();
      const inputMdp = await creerCompteFixture.getInput('motDePasse');
      await inputMdp.type('1234');
      await creerCompteFixture.getValiderButton().click();
      const inputConfMdp = await creerCompteFixture.getInput('confirmerMotDePasse');
      await inputConfMdp.type('12345');
      await creerCompteFixture.getValiderButton().click();

      await inputConfMdp.fill('1234');
      await creerCompteFixture.getValiderButton().click();

    });
    await test.step('Création de patient', async () => {
      const ajouterPatient = await listePatientFixture.getAjouterPatientButton();
      await ajouterPatient.click();

      const inputName = await creerPatientFixture.getInput('input-prenom');
      await inputName.type('Prenom');
      await creerPatientFixture.creerPatient();
      const inputFirstName = await creerPatientFixture.getInput('input-nom');
      await inputFirstName.type('Nom');
      await creerPatientFixture.creerPatient();
      await creerPatientFixture.clickRadioButton('#radio2');
      expect(await creerPatientFixture.getRadioButtonChecked('radio2')).toBe(true);
      await creerPatientFixture.creerPatient();
      await creerPatientFixture.ajouterPhoto('src/assets/images/patient-femme.png');
      await creerPatientFixture.creerPatient();
    });
    await test.step('Création de thème', async () => {
      await listePatientFixture.selectionnerPatient(0);
      await menuFixture.ouvrirMenu();
      await menuFixture.goTheme();
      await listeThemeFixture.ajouterTheme();

      expect(await page.url()).toContain(`${testUrl}/creer-theme`);

      await creerThemeFixture.ajoutePhoto();
      await page.click('#boutonValidationTheme');
      await creerThemeFixture.ajoutePhoto();
      await page.click('#boutonValidationTheme');
      await creerThemeFixture.importerPhoto('src/assets/images/patient-homme.png');
      await page.click('#boutonValidationTheme');
      await creerThemeFixture.ajoutePhoto();
      await page.click('#boutonValidationTheme');
      await creerThemeFixture.ajoutePhoto();
      await page.click('#boutonValidationTheme');

      const inputName = await creerThemeFixture.getInput('div-nom-theme');
      await inputName.fill('test nouveau thème');

      await page.click('#boutonValidationTheme');


    });
    await test.step('supression patient et deconection', async () => {

      await menuFixture.ouvrirMenu();
      await menuFixture.goAccueil();

      await listePatientFixture.selectionnerPatient(0);
      profilPatientFixture.modifierProfil();
      await creerPatientFixture.supprimerPatientSansHandle();

      await menuFixture.deconnexion();

    });
  });
});
