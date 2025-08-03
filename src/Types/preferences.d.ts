import { Themes } from '../Enums/themes';

export type Preferences = {
  horn: boolean;
  trumpet: boolean;
  trombone: boolean;
  tuba: boolean;
  favorites: string[];
  jobsInstrument: Instrument;
  randomFavorites: number;
  randomHorn: boolean;
  randomTrumpet: boolean;
  randomTrombone: boolean;
  randomTuba: boolean;
  alwaysCollapse: boolean;
  keepScreenOn: boolean;
  theme: Themes;
  renderedTheme: Themes;
};
