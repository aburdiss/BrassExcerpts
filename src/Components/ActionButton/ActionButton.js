// @ts-check
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace ActionButton
 * @function ActionButton
 * @description A styled button that is used for actions throughout the app.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.2.0
 * @param {object} props The JSX props passed to this React component
 * @param {function} props.onPress The function to call when this component is
 * pressed
 * @param {string} props.children The text to render on this button.
 */
export default function ActionButton({ onPress, children }) {
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
      // @ts-ignore
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
