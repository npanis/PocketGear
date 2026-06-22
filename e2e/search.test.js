/* global device, element, by */
describe('Search Functionality', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('should display profile card after search by name', async () => {
    // Enter pokemon name
    await element(by.id('search-input')).typeText('jigglypuff');
    // See actual pokemon profile
    await expect(element(by.id('pokemon-card-39'))).toBeVisible();
  });

  test('should display profile card after search by partial name', async () => {
    // Enter pokemon name
    await element(by.id('search-input')).typeText('jig');
    // See actual pokemon profile
    await expect(element(by.id('pokemon-card-39'))).toBeVisible();
  });

  test('should display profile card after search by number', async () => {
    await element(by.id('search-input')).typeText('140');
    // See actual pokemon profile
    await expect(element(by.id('pokemon-card-140'))).toBeVisible();
  });

  test('should display profile card after search by type', async () => {
    await element(by.id('search-input')).typeText('fairy');
    // See actual pokemon profile
    await expect(element(by.id('pokemon-card-39'))).toBeVisible();
  });

  test('should display no results after unsearchable by name', async () => {
    await element(by.id('search-input')).typeText('mewthree');
    // Dismiss keyboard
    await element(by.id('search-input')).tapReturnKey();
    // See empty list
    await expect(element(by.id('no-result'))).toBeVisible();
  });

  test('should display profile list after clear text', async () => {
    await element(by.id('search-input')).typeText('squirtle');
    await element(by.id('clear-search')).tap();
    // See actual pokemon profile
    await expect(element(by.id('pokemon-card-1'))).toBeVisible();
  });
});
