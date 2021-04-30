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

import JobsListRow from './JobsListRow';
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

  useEffect(
    function fetchCurrentJobs() {
      fetch(
        [
          internalHornJobsLink,
          internalTrumpetJobsLink,
          internalTromboneJobsLink,
          internalTubaJobsLink,
        ][state.jobsIndex],
      )
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (data.Jobs) {
            setCurrentJobs(data.Jobs);
          } else {
            setCurrentJobs([]);
          }
        });
    },
    [state.jobsIndex],
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
    <View>
      <View style={styles.container}>
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
          {currentJobs.length !== 0 ? (
            <View>
              {currentJobs.map((job, index) => {
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
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
  },
});

export default Jobs;
