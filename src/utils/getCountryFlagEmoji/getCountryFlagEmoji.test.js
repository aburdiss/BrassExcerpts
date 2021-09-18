import HornJobs from '../../Model/Jobs/HornJobs.json';
import TrumpetJobs from '../../Model/Jobs/TrumpetJobs.json';
import TromboneJobs from '../../Model/Jobs/TromboneJobs.json';
import TubaJobs from '../../Model/Jobs/TubaJobs.json';
import { getCountryFlagEmoji } from './getCountryFlagEmoji';

describe('All Job countries are covered by getCountryFlagEmoji', () => {
  test('Horn', () => {
    for (const job of HornJobs.Jobs) {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    }
  });

  test('Trumpet', () => {
    for (const job of TrumpetJobs.Jobs) {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    }
  });

  test('Trombone', () => {
    for (const job of TromboneJobs.Jobs) {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    }
  });

  test('Tuba', () => {
    for (const job of TubaJobs.Jobs) {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    }
  });
});
