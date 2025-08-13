import React, { useContext, useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import JobsListRow from '../Jobs/JobsListRow/JobsListRow';
import SearchBar from '../../Components/SearchBar/SearchBar';

import { fetchInstrumentJobs } from '../../utils/fetchInstrumentJobs/fetchInstrumentJobs';
import { PreferencesContext } from '../../Model/Preferences';
import { getDateFromString } from '../../utils/getDateFromString/getDateFromString';
import { useColors } from '../../utils/customHooks/useColors/useColors';
import { useTheme } from '../../utils/customHooks/useTheme/useTheme';
import { getDarkOrLightTheme } from '../../utils/getDarkOrLightTheme/getDarkOrLightTheme';
import { getContrast } from '../../utils/getContrast/getContrast';
import { Instrument } from '../../Enums/instrument';
import { Jobs } from '../../Types/jobs';
import { PreferencesActions } from '../../Enums/preferencesActions';

/**
 * @namespace PastJobs
 */

/**
 * @function PastJobs
 * @memberof PastJobs
 * @component
 * @description A component that displays the jobs that are available from the
 * server, but are past their closing date, and won't be shown on the regular
 * Jobs page.
 * Created 3/28/21
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.4.0
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
    errorContainer: {
      marginVertical: 10,
      marginHorizontal: 5,
      padding: 40,
      backgroundColor: colors.red,
      borderRadius: 8,
    },
    errorText: {
      textAlign: 'center',
      color: getContrast(colors.red, colors),
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

  const queryPreferences = {
    staleTime: 1000 * 60 * 60, // One Hour
  };
  const hornJobs = useQuery({
    queryKey: ['hornJobs'],
    queryFn: () => fetchInstrumentJobs(internalHornJobsLink),
    ...queryPreferences,
  });
  const trumpetJobs = useQuery({
    queryKey: ['trumpetJobs'],
    queryFn: () => fetchInstrumentJobs(internalTrumpetJobsLink),
    ...queryPreferences,
  });
  const tromboneJobs = useQuery({
    queryKey: ['tromboneJobs'],
    queryFn: () => fetchInstrumentJobs(internalTromboneJobsLink),
    ...queryPreferences,
  });
  const tubaJobs = useQuery({
    queryKey: ['tubaJobs'],
    queryFn: () => fetchInstrumentJobs(internalTubaJobsLink),
    ...queryPreferences,
  });

  useEffect(
    /**
     * @function fetchCurrentJobs
     * @memberof PastJobs
     * @description Fetches the current jobs from the Github server, and stores
     * the data in the state variable CurrentJobs
     * @author Alexander Burdiss
     * @since 5/8/21
     * @version 1.0.0
     */
    function fetchCurrentJobs() {
      setCurrentJobs(
        {
          [Instrument.Horn]: hornJobs,
          [Instrument.Trumpet]: trumpetJobs,
          [Instrument.Trombone]: tromboneJobs,
          [Instrument.Tuba]: tubaJobs,
        }[state.jobsInstrument],
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      hornJobs.data,
      trumpetJobs.data,
      state.jobsInstrument,
      tromboneJobs.data,
      tubaJobs.data,
      hornJobs.isError,
      trumpetJobs.isError,
      tromboneJobs.isError,
      tubaJobs.isError,
    ],
  );

  /**
   * @function isValidSearchResult
   * @memberof PastJobs
   * @param {Object} job A job object fetched from the server
   * @returns {boolean} whether the job should show or not (if searched)
   * @author Alexander Burdiss
   * @since 9/18/21
   * @version 1.0.0
   */
  function isValidSearchResult(job: Jobs) {
    if (!currentSearchTerm) {
      return true;
    }

    if (
      job.auditionDate?.toLowerCase().includes(currentSearchTerm) ||
      job.closingDate?.toLowerCase().includes(currentSearchTerm) ||
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
            accessibilityValue={{
              now: Object.values(Instrument).findIndex(
                (inst) => inst === state.jobsInstrument,
              ),
            }}
            values={Object.values(Instrument)}
            selectedIndex={Object.values(Instrument).findIndex(
              (inst) => inst === state.jobsInstrument,
            )}
            appearance={getDarkOrLightTheme(theme)}
            onValueChange={(newVal) => {
              scrollViewRef.current.scrollTo({ x: 0, y: 0 });
              dispatch({
                type: PreferencesActions.SET_SETTING,
                payload: { jobsInstrument: newVal },
              });
            }}
          />
        </View>
        <SearchBar
          placeholder={`Filter Past ${state.jobsInstrument} Jobs`}
          onChangeText={(text: string) =>
            setCurrentSearchTerm(text.toLowerCase())
          }
        />
      </SafeAreaView>
      <ScrollView style={styles.contentContainer} ref={scrollViewRef}>
        <View>
          {currentJobs.isError && (
            // Error
            <SafeAreaView style={styles.errorContainer}>
              <Text
                style={styles.errorText}
                accessibilityRole="text"
                maxFontSizeMultiplier={2.0}
              >
                There was an error fetching {state.jobsInstrument} jobs.{'\n'}If
                this persists, please contact us.
              </Text>
            </SafeAreaView>
          )}
          {currentJobs.data?.map((job, index) => {
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
