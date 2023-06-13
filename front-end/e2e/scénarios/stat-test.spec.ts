import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';

test.describe('Création nouveau patient', () => {
    test('Test de création du profil du patient', async ({ page }) => {
        await page.goto(`${testUrl}/liste-patient`);
        const appComponentFixture = new AppFixture(page);

        // Verification des statistiques
        const patientsApresSuppression = await page.getByRole('button', {name:'SELECTIONNER'}).all();
        await patientsApresSuppression[0].click();

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

        // Vérifier l'affichage des statistiques du temps de jeu
        
        


    });
}); 