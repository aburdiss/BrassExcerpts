import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace MainHeading
 * @function MainHeading
 * @description A Main Heading component with a Top border and small horizontal
 * padding.
 * @author Alexander Burdiss
 * @since 9/17/21
 * @version 1.0.0
 */
export default function MainHeading({ children }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    youtubeHeading: {
      fontSize: 28,
      paddingTop: 10,
      color: colors.text,
    },
    youtubeLinksContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
      borderTopColor: colors.green,
      borderTopWidth: 2,
    },
  });

  return (
    <View style={styles.youtubeLinksContainer}>
      <SafeAreaView edges={['right', 'left']}>
        <Text
          accessibilityRole="header"
          style={styles.youtubeHeading}
          maxFontSizeMultiplier={1.8}
        >
          {children}
        </Text>
      </SafeAreaView>
    </View>
  );
}
