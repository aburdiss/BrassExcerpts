import { Themes } from '../../Enums/themes';
import { getDarkOrLightThemeInverse } from './getDarkOrLightThemeInverse';

describe('getDarkOrLightThemeInverse functions correctly', () => {
  test('light returns dark', () => {
    const output = getDarkOrLightThemeInverse(Themes.light);
    expect(output).toEqual('dark');
  });

  test('dark returns light', () => {
    const output = getDarkOrLightThemeInverse(Themes.dark);
    expect(output).toEqual('light');
  });

  test('dracula returns light', () => {
    const output = getDarkOrLightThemeInverse(Themes.dracula);
    expect(output).toEqual('light');
  });
});
