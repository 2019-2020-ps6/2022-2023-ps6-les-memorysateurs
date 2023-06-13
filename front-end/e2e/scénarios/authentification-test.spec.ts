import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Connection à un compte ergothérapeute', () => {
  test('Connexion au compte', async ({page}) => {
    await page.goto(`${testUrl}/authentification`);
    const appComponentFixture = new AppFixture(page);

    // Vérification du titre "CONNEXION"
    const titre = await page.waitForSelector('#connexion');
    const titreText = await titre.textContent();
    expect(titreText).toBe('CONNEXION');

    // Remplissage des informations du patient
    await page.fill('#identifiant', 'SarahGentille');
    await page.fill('#motDePasse', '1234');

    await page.getByRole('button', {name:'Me Connecter'}).click();

  })
})
