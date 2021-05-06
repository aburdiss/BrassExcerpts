import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Linking,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useNavigation} from '@react-navigation/core';
import {useQuery} from 'react-query';

import JobsListRow from './JobsListRow/JobsListRow';
import ActionButton from '../../Components/ActionButton/ActionButton';
import {PreferencesContext} from '../../Model/Preferences';
import {colors} from '../../Model/Model';

/**
 * @todo Install React Query to deal with the API calls!
 *
 * @todo get top excerpts for each instrument (top 10 or 20)
 * @todo Make section that has top excerpts
 * @todo Make section that user can add their own lists of excerpts inside the app.
 *
 * @todo Make the "Top Excerpt" button right below the picker, and have it only
 * take you to the top excerpts for that insturment, depending on the picker.
 *
 * @todo Make the picker only start on instruments that are selected in the
 * preferences (the starting value of useState())
 */
const Jobs = () => {
  const musicalChairsHornLink = 'https://www.musicalchairs.info/horn/jobs';
  const musicalChairsTrumpetLink =
    'https://www.musicalchairs.info/trumpet/jobs';
  const musicalChairsTromboneLink =
    'https://www.musicalchairs.info/trombone/jobs';
  const musicalChairsTubaLink = 'https://www.musicalchairs.info/tuba/jobs';

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

  async function fetchHornJobs() {
    let response = await fetch(internalHornJobsLink);
    let data = await response.json();
    if (data.Jobs) {
      return data.Jobs;
    } else {
      return [];
    }
  }

  async function fetchTrumpetJobs() {
    let response = await fetch(internalTrumpetJobsLink);
    let data = await response.json();
    if (data.Jobs) {
      return data.Jobs;
    } else {
      return [];
    }
  }

  async function fetchTromboneJobs() {
    let response = await fetch(internalTromboneJobsLink);
    let data = await response.json();
    if (data.Jobs) {
      return data.Jobs;
    } else {
      return [];
    }
  }

  async function fetchTubaJobs() {
    let response = await fetch(internalTubaJobsLink);
    let data = await response.json();
    if (data.Jobs) {
      return data.Jobs;
    } else {
      return [];
    }
  }

  const queryPreferences = {
    staleTime: 1000 * 60 * 60, // One Hour
  };

  const hornJobs = useQuery('hornJobs', fetchHornJobs, queryPreferences);
  const trumpetJobs = useQuery(
    'trumpetJobs',
    fetchTrumpetJobs,
    queryPreferences,
  );
  const tromboneJobs = useQuery(
    'tromboneJobs',
    fetchTromboneJobs,
    queryPreferences,
  );
  const tubaJobs = useQuery('tubaJobs', fetchTubaJobs, queryPreferences);

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

  let currentInstrument = ['horn', 'trumpet', 'trombone', 'tuba'][
    state.jobsIndex
  ];

  function openMusicalChairsLink() {
    let urlToOpen = [
      musicalChairsHornLink,
      musicalChairsTrumpetLink,
      musicalChairsTromboneLink,
      musicalChairsTubaLink,
    ][state.jobsIndex];

    Linking.openURL(urlToOpen).catch((err) =>
      console.warn("Couldn't load page", err),
    );
  }

  function openTopExcerptComponent() {
    navigation.navigate('Top Excerpts');
  }

  function openCreateCustomAudition() {
    navigation.navigate('Create Custom Audition');
  }

  return (
    <ScrollView style={styles.scrollView}>
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
      <ActionButton onPress={openTopExcerptComponent}>
        View top {currentInstrument} excerpts
      </ActionButton>
      {currentJobs?.length !== 0 ? (
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
            There are no {currentInstrument} jobs at this time.{'\n'}Check back
            later!
          </Text>
        </View>
      )}
      <ActionButton onPress={openCreateCustomAudition}>
        Create a custom audition list!
      </ActionButton>
      <Pressable
        onPress={openMusicalChairsLink}
        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
        <Text style={styles.linkText}>
          View {currentInstrument} job openings on Musical Chairs
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    // backgroundColor: colors.systemGray,
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
  scrollView: {
    height: '100%',
    padding: 10,
  },
});

export default Jobs;
