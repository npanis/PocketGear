/* global device, element, by */
describe('Search Functionality', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  test('should display profile card after search by name', async () => {
    await element(by.id('search-input')).typeText('jigglypuff');
    await expect(element(by.id('pokemon-card-39'))).toBeVisible();
  });

  test('should display profile card after search by partial name', async () => {
    await element(by.id('search-input')).typeText('jig');
    await expect(element(by.id('pokemon-card-39'))).toBeVisible();
  });

  test('should display profile card after search by number', async () => {
    await element(by.id('search-input')).typeText('140');
    await expect(element(by.id('pokemon-card-140'))).toBeVisible();
  });

  test('should display profile card after search by type', async () => {
    await element(by.id('search-input')).typeText('fairy');
    await expect(element(by.id('pokemon-card-39'))).toBeVisible();
  });

  test('should display no results after unsearchable by name', async () => {
    await element(by.id('search-input')).typeText('mewthree');
    await element(by.id('search-input')).tapReturnKey();
    await expect(element(by.id('no-result'))).toBeVisible();
  });

  test('should display profile list after clear text', async () => {
    await element(by.id('search-input')).typeText('squirtle');
    await element(by.id('clear-search')).tap();
    await expect(element(by.id('pokemon-card-1'))).toBeVisible();
  });
});
