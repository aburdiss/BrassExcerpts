import HornJobs from '../../Model/Jobs/HornJobs.json';
import TrumpetJobs from '../../Model/Jobs/TrumpetJobs.json';
import TromboneJobs from '../../Model/Jobs/TromboneJobs.json';
import TubaJobs from '../../Model/Jobs/TubaJobs.json';
import { getCountryFlagEmoji } from './getCountryFlagEmoji';

describe('All Job countries are covered by getCountryFlagEmoji', () => {
  for (const job of HornJobs.Jobs) {
    test('Horn ' + job.orchestra + ' ' + job.closingDate, () => {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    });
  }

  for (const job of TrumpetJobs.Jobs) {
    test('Trumpet ' + job.orchestra + ' ' + job.closingDate, () => {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    });
  }

  for (const job of TromboneJobs.Jobs) {
    test('Trombone ' + job.orchestra + ' ' + job.closingDate, () => {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    });
  }

  for (const job of TubaJobs.Jobs) {
    test('Tuba ' + job.orchestra + ' ' + job.closingDate, () => {
      const emoji = getCountryFlagEmoji(job.country);
      expect(emoji).not.toEqual('');
    });
  }
});
