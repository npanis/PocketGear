/* global device, element, by */
describe('Open Profile Card', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    await element(by.id('pokemon-card-1')).tap();
  });

  test('should display profile screen with details', async () => {
    await expect(element(by.id('pokemon-details'))).toBeVisible();
    await expect(element(by.text('Height'))).toBeVisible();
    await expect(element(by.text('Weight'))).toBeVisible();
  });

  test('should display profile screen with matches', async () => {
    await expect(element(by.id('pokemon-details'))).toBeVisible();
    await element(by.id('tab-matches')).tap();
    await expect(element(by.id('pokemon-matches'))).toBeVisible();
    await expect(element(by.id('pokemon-card-116'))).toBeVisible();
    await expect(element(by.id('pokemon-card-58'))).toBeVisible();
  });

  test('should display profile screen with more strong matches when click more', async () => {
    await expect(element(by.id('pokemon-details'))).toBeVisible();
    await element(by.id('tab-matches')).tap();
    await expect(element(by.id('pokemon-matches'))).toBeVisible();
    await element(by.id('more-strong')).tap();
    await expect(element(by.id('pokemon-card-129'))).toBeVisible();
  });

  test('should display profile screen with more weak matches when click more', async () => {
    await expect(element(by.id('pokemon-details'))).toBeVisible();
    await element(by.id('tab-matches')).tap();
    await expect(element(by.id('pokemon-matches'))).toBeVisible();
    await element(by.id('more-weak')).tap();
    await expect(element(by.id('pokemon-card-249'))).toBeVisible();
  });
});
