/* global device, element, by */
describe('PocketGear - Smoke Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('displays the search bar on launch', async () => {
    await expect(element(by.id('search-input'))).toBeVisible();
  });

  test('displays the Pokémon list on launch', async () => {
    await expect(element(by.id('pokemon-list'))).toBeVisible();
  });
});
