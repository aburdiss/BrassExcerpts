import React from 'react';
import { View } from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import { colors } from '../../../Model/Model';

/**
 * @description A rendered Segmented filter list item that updates saved
 * preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
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
  let choices;
  switch (item.setting) {
    case 'randomFavorites':
      choices = ['Favorites Only', 'All Excerpts'];
      break;
    default:
      throw new Error('Item Setting does not match any choices.');
  }

  const styles = useDynamicValue(dynamicStyles);

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

const dynamicStyles = new DynamicStyleSheet({
  listItemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: new DynamicValue(
      colors.systemGray3Light,
      colors.systemGray3Dark,
    ),
  },
  listSegmentedRowContainer: {
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    height: 45,
  },
  listButtonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    height: 45,
  },
  listPickerContainer: {
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    height: 45,
    alignItems: 'center',
  },
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
    paddingVertical: 5,
  },
  linkText: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
    paddingRight: 5,
  },
});
