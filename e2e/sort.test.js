/* global device, element, by */
describe('Sort Functionality', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('search-input')).tap(); // focus search → reveals sort toggles
  });

  test('should display pokemon card list in numerical order', async () => {
    await element(by.id('sort-#')).tap();
    await expect(element(by.id('pokemon-card-1'))).toBeVisible();
  });

  test('should display pockemon card list in alphabetical order', async () => {
    await element(by.id('sort-Name')).tap();
    await expect(element(by.id('pokemon-card-63'))).toBeVisible();
  });

  test('should display pockemon card list from highest attack power', async () => {
    await element(by.id('sort-Attack')).tap();
    await expect(element(by.id('pokemon-card-150'))).toBeVisible();
  });

  test('should display pockemon card list from highest defense power', async () => {
    await element(by.id('sort-Defense')).tap();
    await expect(element(by.id('pokemon-card-213'))).toBeVisible();
  });

  test('should display pockemon card list from highest combat power', async () => {
    await element(by.id('sort-Max CP')).tap();
    await expect(element(by.id('pokemon-card-150'))).toBeVisible();
  });
});
