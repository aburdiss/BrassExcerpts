import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function ActionButton
 * @component
 * @description A styled button that is used for actions throughout the app.
 * Created 3/28/23
 * @param {Object} props The JSX props passed to this React component
 * @param {Function} props.onPress The function to call when this component is
 * pressed
 * @param {string} props.children The text to render on this button.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
 */
export default function ActionButton({
  onPress = Function,
  children = String,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.green,
      borderRadius: 15,
      marginVertical: 10,
    },
    text: {
      textAlign: 'center',
      padding: 15,
      color: colors.alwaysBlack,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.button,
      })}
      android_ripple={{
        color: styles.button.backgroundColor,
      }}
      accessibilityRole="button"
    >
      <Text style={styles.text} maxFontSizeMultiplier={1.8}>
        {children}
      </Text>
    </Pressable>
  );
}
