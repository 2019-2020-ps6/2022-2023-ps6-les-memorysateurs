import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Création nouveau patient', () => {
  test('Test de création du profil du patient', async ({ page }) => {
    await page.goto(`${testUrl}/authentification`);
    const appComponentFixture = new AppFixture(page);

    // Connexion
    const titreConnexion = await page.waitForSelector('#connexion');
    const titreTextConnexion = await titreConnexion.textContent();
    expect(titreTextConnexion).toBe('CONNEXION');

    await page.fill('#identifiant', 'SarahGentille');
    await page.fill('#motDePasse', '1234');

    await page.getByRole('button', {name:'Me Connecter'}).click();

    // Vérification page liste des patients
    const title = await page.waitForSelector('h2');
    const titleText = await title.textContent();
    expect(titleText).toBe('Ajouter un patient');

    const patients = await page.$$('app-item-frame');
    expect(patients.length).toBe(4);

    const ajouterPatientButton = await page.waitForSelector('.bouton-ajouter-patient');
    const isButtonVisible = await ajouterPatientButton.isVisible();
    expect(isButtonVisible).toBe(true);

    for (const patient of patients) {
      const patientData = await patient.getAttribute('item');
      expect(patientData).toBeDefined();

      const editerEnable = await patient.getAttribute('editerEnable');
      expect(editerEnable).toBe(null);
    }

    // Vérification de l'action "Ajouter un patient"
    await page.click('.bouton-ajouter-patient');
    const url = await page.url();
    expect(url).toContain(`${testUrl}/creer-patient`);

    const titre = await page.waitForSelector('#text-nouveau-profil');
    const titreText = await titre.textContent();
    expect(titreText).toBe('NOUVEAU PROFIL');

    await page.fill('#input-prenom', 'Lucy');
    await page.fill('#input-nom', 'Borg');
    await page.dispatchEvent('#radio2', 'click');
    await page.setInputFiles('#photo-button', ['src/assets/images/patient-femme.png']);

    const creerProfilButton = await page.waitForSelector('#creer-profil');
    await creerProfilButton.click();

    const profilPatientUrl = await page.url();
    expect(profilPatientUrl).toContain(`${testUrl}/liste-patient`);

    const patientsApresAjout = await page.getByRole('button', {name:'SELECTIONNER'}).all();
    expect(patientsApresAjout.length).toBe(5);

    const patientData = await patientsApresAjout[4].getAttribute('item');
    expect(patientData).toBeDefined();

     // Modification du profil patient

    await patientsApresAjout[4].click();

<<<<<<< HEAD
    const detailsPatientUrl = await page.url();
    expect(detailsPatientUrl).toContain(`${testUrl}/profil-patient`);

    const prenomText = await page.textContent('#input-prenom');
    expect(prenomText).toBe('Lucy');

    const nomText = await page.textContent('#input-nom');
    expect(nomText).toBe('Borg');

    const stadeText = await page.textContent('#info-stade');
    expect(stadeText).toBe('Stade 5');

     // Modification du profil patient

=======
>>>>>>> 69e427309bb4109d4f39d7aa6d7769838e3476c3
    await page.click('#modifier-le-profil');

    await page.fill('#input-prenom', 'John');
    await page.fill('#input-nom', 'Doe');
    await page.dispatchEvent('#radio3', 'click');
    await page.setInputFiles('#photo-button', ['src/assets/images/patient-homme.png']);

    await page.click('#creer-profil');

    const patientsApresModif = await page.getByRole('button', {name:'SELECTIONNER'}).all();
    await patientsApresModif[4].click();

    const prenomTextApresModif = await page.textContent('#input-prenom');
    expect(prenomTextApresModif).toBe('John');

    const nomTextApresModif = await page.textContent('#input-nom');
    expect(nomTextApresModif).toBe('Doe');

    const stadeTextApresModif = await page.textContent('#info-stade');
    expect(stadeTextApresModif).toBe('Stade 5');


    // Suppression du profil patient

    await page.click('#modifier-le-profil');
    await page.click('#supprimer-profil');

    const patientsApresSuppression = await page.getByRole('button', {name:'SELECTIONNER'}).all();
    expect(patientsApresSuppression.length).toBe(4);

<<<<<<< HEAD
=======

    // Verification profil patient

    await patientsApresSuppression[0].click();

    const detailsPatientUrl = await page.url();
    expect(detailsPatientUrl).toContain(`${testUrl}/profil-patient`);

    const prenomText = await page.textContent('#input-prenom');
    expect(prenomText).toBe('Marie');

    const nomText = await page.textContent('#input-nom');
    expect(nomText).toBe('Perroti');

    const stadeText = await page.textContent('#info-stade');
    expect(stadeText).toBe('Stade 3');


    // Verification des statistiques

    const statistiquesButton = await page.waitForSelector('#stats');
    await statistiquesButton.click();

    const prenomStat = await page.textContent('.profil-prenom');
    const nomStat = await page.textContent('.profil-nom');
    expect(prenomStat).toBe('Marie');
    expect(nomStat).toBe('Perroti');

    const stadeStat = await page.textContent('.profil-stade');
    expect(stadeStat).toBe('Stade 3');

    const partiesJoueesStat = await page.textContent('.profil-parties');
    expect(partiesJoueesStat).not.toBe('');

    const statContainers = await page.$$('.containerStats app-statcontainer');
    expect(statContainers.length).toBe(4);

    for (const statcontainer of statContainers) {
        const isVisible = await statcontainer.isVisible();
        expect(isVisible).toBe(true);

        const statistiquesPlus = await statcontainer.$('.plus');
        await statistiquesPlus.click();

        const toggleButton = await statcontainer.$('.plus');
        const isVisiblePlus = await toggleButton.isVisible();
        expect(isVisiblePlus).toBe(true);

        const contentStat = await statcontainer.$('.content');
        const isActive = await contentStat.getAttribute('class');
        expect(isActive).toContain('active');

        const headersStat = await statcontainer.$$('#header p');
        expect(headersStat.length).toBe(4);

        for (const headerStat of headersStat) {
        const text = await headerStat.textContent();
        expect(text).not.toBe('');
        }

        const tableauStat = await statcontainer.$('.tableau');
        const idTab = await tableauStat.getAttribute('id');
        expect(idTab).not.toBe('');

        await statistiquesPlus.click();
    }
>>>>>>> 69e427309bb4109d4f39d7aa6d7769838e3476c3

  });

});

