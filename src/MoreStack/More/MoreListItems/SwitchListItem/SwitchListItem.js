import React from 'react';
import { Pressable, Text, Switch } from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { colors } from '../../../../Model/Model';

/**
 * @description A rendered Switch list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 1/5/21
 * @version 1.0.2
 * @param {Object} props.item The data to be rendered in this component.
 * @param {Object} props.state The current state of the app, including user
 * preferences.
 * @param {Function} props.dispatch A function to make a reducer call to update
 * state.
 *
 * @component
 * @example
 * <SwitchListItem
 * item={item}
 * state={state}
 * dispatch={dispatch}
 * />
 */
export default function SwitchListItem({ item, state, dispatch }) {
  const styles = useDynamicValue(dynamicStyles);
  function updateValue() {
    let updatedState = !state[item.setting];
    let newSetting = { [item.setting]: updatedState };
    dispatch({ type: 'SET_SETTING', payload: newSetting });
  }
  return (
    <Pressable
      style={styles.listRowContainer}
      onPress={updateValue}
      accessible={true}
      accessibilityLabel={item.value}
      accessibilityState={{ checked: state && state[item.setting] }}
      accessibilityRole="switch"
      accessibilityHint={'Toggles setting' + ' ' + item.value}
    >
      <Text maxFontSizeMultiplier={1.8} style={styles.listRowText}>
        {item.value}
      </Text>
      <Switch
        value={state && state[item.setting]}
        onValueChange={updateValue}
      />
    </Pressable>
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
