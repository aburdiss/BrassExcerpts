import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Appearance } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @function PickerListItemAndroid
 * @component
 * @description A rendered Picker list item that updates saved preferences.
 * Created 9/11/21
 * @param {Object} props The JSX props passed to this React component
 * @param {Object} props.item The data to be rendered inside this list row.
 * @param {Object} props.state The current app state, including user
 * preferences.
 * @param {Function} props.dispatch A funciton to call to the reducer to update
 * app state.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
 * @example
 * <PickerListItem
 *   item={item}
 *   state={state}
 *   dispatch={dispatch}
 * />
 */
export default function PickerListItemAndroid({
  item,
  state,
  dispatch,
}: {
  item: Object;
  state: Object;
  dispatch: Function;
}) {
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
        {
          label: 'Solarized Light Theme',
          value: 'solarizedLight',
          color: colors.green,
        },
        {
          label: 'Solarized Dark Theme',
          value: 'solarizedDark',
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
            top: 5,
          },
          inputAndroid: {
            color: colors.green,
            marginLeft: -16,
          },
          modalViewMiddle: {
            backgroundColor: colors.systemGray6,
          },
          modalViewBottom: {
            backgroundColor: colors.systemGray6,
          },
        }}
      />
    </View>
  );
}
