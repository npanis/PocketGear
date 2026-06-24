/* global device, element, by, waitFor */
describe('Scroll functionality', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('should display the last profile card in the list', async () => {
    await expect(element(by.id('pokemon-card-1'))).toBeVisible();
    await waitFor(element(by.id('pokemon-card-251')))
      .toBeVisible()
      .whileElement(by.id('pokemon-list'))
      .scroll(500, 'down');
  });

  test('should scroll down　and open the profile card', async () => {
    await expect(element(by.id('pokemon-card-1'))).toBeVisible();
    await waitFor(element(by.id('pokemon-card-200')))
      .toBeVisible()
      .whileElement(by.id('pokemon-list'))
      .scroll(500, 'down');
    await element(by.id('pokemon-card-200')).tap();
    await expect(element(by.id('pokemon-details'))).toBeVisible();
  });
});
