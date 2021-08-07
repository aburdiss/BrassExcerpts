import React, { useContext, useState, useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useQuery } from 'react-query';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import JobsListRow from '../Jobs/JobsListRow/JobsListRow';

import { fetchInstrumentJobs } from '../../utils/fetchInstrumentJobs/fetchInstrumentJobs';
import { PreferencesContext } from '../../Model/Preferences';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../Model/Model';
import { getDateFromString } from '../../utils/getDateFromString/getDateFromString';

/**
 * @function PastJobs
 * @description A component that displays the jobs that are available from the
 * server, but are past their closing date, and won't be shown on the regular
 * Jobs page.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.1.0
 * @component
 * @example
 * <PastJobs />
 */
const PastJobs = () => {
  const internalHornJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/HornJobs.json';
  const internalTrumpetJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TrumpetJobs.json';
  const internalTromboneJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TromboneJobs.json';
  const internalTubaJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TubaJobs.json';

  const { state, dispatch } = useContext(PreferencesContext);
  const [currentJobs, setCurrentJobs] = useState([]);
  const scrollViewRef = useRef(null);
  const styles = useDynamicStyleSheet(dynamicStyles);

  const possibleInstruments = ['Horn', 'Trumpet', 'Trombone', 'Tuba'];

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
    /**
     * @function PastJobs~useEffect~fetchCurrentJobs
     * @description Fetches the current jobs from the Github server, and stores
     * the data in the state variable CurrentJobs
     * @author Alexander Burdiss
     * @since 5/8/21
     * @version 1.0.0
     */
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
      <SafeAreaView edges={['left', 'right']}>
        <SegmentedControl
          accessibilityRole="menu"
          accessibilityValue={{ now: possibleInstruments[state.jobsIndex] }}
          values={possibleInstruments}
          selectedIndex={state.jobsIndex}
          onChange={(event) => {
            scrollViewRef.current.scrollTo({ x: 0, y: 0 });
            dispatch({
              type: 'SET_SETTING',
              payload: { jobsIndex: event.nativeEvent.selectedSegmentIndex },
            });
          }}
        />
      </SafeAreaView>
      <ScrollView style={styles.contentContainer} ref={scrollViewRef}>
        <View>
          {currentJobs?.map((job, index) => {
            const jobDate = new getDateFromString(job.closingDate);
            if (jobDate < new Date()) {
              return (
                <SafeAreaView key={index} edges={['left', 'right']}>
                  <JobsListRow job={job} />
                </SafeAreaView>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  contentContainer: {
    marginTop: 10,
    height: '100%',
  },
  pastJobsContainer: {
    padding: 10,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default PastJobs;
