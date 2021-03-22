import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

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
  const musicalChairsHornAPI = 'https://www.musicalchairs.info/rss/en/horn';
  const musicalChairsTrumpetAPI =
    'https://www.musicalchairs.info/rss/en/trumpet';
  const musicalChairsTromboneAPI =
    'https://www.musicalchairs.info/rss/en/trombone';
  const musicalChairsTubaAPI = 'https://www.musicalchairs.info/rss/en/tuba';

  const [selectedInstrumentIndex, setSelectedInstrumentIndex] = useState(0);

  async function fetchJobs() {
    const dataToFetch = [
      musicalChairsHornAPI,
      musicalChairsTrumpetAPI,
      musicalChairsTromboneAPI,
      musicalChairsTubaAPI,
    ][selectedInstrumentIndex];
    const response = await fetch(dataToFetch);
    console.log(await response.text());
  }

  return (
    <View>
      <View style={styles.segmentedControlWrapper}>
        <SegmentedControl
          values={['Horn', 'Trumpet', 'Trombone', 'Tuba']}
          selectedIndex={selectedInstrumentIndex}
          onChange={(event) => {
            setSelectedInstrumentIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  segmentedControlWrapper: {
    padding: 10,
  },
});

export default Jobs;
