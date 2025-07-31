import React from 'react';
import { StyleSheet, View } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { useColors } from '../../../utils/customHooks/useColors/useColors';
import { useTheme } from '../../../utils/customHooks/useTheme/useTheme';
import { getDarkOrLightTheme } from '../../../utils/getDarkOrLightTheme/getDarkOrLightTheme';

/**
 * @function SegmentedFilterListItem
 * @component
 * @description A rendered Segmented filter list item that updates saved
 * preferences.
 * Created 12/17/20
 * @param {Object} props The JSX props passed to this React component
 * @param {Object} props.item The data to render in this list item
 * @param {Object} props.state The current user app state
 * @param {Function} props.dispatch A function to call to the reducer to
 * update the user state of the app.
 * @returns {JSX.Element} JSX Render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.1
 * @example
 * <SegmentedFilterListItem
 *   item={item}
 *   state={state}
 *   dispatch={dispatch}
 * />
 */
export default function SegmentedFilterListItem({
  item,
  state,
  dispatch,
}: {
  item: Object;
  state: Object;
  dispatch: Function;
}) {
  const theme = useTheme();
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
        appearance={getDarkOrLightTheme(theme)}
        onChange={(event) => {
          let index = event.nativeEvent.selectedSegmentIndex;
          let setting = { [item.setting]: index };
          dispatch({ type: 'SET_SETTING', payload: setting });
        }}
      />
    </View>
  );
}
