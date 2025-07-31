import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @function InternalListItem
 * @component
 * @description A rendered link list item that opens a page inside the app on
 * the current stack. This is rendered the same as a LinkListItem, and performs
 * a similar function.
 * Created 12/17/2020
 * @param {Object} props The JSX props passed to this React component
 * @param {Object} props.item The Internal list item to be rendered containing
 * a Component name to render to, and the text to be rendered.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.2
 * @example
 * <InternalListItem item={item} />
 */
export default function InternalListItem({ item }: { item: Object }) {
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
