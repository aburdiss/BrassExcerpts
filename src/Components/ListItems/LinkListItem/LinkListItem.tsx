import React from 'react';
import { View, Pressable, Text, Linking, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @function LinkListItem
 * @component
 * @description A rendered Link list item with a chevron and theme colored text
 * Created 11/15/2020
 * @param {Object} props The JSX props passed to this React component
 * @param {Object} props.item The list item containing a link and some text.
 * @param {Object} props.state The app state, containing all of the user's
 * preferences.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.0
 * @example
 * <LinkListItem
 *   item={item}
 *   state={state}
 * />
 */
export default function LinkListItem({
  item,
  state,
}: {
  item: Object;
  state: Object;
}) {
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
