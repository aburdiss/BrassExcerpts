import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function SearchBar
 * @component
 * @description A custom search bar with styles applied.
 * Created 12/7/21
 * @param {Object} props The JSX props passed to this React component
 * @param {Function} props.onChangeText A function to call when the text is
 * changed by the user
 * @param {string} props.placeholder The placeholder text to show in the
 * search bar
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.0
 */
export default function SearchBar({ onChangeText, placeholder }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    input: {
      height: 40,
      marginVertical: 5,
      marginHorizontal: 10,
      paddingVertical: 10,
      paddingLeft: 40,
      paddingRight: 10,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background2,
      borderRadius: 8,
    },
    icon: {
      position: 'absolute',
      left: 17,
      top: 12,
      zIndex: 2,
    },
  });

  return (
    <View>
      <Ionicons
        style={styles.icon}
        name="search"
        color={colors.green}
        size={24}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.systemGray}
      />
    </View>
  );
}
