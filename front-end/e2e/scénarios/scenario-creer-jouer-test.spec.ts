import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import { AuthentificationFixture } from 'src/app/authentification/authentification.fixture';
import { ListePatientFixture } from 'src/app/liste-patient/liste-patient.fixture';
import { CreerPatientFixture } from 'src/app/creer-patient/creer-patient.fixture';
import { ProfilPatientFixture } from 'src/app/profil-patient/profil-patient.fixture';
import { StatistiquesFixture } from 'src/app/stat/stat.fixture';
import { CreerMemoryFixture } from 'src/app/creer-memory/creer-memory.fixture';
import { ListeThemeFixture } from 'src/app/liste-theme/liste-theme.fixture';
import { GameFixture } from 'src/app/game/game.fixture';

test.describe('Scénario global', () => {
  test('Scénario création de compte + jeu ', async ({page}) => {
    await page.goto(`${testUrl}/authentification`);

    //create all fixtures

    const appComponentFixture = new AppFixture(page);
    const authentificationFixture = new AuthentificationFixture(page);
    const listePatientFixture = new ListePatientFixture(page);
    const creerPatientFixture = new CreerPatientFixture(page);
    const profilPatientFixture = new ProfilPatientFixture(page);   
    const statistiquesFixture = new StatistiquesFixture(page); 
    const creerMemoryFixture = new CreerMemoryFixture(page);
    const listeThemeFixture = new ListeThemeFixture(page);
    const gameFixture = new GameFixture(page);

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

    // Verification profil patient

    await listePatientFixture.selectionnerPatient(1);

    expect(await page.url()).toContain(`${testUrl}/profil-patient`);

    expect(await profilPatientFixture.getPatientData('#input-prenom')).toEqual('Bertrand');
    expect(await profilPatientFixture.getPatientData('#input-nom')).toEqual('Stade4');
    expect(await profilPatientFixture.getPatientData('#info-stade')).toEqual('Stade 4');


    // Creation memory

    await profilPatientFixture.lancePartie();
    expect(await page.url()).toContain(`${testUrl}/creer-memory`);

    await creerMemoryFixture.choisirTheme();
    expect(await page.url()).toContain(`${testUrl}/liste-theme`);

    await listeThemeFixture.selectionnerTheme(1);
    expect(await page.url()).toContain(`${testUrl}/creer-memory`);

    await creerMemoryFixture.setNombreDeCartes(8);
    await creerMemoryFixture.setNombreIndices(6);
    await creerMemoryFixture.setNombreErreurs(1);
    await creerMemoryFixture.setNombreCombinaisons(2);

    await creerMemoryFixture.setTempsIndice(5);

    await creerMemoryFixture.lancePartie();

    // Verification jeu

    expect(await page.url()).toContain(`${testUrl}/game`);

    expect((await gameFixture.getCards()).length-2).toBe(8);//car ca prend les 2 cartes de l'avertissement

    const idcard = await gameFixture.getIdCards();
    expect(idcard.length).toBe(8);

    await gameFixture.indice();
    await page.waitForTimeout(5000);

    await gameFixture.retournerCarte('1');
    await gameFixture.retournerCarte('2');
    await page.waitForTimeout(5000);

    await expect((await gameFixture.getFlipped()).length-2).toBe(6);

    await gameFixture.indice();

    let cards = await gameFixture.getCards();
    await expect(cards.length-2).toBe(8);
    await gameFixture.retournerCarte('1');
    await gameFixture.retournerCarte('2');
    await page.waitForTimeout(5000);

    await gameFixture.avertissement();
    await gameFixture.indice();
    //await expect((await gameFixture.getCards()).length-2).toBe(nombreDeCartes);

    await gameFixture.retournerCarte('1');
    await gameFixture.retournerCarte('4');
    await page.waitForTimeout(5000);

    await expect((await gameFixture.getFlipped()).length-2).toBe(6);

    await gameFixture.indice();

    await gameFixture.retournerCarte('1');
    await gameFixture.retournerCarte('1',idcard.indexOf('1')+1);
    await page.waitForTimeout(5000);

    await gameFixture.indice();

    await expect((await gameFixture.getFlipped()).length-2).toBe(6-2);
    await page.waitForTimeout(5 *1000);

    await gameFixture.retournerCarte('2');
    await gameFixture.retournerCarte('2',idcard.indexOf('2')+1);
    await page.waitForTimeout(5000);

    await gameFixture.retournerCarte('3');
    await gameFixture.retournerCarte('3',idcard.indexOf('3')+1);
    await page.waitForTimeout(5000);

    await gameFixture.retournerCarte('4');
    await gameFixture.retournerCarte('4',idcard.indexOf('4')+1);
    await page.waitForTimeout(5000);

    expect(await page.url()).toContain(`${testUrl}/resultat-partie`);

    const imageTrouvees = await page.locator('#boite-images-trouvees img').all();
    expect(imageTrouvees.length).toBe(4);


    const boutonStat = await page.getByRole('button', {name:'Statistiques'}).all();
    await boutonStat[0].click();
    expect(page.url()).toBe('http://localhost:4200/stat');

    const statsTableau = await page.locator(' app-statcontainer').all();
    for(let i =0;i<statsTableau.length;i++) {
      const tab = await statsTableau[i].locator('.tableau').all();
      expect(tab.length).toBe(1);
    }
      //déconnexion

      const menuItems = await page.locator('.burger-menu').all();
      await menuItems[0].click();

      const deco =await page.locator('#deconection');
      await page.on('dialog', async (dialog) => {
        await dialog.accept(); // Accepter la fenêtre contextuelle (appuyer sur OK)
      });
      await deco.click();

      expect(page.url()).toBe('http://localhost:4200/authentification');


  })
})

