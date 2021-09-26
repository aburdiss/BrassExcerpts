import { getDarkOrLightThemeInverse } from './getDarkOrLightThemeInverse';

describe('getDarkOrLightThemeInverse functions correctly', () => {
  test('light returns dark', () => {
    const output = getDarkOrLightThemeInverse('light');
    expect(output).toEqual('dark');
  });

  test('dark returns light', () => {
    const output = getDarkOrLightThemeInverse('dark');
    expect(output).toEqual('light');
  });

  test('dracula returns light', () => {
    const output = getDarkOrLightThemeInverse('dracula');
    expect(output).toEqual('light');
  });
});
