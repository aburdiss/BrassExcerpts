import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @namespace InternalListItem
 * @function InternalListItem
 * @description A rendered link list item that opens a page inside the app on
 * the current stack. This is rendered the same as a LinkListItem, and performs
 * a similar function.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.2
 * @param {Object} props.item The Internal list item to be rendered containing
 * a Component name to render to, and the text to be rendered.
 *
 * @component
 * @example
 * <InternalListItem item={item} />
 */
export default function InternalListItem({ item }) {
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
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={item.value}
      accessibilityRole="link"
      android_ripple={{
        color: styles.linkText.color,
      }}
      onPress={() => {
        navigation.navigate(item.component);
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
