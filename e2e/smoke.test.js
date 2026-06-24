/* global device, element, by */
describe('PocketGear - Smoke Tests', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  test('displays the search bar on launch', async () => {
    await expect(element(by.id('search-input'))).toBeVisible();
  });

  test('displays the Pokémon list on launch', async () => {
    await expect(element(by.id('pokemon-list'))).toBeVisible();
  });
});
