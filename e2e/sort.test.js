/* global device, element, by */
describe('Sort Functionality', () => {
  // Regex matches every list card (pokemon-card-<id>), so atIndex(0) is the
  // top-most item. This asserts true ordering, not just that a card is visible.
  const firstCard = () => element(by.id(/^pokemon-card-\d+$/)).atIndex(0);

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    await element(by.id('search-input')).tap();
  });

  test('should order the list numerically with #1 on top', async () => {
    await element(by.id('sort-#')).tap();
    await expect(firstCard()).toHaveId('pokemon-card-1');
  });

  test('should order the list alphabetically with Abra (#63) on top', async () => {
    await element(by.id('sort-Name')).tap();
    await expect(firstCard()).toHaveId('pokemon-card-63');
  });

  test('should order by highest attack with Mewtwo (#150) on top', async () => {
    await element(by.id('sort-Attack')).tap();
    await expect(firstCard()).toHaveId('pokemon-card-150');
  });

  test('should order by highest defense with Shuckle (#213) on top', async () => {
    await element(by.id('sort-Defense')).tap();
    await expect(firstCard()).toHaveId('pokemon-card-213');
  });

  test('should order by highest max CP with Mewtwo (#150) on top', async () => {
    await element(by.id('sort-Max CP')).tap();
    await expect(firstCard()).toHaveId('pokemon-card-150');
  });
});
