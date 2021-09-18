import HornJobs from '../../Model/Jobs/HornJobs.json';
import TrumpetJobs from '../../Model/Jobs/TrumpetJobs.json';
import TromboneJobs from '../../Model/Jobs/TromboneJobs.json';
import TubaJobs from '../../Model/Jobs/TubaJobs.json';

export function getTopExcerpts(instrument) {
  let jobs = {
    Horn: HornJobs.Jobs,
    Trumpet: TrumpetJobs.Jobs,
    Trombone: TromboneJobs.Jobs,
    Tuba: TubaJobs.Jobs,
  }[instrument];

  let excerptsUsed = {};

  for (const job of jobs) {
    if (job.excerpts?.length > 0) {
      for (let excerpt of job.excerpts) {
        if (excerptsUsed[excerpt] == undefined) {
          excerptsUsed[excerpt] = 1;
        } else {
          excerptsUsed[excerpt]++;
        }
      }
    }
  }

  let excerptsArray = [];

  for (const excerpt in excerptsUsed) {
    excerptsArray.push({ name: excerpt, count: excerptsUsed[excerpt] });
  }

  excerptsArray.sort((a, b) => b.count - a.count);
  return excerptsArray.slice(0, 10);
}
