import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import { AuthentificationFixture } from 'src/app/authentification/authentification.fixture';
import { ListePatientFixture } from 'src/app/liste-patient/liste-patient.fixture';
import { CreerPatientFixture } from 'src/app/creer-patient/creer-patient.fixture';
import { ProfilPatientFixture } from 'src/app/profil-patient/profil-patient.fixture';

test.describe('Création nouveau patient', () => {
  test('Test de création du profil du patient', async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);

    //create all fixtures

    const appComponentFixture = new AppFixture(page);
    const authentificationFixture = new AuthentificationFixture(page);
    const listePatientFixture = new ListePatientFixture(page);
    const creerPatientFixture = new CreerPatientFixture(page);
    const profilPatientFixture = new ProfilPatientFixture(page);    

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

    // Vérification page liste des patients

    await test.step('Liste des patients', async () => {
      expect(await page.url()).toContain(`${testUrl}/liste-patient`);

      expect(await listePatientFixture.getPatientsLength()).toBe(4);

      expect(await listePatientFixture.getAjouterPatientButtonVisible()).toBe(true);

    });

    // Vérification de l'action "Ajouter un patient"

    await test.step('Creation patient', async () => {
      await listePatientFixture.ajouterPatient();
      expect(await page.url()).toContain(`${testUrl}/creer-patient`);

      expect(await authentificationFixture.getByLabel('NOUVEAU PROFIL').textContent()).toEqual('NOUVEAU PROFIL');

      const inputName = await creerPatientFixture.getInput('input-prenom');
      await inputName.type('Lucy');
      const inputFirstName = await creerPatientFixture.getInput('input-nom');
      await inputFirstName.type('Borg'); 

      await creerPatientFixture.clickRadioButton('#radio2'); 
      expect(await creerPatientFixture.getRadioButtonChecked('radio2')).toBe(true);

      await creerPatientFixture.ajouterPhoto('src/assets/images/patient-femme.png');

      await creerPatientFixture.creerPatient();

      expect(await page.url()).toContain(`${testUrl}/liste-patient`);

      expect(await listePatientFixture.getPatientsLength()).toBe(5);

      expect(await listePatientFixture.getPatientData(4)).toBeDefined();
    });

     // Modification du profil patient

    await test.step('Modification patient', async () => {
      await listePatientFixture.selectionnerPatient(4);

      await profilPatientFixture.modifierProfil();

      const inputName = await creerPatientFixture.getInput('input-prenom');
      await inputName.type('John');
      const inputFirstName = await creerPatientFixture.getInput('input-nom');
      await inputFirstName.type('Doe'); 

      await creerPatientFixture.clickRadioButton('#radio3'); 
      expect(await creerPatientFixture.getRadioButtonChecked('radio3')).toBe(true);

      await creerPatientFixture.ajouterPhoto('src/assets/images/patient-homme.png');

      await creerPatientFixture.creerPatient();

      await listePatientFixture.selectionnerPatient(4);

      expect(await profilPatientFixture.getPatientData('#input-prenom')).toEqual('John');
      expect(await profilPatientFixture.getPatientData('#input-nom')).toEqual('Doe');
      expect(await profilPatientFixture.getPatientData('#info-stade')).toEqual('Stade 5');

    });


    // Suppression du profil patient


    await test.step('Suppresion patient', async () => {
      await page.click('#modifier-le-profil');
      await page.on('dialog', async (dialog) => {
        await dialog.accept(); // Accepter la fenêtre contextuelle (appuyer sur OK)
      });
      await page.click('#supprimer-profil');
    
      const patientsApresSuppression = await page.getByRole('button', {name:'SELECTIONNER'}).all();
      expect(patientsApresSuppression.length).toBe(4);
    });



    // Verification profil patient

    await test.step('Profil patient', async () => {
      const patientsApresSuppression = await page.getByRole('button', {name:'SELECTIONNER'}).all();
      await patientsApresSuppression[0].click();

      const detailsPatientUrl = await page.url();
      expect(detailsPatientUrl).toContain(`${testUrl}/profil-patient`);

      const prenomText = await page.textContent('#input-prenom');
      expect(prenomText).toBe('Marie');

      const nomText = await page.textContent('#input-nom');
      expect(nomText).toBe('Stade3');

      const stadeText = await page.textContent('#info-stade');
      expect(stadeText).toBe('Stade 3');
    });

    // Verification des statistiques

    await test.step('Modification patient', async () => {
      const statistiquesButton = await page.waitForSelector('#stats');
      await statistiquesButton.click();

      const prenomStat = await page.textContent('.profil-prenom');
      const nomStat = await page.textContent('.profil-nom');
      expect(prenomStat).toBe('Marie');
      expect(nomStat).toBe('Stade3');

      const stadeStat = await page.textContent('.profil-stade');
      expect(stadeStat).toBe('Stade 3');

      const partiesJoueesStat = await page.textContent('#profil-parties');
      expect(partiesJoueesStat).not.toBe('');

      const statContainers = await page.$$('.containerStats app-statcontainer');
      expect(statContainers.length).toBe(4);

      for (const statcontainer of statContainers) {
        const isVisible = await statcontainer.isVisible();
        expect(isVisible).toBe(true);

        const statistiquesPlus = await statcontainer.$('.plus');
        // @ts-ignore
        await statistiquesPlus.click();

        const toggleButton = await statcontainer.$('.plus');
        // @ts-ignore
        const isVisiblePlus = await toggleButton.isVisible();
        expect(isVisiblePlus).toBe(true);

        const contentStat = await statcontainer.$('.content');
        // @ts-ignore
        const isActive = await contentStat.getAttribute('class');
        expect(isActive).toContain('active');

        const headersStat = await statcontainer.$$('#header p');
        expect(headersStat.length).toBe(4);

        for (const headerStat of headersStat) {
          const text = await headerStat.textContent();
          expect(text).not.toBe('');
        }

        const tableauStat = await statcontainer.$('.tableau');
        // @ts-ignore
        const idTab = await tableauStat.getAttribute('id');
        expect(idTab).not.toBe('');
        // @ts-ignore
        await statistiquesPlus.click();
      }

    });


  });

});

