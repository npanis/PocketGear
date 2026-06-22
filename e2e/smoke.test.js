/* global device, element, by */
describe('Test Sample', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('should have the search text box', async () => {
    await expect(element(by.id('search-input'))).toBeVisible();
  });
});
