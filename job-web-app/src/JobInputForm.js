import { Field, FieldArray, useFormikContext } from 'formik';
import { useEffect } from 'react';

import hornJobs from '../../src/Model/Jobs/HornJobs.json';
import trumpetJobs from '../../src/Model/Jobs/TrumpetJobs.json';
import tromboneJobs from '../../src/Model/Jobs/TromboneJobs.json';
import tubaJobs from '../../src/Model/Jobs/TubaJobs.json';

export default function JobInputForm({ setJobs }) {
  const {
    values: { jobs, instrument, newJob },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    let jobs =
      {
        horn: hornJobs.Jobs,
        trumpet: trumpetJobs.Jobs,
        trombone: tromboneJobs.Jobs,
        tuba: tubaJobs.Jobs,
      }[instrument] ?? [];
    setFieldValue('jobs', jobs);
  }, [instrument, setFieldValue]);

  function addJobToAllJobs() {
    const allJobs = [...jobs];
    allJobs.push(newJob);
    const sortedJobs = allJobs.sort(function (a, b) {
      return (
        new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()
      );
    });
    console.log(sortedJobs);
    setFieldValue('jobs', sortedJobs);
    setJobs(sortedJobs);
  }

  return (
    <div>
      <h2>Add a new {instrument} Job</h2>
      <div>
        <label htmlFor={`newJob.orchestra`}>Orchestra</label>
        <Field name="newJob.orchestra"></Field>
      </div>
      <div>
        <label htmlFor={`newJob.position`}>Position</label>
        <Field name="newJob.position"></Field>
      </div>
      <div>
        <label htmlFor={`newJob.link`}>Link</label>
        <Field name="newJob.link"></Field>
      </div>
      <div>
        <label htmlFor={`newJob.country`}>Country</label>
        <Field name="newJob.country"></Field>
      </div>
      <div>
        <label htmlFor={`newJob.closingDate`}>Closing Date</label>
        <Field name="newJob.closingDate"></Field>
      </div>
      <div>
        <label htmlFor={`newJob.auditionDate`}>Audition Date</label>
        <Field name="newJob.auditionDate"></Field>
      </div>
      <FieldArray name="newJob.excerpts">
        {(helpers) => (
          <div>
            <div>Excerpts:</div>
            {newJob.excerpts?.map((excerpt, index) => (
              <div key={index}>
                <Field name={`newJob.excerpts.${index}`} placeholder=""></Field>
                <button onClick={() => helpers.remove(index)} type="button">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => helpers.push('')}>
              Add Excerpt
            </button>
          </div>
        )}
      </FieldArray>
      <button type="button" onClick={addJobToAllJobs}>
        Add Job
      </button>
    </div>
  );
}
