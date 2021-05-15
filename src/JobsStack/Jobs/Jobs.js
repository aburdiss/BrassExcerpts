import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable, Text} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useNavigation} from '@react-navigation/core';
import {useQuery} from 'react-query';

import JobsListRow from './JobsListRow/JobsListRow';
// eslint-disable-next-line no-unused-vars
import ActionButton from '../../Components/ActionButton/ActionButton';
import {
  hasValidJobs,
  fetchInstrumentJobs,
  openMusicalChairsLink,
} from './JobsUtils';
import {PreferencesContext} from '../../Model/Preferences';
import {colors} from '../../Model/Model';

/**
 * @todo get top excerpts for each instrument (top 10 or 20)
 * @todo Make section that has top excerpts
 * @todo Make section that user can add their own lists of excerpts inside the
 * app.
 * @todo Make the "Top Excerpt" button right below the picker, and have it only
 * take you to the top excerpts for that insturment, depending on the picker.
 *
 * @function Jobs
 * @description A component that lists recent jobs available for each
 * instrument. When each item is clicked, it will open the JobDetail component
 * and display more information about that Job to the user.
 * @author Alexander Burdiss
 * @since 3/5/21
 * @version 1.0.0
 */
const Jobs = () => {
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
    /**
     * @function Jobs~useEffect~fetchCurrentJobs
     * @description Fetches the current Jobs from the Github server, and sets
     * the data to the current Job state variable.
     * @author Alexander Burdiss
     * @since 3/28/21
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

  let currentInstrument = ['horn', 'trumpet', 'trombone', 'tuba'][
    state.jobsIndex
  ];

  /**
   * @function Jobs~openTopExcerptsComponent
   * @description Opens the top excerpts component
   * @author Alexander Burdiss
   * @since 3/28/21
   * @version 1.0.0
   */
  // eslint-disable-next-line no-unused-vars
  function openTopExcerptComponent() {
    navigation.navigate('Top Excerpts');
  }

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

  return (
    <View style={styles.jobsContainer}>
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
      {/* <ActionButton onPress={openTopExcerptComponent}>
        View top {currentInstrument} excerpts
      </ActionButton> */}
      <ScrollView style={styles.contentContainer}>
        {hasValidJobs(currentJobs) ? (
          <View>
            {currentJobs?.map((job, index) => {
              const jobDate = new Date(job.closingDate);
              if (jobDate > new Date()) {
                return <JobsListRow key={index} job={job} />;
              }
            })}
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              There are no {currentInstrument} jobs at this time.{'\n'}Check
              back later!
            </Text>
          </View>
        )}
      </ScrollView>
      {/* <ActionButton onPress={openCreateCustomAudition}>
        Create a custom audition list!
      </ActionButton> */}
      <Pressable
        onPress={() => openMusicalChairsLink(state)}
        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
        <Text style={styles.linkText}>
          View {currentInstrument} job openings on Musical Chairs
        </Text>
      </Pressable>
      <Text style={styles.disclaimer}>
        Note: Although these jobs are regularly updated, there may be some
        mistakes. Please check the orchestra website for official dates.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  errorContainer: {
    marginVertical: 10,
    padding: 40,
  },
  errorText: {
    textAlign: 'center',
  },
  linkText: {
    color: colors.greenLight,
    textDecorationLine: 'underline',
    padding: 10,
  },
  jobsContainer: {
    height: '100%',
    padding: 10,
  },
});

export default Jobs;
