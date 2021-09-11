import React from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace SegmentedFilterListItem
 * @function SegmentedFilterListItem
 * @description A rendered Segmented filter list item that updates saved
 * preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.1.0
 * @param {Object} props.item The data to render in this list item
 * @param {Object} props.state The current user app state
 * @param {Function} props.dispatch A function to call to the reducer to
 * update the user state of the app.
 *
 * @component
 * @example
 * <SegmentedFilterListItem
 *   item={item}
 *   state={state}
 *   dispatch={dispatch}
 * />
 */
export default function SegmentedFilterListItem({ item, state, dispatch }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    listSegmentedRowContainer: {
      backgroundColor: colors.background2,
      justifyContent: 'center',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.systemGray5,
      height: 45,
    },
  });

  let choices;
  switch (item.setting) {
    case 'randomFavorites':
      choices = ['Favorites Only', 'All Excerpts'];
      break;
    default:
      throw new Error('Item Setting does not match any choices.');
  }

  return (
    <View style={styles.listSegmentedRowContainer}>
      <SegmentedControl
        values={choices}
        selectedIndex={state[item.setting]}
        onChange={(event) => {
          let index = event.nativeEvent.selectedSegmentIndex;
          let setting = { [item.setting]: index };
          dispatch({ type: 'SET_SETTING', payload: setting });
        }}
      />
    </View>
  );
}
