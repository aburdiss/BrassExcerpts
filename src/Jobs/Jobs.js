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
import {colors} from '../Model/Model';
import {PreferencesContext} from '../Model/Preferences';
import {useNavigation} from '@react-navigation/core';

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

  const {state, dispatch} = useContext(PreferencesContext);
  const navigation = useNavigation();

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
          <Pressable
            onPress={openTopExcerptComponent}
            style={({pressed}) => ({
              opacity: pressed ? 0.7 : 1,
              ...styles.topExcerptButton,
            })}>
            <Text style={styles.topExcerptButtonText}>
              View top {currentInstrument} excerpts
            </Text>
          </Pressable>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              There are no {currentInstrument} jobs at this time.{'\n'}Check
              back later!
            </Text>
          </View>
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
  topExcerptButton: {
    backgroundColor: colors.greenLight,
    borderRadius: 8,
    marginVertical: 10,
    borderBottomColor: colors.blueLight,
    borderBottomWidth: 1,
    borderRightColor: colors.blueLight,
    borderRightWidth: 1,
  },
  topExcerptButtonText: {
    textAlign: 'center',
    padding: 15,
  },
});

export default Jobs;
