import React, { useContext, useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import SearchBar from 'react-native-search-bar';
import { useQuery } from 'react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import JobsListRow from '../Jobs/JobsListRow/JobsListRow';

import { fetchInstrumentJobs } from '../../utils/fetchInstrumentJobs/fetchInstrumentJobs';
import { PreferencesContext } from '../../Model/Preferences';
import { getDateFromString } from '../../utils/getDateFromString/getDateFromString';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import { useTheme } from '../../utils/CustomHooks/useTheme/useTheme';

/**
 * @namespace PastJobs
 * @function PastJobs
 * @description A component that displays the jobs that are available from the
 * server, but are past their closing date, and won't be shown on the regular
 * Jobs page.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.3.0
 * @component
 * @example
 * <PastJobs />
 */
export default function PastJobs() {
  const internalHornJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/HornJobs.json';
  const internalTrumpetJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TrumpetJobs.json';
  const internalTromboneJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TromboneJobs.json';
  const internalTubaJobsLink =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/src/Model/Jobs/TubaJobs.json';

  const theme = useTheme();
  const colors = useColors();
  const styles = StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 10,
      flex: 1,
    },
    pastJobsContainer: {
      backgroundColor: colors.background,
      height: '100%',
    },
    segmentedControlContainer: {
      paddingHorizontal: 8,
      paddingTop: 10,
    },
    topContainer: {
      paddingHorizontal: 2,
    },
  });

  const { state, dispatch } = useContext(PreferencesContext);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const scrollViewRef = useRef(null);

  const possibleInstruments = ['Horn', 'Trumpet', 'Trombone', 'Tuba'];
  const searchPlaceholderText = [
    'Filter Past Horn Jobs',
    'Filter Past Trumpet Jobs',
    'Filter Past Trombone Jobs',
    'Filter Past Tuba Jobs',
  ];

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

  /**
   * @function PastJobs~isValidSearchResult
   * @param {Object} job A job object fetched from the server
   * @returns {boolean} whether the job should show or not (if searched)
   * @author Alexander Burdiss
   * @since 9/18/21
   * @version 1.0.0
   */
  function isValidSearchResult(job) {
    if (!currentSearchTerm) {
      return true;
    }

    if (
      job.auditionDate.toLowerCase().includes(currentSearchTerm) ||
      job.closingDate.toLowerCase().includes(currentSearchTerm) ||
      job.country.toLowerCase().includes(currentSearchTerm) ||
      job.orchestra.toLowerCase().includes(currentSearchTerm) ||
      job.position.toLowerCase().includes(currentSearchTerm)
    ) {
      return true;
    }
  }

  return (
    <View style={styles.pastJobsContainer}>
      <SafeAreaView edges={['left', 'right']} style={styles.topContainer}>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            accessibilityRole="menu"
            accessibilityValue={{ now: possibleInstruments[state.jobsIndex] }}
            values={possibleInstruments}
            selectedIndex={state.jobsIndex}
            appearance={
              theme == 'dark' || theme == 'dracula' ? 'dark' : 'light'
            }
            onChange={(event) => {
              scrollViewRef.current.scrollTo({ x: 0, y: 0 });
              dispatch({
                type: 'SET_SETTING',
                payload: { jobsIndex: event.nativeEvent.selectedSegmentIndex },
              });
            }}
          />
        </View>
        <SearchBar
          hideBackground
          searchBarStyle="minimal"
          placeholder={searchPlaceholderText[state.jobsIndex]}
          onChangeText={(text) => setCurrentSearchTerm(text.toLowerCase())}
          tintColor={colors.green}
          textColor={colors.text}
          barTintColor={colors.background2}
        />
      </SafeAreaView>
      <ScrollView style={styles.contentContainer} ref={scrollViewRef}>
        <View>
          {currentJobs?.map((job, index) => {
            const jobDate = new getDateFromString(job.closingDate);
            if (jobDate < new Date() && isValidSearchResult(job)) {
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
}
