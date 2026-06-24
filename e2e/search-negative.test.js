/* global device, element, by */

describe('Search — Negative & Edge Cases', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  const search = async (query) => {
    await element(by.id('search-input')).typeText(query);
    await element(by.id('search-input')).tapReturnKey();
  };

  test('should show no results with special characters', async () => {
    await search('@#$%');
    await expect(element(by.id('no-result'))).toBeVisible();
  });

  test('should show no results with  a non-existent number', async () => {
    await search('9999');
    await expect(element(by.id('no-result'))).toBeVisible();
  });

  test('should show no results with non existent string', async () => {
    await search('zzzzzzz');
    await expect(element(by.id('no-result'))).toBeVisible();
  });
});
