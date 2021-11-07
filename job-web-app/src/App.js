import { useState, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';

import './App.css';
import JobInputForm from './JobInputForm';
import { capitalize } from '../../src/utils/captiatlize/capitalize';
import hornJobs from '../../src/Model/Jobs/HornJobs.json';

function App() {
  const [jobs, setJobs] = useState(hornJobs.Jobs);
  const [currentInstrument, setCurrentInstrument] = useState('horn');

  const downloadJobs = useCallback(
    function () {
      const downloadJson = { Jobs: jobs };
      const json = JSON.stringify(downloadJson);
      console.log(json);
      const blob = new Blob([json]);
      const fileDownloadUrl = URL.createObjectURL(blob);
      const downloadButton = document.querySelector('#downloadLink');
      downloadButton.href = fileDownloadUrl;
      downloadButton.click();
    },
    [jobs],
  );

  return (
    <div className="App">
      <Formik
        initialValues={{
          jobs: [],
          instrument: 'horn',
          newJob: {
            orchestra: '',
            position: '',
            link: '',
            country: '',
            closingDate: '',
            auditionDate: '',
            excerpts: [''],
          },
        }}
        onChange={(values) => {
          console.log(values);
          setJobs(values.jobs);
          setCurrentInstrument(values.instrument);
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <label htmlFor={'instrument'}>Instrument</label>
              <Field name={'instrument'} as="select">
                <option disabled value="null">
                  -- select an option --
                </option>
                <option value="horn">Horn</option>
                <option value="trumpet">Trumpet</option>
                <option value="trombone">Trombone</option>
                <option value="tuba">Tuba</option>
              </Field>
              <div>
                <button type="button" onClick={downloadJobs}>
                  Download {values.instrument} Jobs
                </button>
              </div>
              <JobInputForm setJobs={setJobs} />
              <h2>Existing Jobs</h2>
              {values.jobs?.map((job, index) => (
                <div className="JobContainer" key={index}>
                  <h3>{job.orchestra}</h3>
                  <div>{job.position}</div>
                  <a href={job.link}>{job.link}</a>
                  <div>{job.country}</div>
                  <div>Closing Date: {job.closingDate}</div>
                  <div>Audition Date: {job.auditionDate}</div>
                  <div>Excerpts:</div>
                  <div className="ExcerptContainer">
                    {job.excerpts?.map((excerpt, eIndex) => (
                      <div key={eIndex}>{excerpt}</div>
                    ))}
                    {job.excerpts?.length === 0 && <div>None</div>}
                  </div>
                </div>
              ))}
            </Form>
          );
        }}
      </Formik>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        style={{ display: 'none' }}
        download={`${capitalize(currentInstrument)}Jobs.json`}
        href={''}
        id="downloadLink"
      >
        download it
      </a>
    </div>
  );
}

export default App;
