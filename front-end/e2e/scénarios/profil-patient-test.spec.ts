import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Page de création de patient', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(`${testUrl}/profil-patient`);
    const appComponentFixture = new AppFixture(page);

    // Vérification de la visibilité des éléments
    expect(await (await page.waitForSelector('#container-creer-patient')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('#input-nom')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('#input-prenom')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('#info-stade')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('#modifier-le-profil')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('#stats')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('#lancer-partie')).isVisible()).toBe(true);
    expect(await (await page.waitForSelector('.bouton-retour')).isVisible()).toBe(true);
  });
});
