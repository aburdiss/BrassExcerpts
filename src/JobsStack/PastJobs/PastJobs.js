import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useNavigation} from '@react-navigation/core';
import {useQuery} from 'react-query';

import JobsListRow from '../Jobs/JobsListRow/JobsListRow';

import {fetchInstrumentJobs} from '../Jobs/JobsUtils';
import {PreferencesContext} from '../../Model/Preferences';

const PastJobs = () => {
  const internalHornJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/HornJobs.json';
  const internalTrumpetJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TrumpetJobs.json';
  const internalTromboneJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TromboneJobs.json';
  const internalTubaJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TubaJobs.json';

  const {state, dispatch} = useContext(PreferencesContext);
  const [currentJobs, setCurrentJobs] = useState([]);
  const navigation = useNavigation();

  const queryPreferences = {
    staleTime: 1000 * 60 * 60, // One Hour
  };
  const hornJobs = useQuery(
    'hornJobs',
    () => fetchInstrumentJobs(internalHornJobsLink),
    queryPreferences,
  );
  const trumpetJobs = useQuery(
    'trumpetJobs',
    () => fetchInstrumentJobs(internalTrumpetJobsLink),
    queryPreferences,
  );
  const tromboneJobs = useQuery(
    'tromboneJobs',
    () => fetchInstrumentJobs(internalTromboneJobsLink),
    queryPreferences,
  );
  const tubaJobs = useQuery(
    'tubaJobs',
    () => fetchInstrumentJobs(internalTubaJobsLink),
    queryPreferences,
  );

  useEffect(
    function fetchCurrentJobs() {
      setCurrentJobs(
        [hornJobs.data, trumpetJobs.data, tromboneJobs.data, tubaJobs.data][
          state.jobsIndex
        ],
      );
    },
    [
      hornJobs.data,
      trumpetJobs.data,
      state.jobsIndex,
      tromboneJobs.data,
      tubaJobs.data,
    ],
  );

  return (
    <View style={styles.pastJobsContainer}>
      <SegmentedControl
        values={['Horn', 'Trumpet', 'Trombone', 'Tuba']}
        selectedIndex={state.jobsIndex}
        onChange={(event) => {
          dispatch({
            type: 'SET_SETTING',
            payload: {jobsIndex: event.nativeEvent.selectedSegmentIndex},
          });
        }}
      />
      <ScrollView style={styles.contentContainer}>
        <View>
          {currentJobs?.map((job, index) => {
            const jobDate = new Date(job.closingDate);
            if (jobDate < new Date()) {
              return <JobsListRow key={index} job={job} />;
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 10,
    height: '100%',
  },
  pastJobsContainer: {
    padding: 10,
  },
});

export default PastJobs;
