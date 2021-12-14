import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Appearance } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @description A rendered Picker list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 9/11/21
 * @version 1.2.0
 * @param {Object} props.item The data to be rendered inside this list row.
 * @param {Object} props.state The current app state, including user
 * preferences.
 * @param {Function} props.dispatch A funciton to call to the reducer to update
 * app state.
 *
 * @component
 * @example
 * <PickerListItem
 *   item={item}
 *   state={state}
 *   dispatch={dispatch}
 * />
 */
export default function PickerListItem({ item, state, dispatch }) {
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
    linkText: {
      color: colors.green,
      paddingRight: 5,
    },
  });

  /**
   * State variable for updating the visual display of the Picker List Item.
   * The actual value is stored in Context.
   */
  const [currentTheme, setCurrentTheme] = useState(state.theme);
  useEffect(() => {
    setCurrentTheme(state.theme);
  }, [state.theme]);

  let values;
  switch (item.setting) {
    case 'theme':
      values = [
        {
          label: 'System Default Theme',
          value: 'default',
          color: colors.green,
        },
        {
          label: 'Default Light Theme',
          value: 'light',
          color: colors.green,
        },
        {
          label: 'Default Dark Theme',
          value: 'dark',
          color: colors.green,
        },
        {
          label: 'Dracula Theme',
          value: 'dracula',
          color: colors.green,
        },
        {
          label: 'Monokai Theme',
          value: 'monokai',
          color: colors.green,
        },
      ];
      break;
    default:
      throw new Error('Item setting does not match any values');
  }

  return (
    <View style={styles.listSegmentedRowContainer}>
      <RNPickerSelect
        onValueChange={(value) => {
          setCurrentTheme(value);
          let renderedTheme = value;
          if (value == 'default') {
            renderedTheme = Appearance.getColorScheme();
          }
          dispatch({
            type: 'SET_SETTING',
            payload: { theme: value, renderedTheme: renderedTheme },
          });
        }}
        value={currentTheme}
        items={values}
        placeholder={{}}
        style={{
          iconContainer: {
            top: 9,
          },
          inputIOS: {
            color: colors.text,
            height: '100%',
          },
          modalViewMiddle: {
            backgroundColor: colors.systemGray6,
          },
          modalViewBottom: {
            backgroundColor: colors.textInverse,
          },
        }}
        Icon={() => {
          return (
            <Ionicons
              name={'chevron-down-outline'}
              size={24}
              color={styles.linkText.color}
            />
          );
        }}
      />
    </View>
  );
}
