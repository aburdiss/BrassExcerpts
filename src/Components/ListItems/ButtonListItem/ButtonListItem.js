import React from 'react';
import { View, Pressable, Text, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';

/**
 * @description A rendered Button list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.2
 * @param {Object} props.item The data to be rendered in this list item
 * @param {Function} props.dispatch A function to call a reducer and update
 * app state.
 *
 * @component
 * @example
 * <ButtonListItem
 * item={item}
 * dispatch={dispatch}
 * />
 */
export default function ButtonListItem({ item, dispatch }) {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable
      onPress={() => {
        if (item.value === 'Reset Favorites') {
          Alert.alert(
            'All favorites will be removed',
            'This cannot be undone!',
            [
              {
                text: 'Return',
                style: 'cancel',
              },
              {
                text: 'Reset',
                style: 'destructive',
                onPress: () => {
                  dispatch({ type: 'RESET_FAVORITES' });
                },
              },
            ],
          );
        } else if (item.value === 'Restore Defaults') {
          Alert.alert(
            'All settings will be restored to defaults',
            'This cannot be undone!',
            [
              {
                text: 'Return',
                style: 'cancel',
              },
              {
                text: 'Reset',
                style: 'destructive',
                onPress: () => {
                  dispatch({ type: 'RESET_PREFERENCES' });
                },
              },
            ],
          );
        }
      }}
      accessible={true}
      accessibilityLabel={item.value}
      android_ripple={{
        color: styles.linkText.color,
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={styles.listButtonRowContainer}>
        <Text maxFontSizeMultiplier={1.8} style={styles.linkText}>
          {item.value}
        </Text>
        <Ionicons name={item.icon} size={22} color={styles.linkText.color} />
      </View>
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
