import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function MainHeading
 * @component
 * @description A Main Heading component with a Top border and small horizontal
 * padding.
 * Created 9/17/21
 * @param {Object} props JSX props passed to this React Component
 * @param {*} props.children The text or React component to render inside
 * this heading
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.1
 */
export default function MainHeading({ children }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    heading: {
      fontSize: 28,
      paddingTop: 10,
      color: colors.text,
    },
    linksContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
      borderTopColor: colors.green,
      borderTopWidth: 2,
    },
  });

  return (
    <View style={styles.linksContainer}>
      <SafeAreaView edges={['right', 'left']}>
        <Text
          accessibilityRole="header"
          style={styles.heading}
          maxFontSizeMultiplier={1.8}
        >
          {children}
        </Text>
      </SafeAreaView>
    </View>
  );
}
