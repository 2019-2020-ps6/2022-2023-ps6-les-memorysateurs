import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import { AuthentificationFixture } from 'src/app/authentification/authentification.fixture';
import { ListePatientFixture } from 'src/app/liste-patient/liste-patient.fixture';
import { CreerPatientFixture } from 'src/app/creer-patient/creer-patient.fixture';
import { ProfilPatientFixture } from 'src/app/profil-patient/profil-patient.fixture';
import { StatistiquesFixture } from 'src/app/stat/stat.fixture';

test.describe('Création nouveau patient', () => {
  test('Test de création du profil du patient', async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);

    //create all fixtures

    const appComponentFixture = new AppFixture(page);
    const authentificationFixture = new AuthentificationFixture(page);
    const listePatientFixture = new ListePatientFixture(page);
    const creerPatientFixture = new CreerPatientFixture(page);
    const profilPatientFixture = new ProfilPatientFixture(page);   
    const statistiquesFixture = new StatistiquesFixture(page); 

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

      await listePatientFixture.selectionnerPatient(4);

      expect(await profilPatientFixture.getPatientData('#input-prenom')).toEqual('Lucy');
      expect(await profilPatientFixture.getPatientData('#input-nom')).toEqual('Borg');
      expect(await profilPatientFixture.getPatientData('#info-stade')).toEqual('Stade 4');

    });

     // Modification du profil patient

    await test.step('Modification patient', async () => {

      await profilPatientFixture.modifierProfil();

      expect(await page.url()).toContain(`${testUrl}/creer-patient`);

      const inputName = await creerPatientFixture.getInput('input-prenom');
      await inputName.fill('John');
      const inputFirstName = await creerPatientFixture.getInput('input-nom');
      await inputFirstName.fill('Doe'); 

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

      await profilPatientFixture.modifierProfil();

      await creerPatientFixture.supprimerPatient();

      expect(await page.url()).toContain(`${testUrl}/liste-patient`);
    
      expect(await listePatientFixture.getPatientsLength()).toBe(4);

    });


    // Verification profil patient

    await test.step('Profil patient', async () => {
      
      await listePatientFixture.selectionnerPatient(0);

      expect(await page.url()).toContain(`${testUrl}/profil-patient`);

      expect(await profilPatientFixture.getPatientData('#input-prenom')).toEqual('Marie');
      expect(await profilPatientFixture.getPatientData('#input-nom')).toEqual('Stade3');
      expect(await profilPatientFixture.getPatientData('#info-stade')).toEqual('Stade 3');

    });

    // Verification des statistiques

    await test.step('Modification patient', async () => {
      
      await profilPatientFixture.voirStatistiques();

      expect(await page.url()).toContain(`${testUrl}/stat`);

      expect(await profilPatientFixture.getPatientData('.profil-prenom')).toEqual('Marie');
      expect(await profilPatientFixture.getPatientData('.profil-nom')).toEqual('Stade3');
      expect(await profilPatientFixture.getPatientData('.profil-stade')).toEqual('Stade 3');
      expect(await profilPatientFixture.getPatientData('#profil-parties')).not.toBe('');
      
      expect(await statistiquesFixture.getNombreContainers()).toBe(4);

      const statContainers = await statistiquesFixture.getContainers();

      for (const statcontainer of statContainers) {
        
        expect(await statistiquesFixture.getPlusVisible(statcontainer)).toBe(true);
        await statistiquesFixture.appuyerSurPlus(statcontainer);
        expect(await statistiquesFixture.getPlusVisible(statcontainer)).toBe(true);
        expect(await statistiquesFixture.getContainerVisible(statcontainer)).toContain('active');

        ;

        expect(await statistiquesFixture.getNombreHeadersTableau(statcontainer)).toBe(4);
        expect(await statistiquesFixture.getTableau(statcontainer)).not.toBe('');

        await statistiquesFixture.appuyerSurPlus(statcontainer);
      }

    });


  });

});

