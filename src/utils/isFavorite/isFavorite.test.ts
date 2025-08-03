import { Preferences } from '../../Types/preferences';
import { isFavorite } from './isFavorite';

describe('returns correct value', () => {
  test('horn beethoven 5', () => {
    let mockState = {
      horn: true,
      favorites: ['hornBeethovenSymphony No. 5'],
    } as Preferences;
    let favorite = isFavorite(mockState, 'Beethoven', 'Symphony No. 5');
    expect(favorite).toBeTruthy();
  });

  test('no instruments selected, beethoven 5', () => {
    let mockState = {
      horn: false,
      trumpet: false,
      trombone: false,
      tuba: false,
      favorites: ['hornBeethovenSymphony No. 5'],
    } as Preferences;
    let favorite = isFavorite(mockState, 'Beethoven', 'Symphony No. 5');
    expect(favorite).toBeFalsy();
  });

  test('trumpet selected, horn favorite, beethoven 5', () => {
    let mockState = {
      horn: false,
      trumpet: true,
      favorites: ['hornBeethovenSymphony No. 5'],
    } as Preferences;
    let favorite = isFavorite(mockState, 'Beethoven', 'Symphony No. 5');
    expect(favorite).toBeFalsy();
  });

  test('trombone beethoven 5', () => {
    let mockState = {
      trombone: true,
      favorites: [
        'tromboneBeethovenSymphony No. 5',
        'hornBeethovenSymphony No. 5',
      ],
    } as Preferences;
    let favorite = isFavorite(mockState, 'Beethoven', 'Symphony No. 5');
    expect(favorite).toBeTruthy();
  });

  test('tuba berlioz symphonie', () => {
    let mockState = {
      horn: false,
      trumpet: false,
      trombone: false,
      tuba: true,
      favorites: [
        'tromboneBeethovenSymphony No. 5',
        'hornBeethovenSymphony No. 5',
        'tubaBerliozSymphonie fantastique',
      ],
    } as Preferences;
    let favorite = isFavorite(mockState, 'Berlioz', 'Symphonie fantastique');
    expect(favorite).toBeTruthy();
  });
});
