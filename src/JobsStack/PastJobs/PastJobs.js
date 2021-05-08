import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {PreferencesContext} from '../../Model/Preferences';

const PastJobs = () => {
  const {state, dispatch} = useContext(PreferencesContext);
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default PastJobs;
