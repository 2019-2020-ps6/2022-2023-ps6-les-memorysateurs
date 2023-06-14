import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Scénario global', () => {
  test('Scénario création de compte + jeu ', async ({page}) => {
    await page.goto(`${testUrl}/authentification`);
    const appComponentFixture = new AppFixture(page);


    // Remplissage des informations du patient
    await page.fill('#identifiant', 'SarahGentille');
    await page.fill('#motDePasse', '1234');

    await page.getByRole('button', {name:'Me Connecter'}).click();
    expect(page.url()).toBe('http://localhost:4200/liste-patient');

    const patientsApresAjout = await page.getByRole('button', {name:'SELECTIONNER'}).all();

    // Verification profil patient

    await patientsApresAjout[1].click();

    const detailsPatientUrl = await page.url();
    expect(detailsPatientUrl).toContain(`${testUrl}/profil-patient`);

    const prenomText = await page.textContent('#input-prenom');
    expect(prenomText).toBe('Bertrand');

    const nomText = await page.textContent('#input-nom');
    expect(nomText).toBe('Stade4');

    const stadeText = await page.textContent('#info-stade');
    expect(stadeText).toBe('Stade 4');

    await page.click('#lancer-partie');
    expect(page.url()).toBe('http://localhost:4200/creer-memory');

    const choisirTheme = await page.getByRole('button', {name:'CHOISIR UN THEME'}).all();
    await choisirTheme[0].click();

    expect(page.url()).toBe('http://localhost:4200/liste-theme');

    const selectionnertheme = await page.getByRole('button', {name:'SELECTIONNER'}).all();
    await selectionnertheme[1].click();
    expect(page.url()).toBe('http://localhost:4200/creer-memory');


    //récupérer tous les sliders container
    let boutons = await page.locator('.nombre-slider').all();

    // mettre 8 cartes
    //clique sur le bouton nombre de cartes = 8
    await boutons[2].click();
    const nombreDeCartes = 8;
    //on redéfinie la liste des boutons car en changeant le nb de cartes cela change le nb de cartes disponibles à l'indice
    boutons = await page.locator('.nombre-slider').all();

    //mettre 6 cartes retournées par indces
    //clique sur le bouton nombre de paires retournées par indices = 3
    await boutons[5].click();
    const nombreIndices = 6; // 3 pairs = 6 cartes

    //indices s'active à chaque fois
    //clique sur le bouton nombre d'erreurs avant indice = 1
    await boutons[7].click();
    const ErreurConsecutivesAvantIndice = 1;


    //mettre 2 pour l'avertissement des combinaisons
    //clique sur le bouton nombre de combinaisons fausses avant avertissement = 2
    await boutons[11].click();
    const CombinaisonConsecutivesAvantAvertissement = 2;

    //temps d'indices de base

    const sliderTemps = await page.locator('.slider').all();
     await sliderTemps[0].scrollIntoViewIfNeeded();
    const boundingBox = await sliderTemps[0].boundingBox();
    // @ts-ignore
    const x = boundingBox.x ; // Décalage de 10 pixels à gauche de l'élément
    // @ts-ignore
    const y = boundingBox.y + boundingBox.height / 2; // Position verticale centrale de l'élément
    await page.mouse.click(x, y, { button: 'left' });
    const tempsIndice = 5;



    //cliquer sur lancer Partie
    await page.click('.btn-lauch');

    //tester avec le jeu

    //vérifier le nombre de cartes
    // et création du tableau avec les paires de cartes.
    let flipped = await page.locator('.flipped').all();


    const indice = await page.waitForSelector('#boutonIndice');
    const idcard = [];
    let cards = await page.locator('.card').all();
    expect(cards.length-2).toBe(nombreDeCartes);//car ca prend les 2 cartes de l'avertissement
    for(let i=0;i<cards.length;i++ ) {
      let num = await cards[i].getAttribute('id');
      if(num !='0')
        idcard.push(num);

    }
    expect(idcard.length).toBe(nombreDeCartes);
    await indice.click();
    //test erreur
    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('2')].click();
    await page.waitForTimeout(5000);
    //tester le nombre de cartes retournés par indices
    flipped= await page.locator('.flipped').all();
    //Je regarde qu'il y a bien 6 cartes de retournées
    await expect(flipped.length-2).toBe(nombreIndices);

    await indice.click();
    //Je regarde qu'il y a bien encore 8 cartes de clickbles
    await expect(cards.length-2).toBe(nombreDeCartes);
    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('2')].click();
    await page.waitForTimeout(5000);
    //tester l'avertissement
    const avertissement = await page.waitForSelector('#combSection ');
    await avertissement.click();
    await indice.click();
    //await expect(cards.length-2).toBe(nombreDeCartes);

    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('4')].click();
    await page.waitForTimeout(5000);

    flipped= await page.locator('.flipped').all();
    await expect(flipped.length-2).toBe(nombreIndices);

    await indice.click();



    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('1',idcard.indexOf('1')+1)].click();
    await page.waitForTimeout(5000);

    await indice.click();
    //tester que l'indice a diminué
    flipped= await page.locator('.flipped').all();
    await expect(flipped.length-2).toBe(nombreIndices-2);
    await page.waitForTimeout(tempsIndice *1000);

    await cards[idcard.indexOf('2')].click();
    await cards[idcard.indexOf('2',idcard.indexOf('2')+1)].click();
    await page.waitForTimeout(5000);
    await cards[idcard.indexOf('3')].click();
    await cards[idcard.indexOf('3',idcard.indexOf('3')+1)].click();
    await page.waitForTimeout(5000);
    await cards[idcard.indexOf('4')].click();
    await cards[idcard.indexOf('4',idcard.indexOf('4')+1)].click();
    await page.waitForTimeout(5000);
    expect(page.url()).toBe('http://localhost:4200/resultat-partie');

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
