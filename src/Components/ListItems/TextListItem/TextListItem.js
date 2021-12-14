import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @description A rendered Text list item. This will not translate
 * copyright information.
 * @author Alexander Burdiss
 * @since 1/3/21
 * @version 1.2.0
 * @param {Object} props.item The text to be rendered in the list item.
 *
 * @component
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
