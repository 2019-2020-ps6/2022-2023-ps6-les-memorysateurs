import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';



test.describe('Jouer une partie', () => {
  test('Test de jouer une partie', async ({ page }) => {
    await page.goto(`${testUrl}/creer-memory`);
    const appComponentFixture = new AppFixture(page);
    //récupérer tous les sliders container
    let sliders = await page.locator('.nombre-slider').all();

    // mettre 8 cartes
    //clique sur le bouton nombre de cartes = 8
    await sliders[2].click();
    const nombreDeCartes = 8;
    //on redéfinie la liste des boutons car en changeant le nb de cartes cela change le nb de cartes disponibles à l'indice
    sliders = await page.locator('.nombre-slider').all();

    //mettre 6 cartes retournées par indces
    //clique sur le bouton nombre de paires retournées par indices = 3
    await sliders[5].click();
    const nombreIndices = 6; // 3 pairs = 6 cartes

    //indices s'active à chaque fois
    //clique sur le bouton nombre d'erreurs avant indice = 1
    await sliders[7].click();
    const ErreurConsecutivesAvantIndice = 1;


    //mettre 2 pour l'avertissement des combinaisons
    //clique sur le bouton nombre de combinaisons fausses avant avertissement = 2
    await sliders[11].click();
    const CombinaisonConsecutivesAvantAvertissement = 2;

    //temps d'indices de base
    const tempsIndice = 5;

    //choisir thème ( a faire plus tard)

    //cliquer sur lancer Partie
    await page.click('.btn-lauch');

    //tester avec le jeu

    //vérifier le nombre de cartes
    // et création du tableau avec les paires de cartes.
    let flipped = await page.locator('.flipped').all();
    console.log(flipped);

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
    await page.waitForTimeout(4000);
    //tester le nombre de cartes retournés par indices
    flipped= await page.locator('.flipped').all();
    await expect(flipped.length-2).toBe(nombreIndices);

    await indice.click();
    await expect(cards.length-2).toBe(nombreDeCartes);
    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('3')].click();
    await page.waitForTimeout(4000);
    //tester l'avertissement'

    await indice.click();
    await expect(cards.length-2).toBe(nombreDeCartes);

    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('4')].click();
    await page.waitForTimeout(4000);
    //tester que l'indice a diminué
    flipped= await page.locator('.flipped').all();
    await expect(flipped.length-2).toBe(nombreIndices-2);

    await indice.click();
    await expect(cards.length-2).toBe(nombreDeCartes);



    await cards[idcard.indexOf('1')].click();
    await cards[idcard.indexOf('1',idcard.indexOf('1')+1)].click();
    await page.waitForTimeout(5000);

    await indice.click();
    await page.waitForTimeout(tempsIndice *1000);

    await cards[idcard.indexOf('2')].click();
    await cards[idcard.indexOf('2',idcard.indexOf('1')+1)].click();
    await page.waitForTimeout(5000);
    await cards[idcard.indexOf('3')].click();
    await cards[idcard.indexOf('3',idcard.indexOf('1')+1)].click();
    await page.waitForTimeout(5000);
    await cards[idcard.indexOf('4')].click();
    await cards[idcard.indexOf('4',idcard.indexOf('1')+1)].click();
    await page.waitForTimeout(5000);
  });

});
