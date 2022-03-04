import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  Linking,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import JobsListRow from './JobsListRow/JobsListRow';
// eslint-disable-next-line no-unused-vars
import ActionButton from '../../Components/ActionButton/ActionButton';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Loading from '../../Components/Loading/Loading';

import { PreferencesContext } from '../../Model/Preferences';
import { openMusicalChairsLink } from './utils/openMusicalChairsLink/openMusicalChairsLink';
import { fetchInstrumentJobs } from '../../utils/fetchInstrumentJobs/fetchInstrumentJobs';
import { hasValidJobs } from './utils/hasValidJobs/hasValidJobs';
import { useColors } from '../../utils/customHooks/useColors/useColors';
import { useTheme } from '../../utils/customHooks/useTheme/useTheme';
import { getValidJobs } from './utils/getValidJobs/getValidJobs';
import { getDarkOrLightTheme } from '../../utils/getDarkOrLightTheme/getDarkOrLightTheme';
import { getContrast } from '../../utils/getContrast/getContrast';

/**
 * @todo Make section that user can add their own lists of excerpts inside the
 * app.
 *
 * @namespace Jobs
 * @function Jobs
 * @description A component that lists recent jobs available for each
 * instrument. When each item is clicked, it will open the JobDetail component
 * and display more information about that Job to the user.
 * @author Alexander Burdiss
 * @since 3/5/21
 * @version 1.5.1
 * @component
 * @example
 * <Jobs />
 */
export default function Jobs() {
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
      flex: 1,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    disclaimer: {
      fontSize: 12,
      textAlign: 'center',
      paddingHorizontal: 10,
      color: colors.text,
      paddingTop: 5,
      paddingBottom: 20,
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
    linkText: {
      color: colors.green,
      textDecorationLine: 'underline',
      padding: 10,
    },
    mailLinkText: {
      color: colors.green,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
    noJobsContainer: {
      marginVertical: 10,
      padding: 40,
    },
    noJobsText: {
      textAlign: 'center',
      color: colors.text,
    },
    pleaseHelpText: {
      color: colors.text,
      textAlign: 'center',
      marginTop: 30,
    },
    jobsContainer: {
      height: '100%',
      backgroundColor: colors.background,
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
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const possibleInstruments = ['Horn', 'Trumpet', 'Trombone', 'Tuba'];
  const searchPlaceholderText = [
    'Filter Current Horn Jobs',
    'Filter Current Trumpet Jobs',
    'Filter Current Trombone Jobs',
    'Filter Current Tuba Jobs',
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
     * @function Jobs~useEffect~fetchCurrentJobs
     * @description Fetches the current Jobs from the Github server, and sets
     * the data to the current Job state variable.
     * @author Alexander Burdiss
     * @since 3/28/21
     * @version 1.0.1
     */
    function fetchCurrentJobs() {
      setCurrentJobs(
        [hornJobs, trumpetJobs, tromboneJobs, tubaJobs][state.jobsIndex],
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      hornJobs.data,
      trumpetJobs.data,
      state.jobsIndex,
      tromboneJobs.data,
      tubaJobs.data,
      hornJobs.isError,
      trumpetJobs.isError,
      tromboneJobs.isError,
      tubaJobs.isError,
    ],
  );

  let currentInstrument = ['horn', 'trumpet', 'trombone', 'tuba'][
    state.jobsIndex
  ];

  /**
   * @function Jobs~openCreateCustomAudition
   * @description Opens the Create Custom page, so that custom auditions
   * can be added to the list.
   * @author Alexander Burdiss
   * @since 3/28/21
   * @version 1.0.0
   */
  // eslint-disable-next-line no-unused-vars
  function openCreateCustomAudition() {
    navigation.navigate('Create Custom Audition');
  }

  /**
   * @function emailAuthor
   * @description Emails aburdiss@icloud.com with a pre-filled subject
   * expressing interest in helping with the jobs.
   * @author Alexander Burdiss
   * @since 3/1/22
   * @version 1.0.0
   */
  function emailAuthor() {
    Linking.openURL(
      'mailto:aburdiss@icloud.com?subject=I%20am%20interested%20in%20helping%20update%20jobs%20for%20BrassXcerpts!',
    ).catch((err) => console.warn("Couldn't load page", err));
  }

  return (
    <View style={styles.jobsContainer}>
      <SafeAreaView edges={['left', 'right']} style={styles.topContainer}>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            accessibilityRole="menu"
            accessibilityValue={{ now: possibleInstruments[state.jobsIndex] }}
            values={possibleInstruments}
            selectedIndex={state.jobsIndex}
            appearance={getDarkOrLightTheme(theme)}
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
          placeholder={searchPlaceholderText[state.jobsIndex]}
          onChangeText={(text) => setCurrentSearchTerm(text.toLowerCase())}
        />
      </SafeAreaView>
      <ScrollView style={styles.contentContainer} ref={scrollViewRef}>
        {hasValidJobs(currentJobs.data) && (
          <SafeAreaView edges={['left', 'right']}>
            {getValidJobs(currentJobs.data, currentSearchTerm)?.map(
              (job, index) => (
                <JobsListRow key={index} job={job} />
              ),
            )}
          </SafeAreaView>
        )}
        {currentJobs.isLoading && (
          // No data, but still loading
          <Loading />
        )}
        {currentJobs.isError && (
          // Error
          <SafeAreaView style={styles.errorContainer}>
            <Text
              style={styles.errorText}
              accessibilityRole="text"
              maxFontSizeMultiplier={2.0}
            >
              There was an error fetching {currentInstrument} jobs.{'\n'}If this
              persists, please contact us.
            </Text>
          </SafeAreaView>
        )}
        {!currentJobs.isLoading && !hasValidJobs(currentJobs.data) && (
          // No data, but not loading and no error
          <SafeAreaView style={styles.noJobsContainer}>
            <Text
              style={styles.noJobsText}
              accessibilityRole="text"
              maxFontSizeMultiplier={2.0}
            >
              There are no {currentInstrument} jobs at this time.{'\n'}Check
              back later!
            </Text>
            <Text style={styles.pleaseHelpText}>
              Want to help keep this up to date?
            </Text>
            <Pressable onPress={emailAuthor}>
              <Text style={styles.mailLinkText}>
                Contact aburdiss@icloud.com to learn more
              </Text>
            </Pressable>
          </SafeAreaView>
        )}
        <SafeAreaView edges={['left', 'right']}>
          {/* <ActionButton onPress={openCreateCustomAudition}>
        Create a custom audition list!
      </ActionButton> */}
          <Pressable
            accessibilityRole="link"
            accessibilityHint="Opens Musical Chairs in default web browser"
            onPress={() => openMusicalChairsLink(state)}
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <Text style={styles.linkText} maxFontSizeMultiplier={2.0}>
              View {currentInstrument} job openings on Musical Chairs
            </Text>
          </Pressable>
          <Text
            style={styles.disclaimer}
            accessibilityRole="text"
            maxFontSizeMultiplier={2.0}
          >
            Note: Although these jobs are regularly updated, there may be some
            mistakes. Please check the orchestra website for official dates.
          </Text>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
