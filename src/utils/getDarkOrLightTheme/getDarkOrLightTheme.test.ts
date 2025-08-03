import { getDarkOrLightTheme } from './getDarkOrLightTheme';

describe('getDarkOrLightTheme has correct output', () => {
  test('returns dark for dark', () => {
    const output = getDarkOrLightTheme('dark');
    expect(output).toEqual('dark');
  });

  test('returns light for light', () => {
    const output = getDarkOrLightTheme('light');
    expect(output).toEqual('light');
  });

  test('returns dark for dracula', () => {
    const output = getDarkOrLightTheme('dracula');
    expect(output).toEqual('dark');
  });
});
