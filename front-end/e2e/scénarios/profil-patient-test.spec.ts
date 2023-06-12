import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Page de création de patient', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/page-creation-patient`);
    const appComponentFixture = new AppFixture(page);

    // Vérification de l'existence des éléments sur la page de création de patient
    const container = await page.waitForSelector('#container-creer-patient');
    const nomInput = await page.waitForSelector('#input-nom');
    const prenomInput = await page.waitForSelector('#input-prenom');
    const stadeMaladie = await page.waitForSelector('#info-stade');
    const modifierProfilButton = await page.waitForSelector('#modifier-le-profil');
    const statsButton = await page.waitForSelector('#stats');
    const lancerPartieButton = await page.waitForSelector('#lancer-partie');
    const boutonRetour = await page.waitForSelector('.bouton-retour');

    // Vérification de la visibilité des éléments
    const isContainerVisible = await container.isVisible();
    const isNomInputVisible = await nomInput.isVisible();
    const isPrenomInputVisible = await prenomInput.isVisible();
    const isStadeMaladieVisible = await stadeMaladie.isVisible();
    const isModifierProfilButtonVisible = await modifierProfilButton.isVisible();
    const isStatsButtonVisible = await statsButton.isVisible();
    const isLancerPartieButtonVisible = await lancerPartieButton.isVisible();
    const isBoutonRetourVisible = await boutonRetour.isVisible();

    expect(isContainerVisible).toBe(true);
    expect(isNomInputVisible).toBe(true);
    expect(isPrenomInputVisible).toBe(true);
    expect(isStadeMaladieVisible).toBe(true);
    expect(isModifierProfilButtonVisible).toBe(true);
    expect(isStatsButtonVisible).toBe(true);
    expect(isLancerPartieButtonVisible).toBe(true);
    expect(isBoutonRetourVisible).toBe(true);
  });
});
