import React from 'react';
import { View, Pressable, Text, Linking, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @namespace LinkListItem
 * @function LinkListItem
 * @description A rendered Link list item with a chevron and theme colored text
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.0
 * @param {Object} props.item The list item containing a link and some text.
 * @param {Object} props.state The app state, containing all of the user's
 * preferences.
 *
 * @component
 * @example
 * <LinkListItem
 *   item={item}
 *   state={state}
 * />
 */
export default function LinkListItem({ item, state }) {
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
    linkText: {
      color: colors.green,
      paddingRight: 5,
    },
  });
  const isHidden = item.instrument && state.instrument != item.instrument;

  return isHidden ? null : (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={item.value}
      accessibilityRole="link"
      onPress={() => {
        Linking.openURL(item.link).catch((err) =>
          console.warn("Couldn't load page", err),
        );
      }}
    >
      <View style={styles.listRowContainer}>
        <Text maxFontSizeMultiplier={1.8} style={styles.linkText}>
          {item.value}
        </Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={25}
          color={styles.linkText.color}
        />
      </View>
    </Pressable>
  );
}
