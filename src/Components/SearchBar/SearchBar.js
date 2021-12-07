import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @function SearchBar
 * @description A custom search bar with styles applied.
 * @param {object} props The JSX props passed to this React component
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
    container: {},
    icon: {
      position: 'absolute',
      left: 17,
      top: 12,
      zIndex: 2,
    },
  });

  return (
    <View style={styles.container}>
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
