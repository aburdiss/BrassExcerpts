import React from 'react';
import { View, Pressable, Text, Alert, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @namespace ButtonListItem
 * @function ButtonlistItem
 * @description A rendered Button list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.1.0
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
  const colors = useColors();
  const styles = StyleSheet.create({
    listButtonRowContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.background2,
      paddingVertical: 8,
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
