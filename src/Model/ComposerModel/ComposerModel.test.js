import { composers } from './ComposerModel';

describe('IMSLP points to category link', () => {
  for (let composer of composers) {
    test(composer.slug, () => {
      const linkIncludesCategory = composer.imslp.includes('/wiki/Category:');
      expect(linkIncludesCategory).toBeTruthy();
    });
  }
});
