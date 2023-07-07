import React from 'react';
import { Pressable, Text, Switch, StyleSheet, Platform } from 'react-native';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @function SwitchListItem
 * @description A rendered Switch list item that updates saved preferences.
 * Created 1/5/21
 * @param {Object} props JSX props passed to this React component
 * @param {Object} props.item The data to be rendered in this component.
 * @param {Object} props.state The current state of the app, including user
 * preferences.
 * @param {Function} props.dispatch A function to make a reducer call to update
 * state.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.1
 * @example
 * <SwitchListItem
 * item={item}
 * state={state}
 * dispatch={dispatch}
 * />
 */
export default function SwitchListItem({ item, state, dispatch }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    listRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background2,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.systemGray5,
    },
    listRowText: {
      color: colors.text,
      paddingVertical: 5,
    },
  });

  function updateValue() {
    let updatedState = !state[item.setting];
    let newSetting = { [item.setting]: updatedState };
    dispatch({ type: 'SET_SETTING', payload: newSetting });
  }

  const thumbColor =
    Platform.OS == 'android'
      ? // Android
        state?.[item.setting]
        ? colors.green
        : colors.systemGray2
      : // iOS
        colors.white;
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
        value={state?.[item.setting]}
        onValueChange={updateValue}
        trackColor={{ false: colors.systemGray5, true: colors.green }}
        thumbColor={thumbColor}
      />
    </Pressable>
  );
}
