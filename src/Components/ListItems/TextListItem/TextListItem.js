import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @function TextListItem
 * @component
 * @description A rendered Text list item. This will not translate
 * copyright information.
 * Created 1/3/21
 * @param {Object} props JSX props passed to this React component
 * @param {Object} props.item The text to be rendered in the list item.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
 * @example
 * <TextListItem item={item} />
 */
export default function TextListItem({ item }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    listRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.systemGray6,
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

  return (
    <View style={styles.listRowContainer}>
      <Text
        maxFontSizeMultiplier={1.8}
        style={styles.listRowText}
        accessibilityRole="text"
      >
        {item.value.includes('Alexander Burdiss') ? item.value : item.value}
      </Text>
    </View>
  );
}
