import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace SectionHeader
 * @function SectionHeader
 * @description A prestyled section header that can be used across the app
 * @author Alexander Burdiss
 * @since 5/22/21
 * @version 1.2.0
 * @param props The JSX props passed to this React component
 * @param {String} props.children the text to render in this component
 * @component
 * @example
 * <SectionHeader>Tuba</SectionHeader />
 */
export default function SectionHeader({ children }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      fontStyle: 'italic',
      paddingTop: 5,
      paddingLeft: 20,
      paddingBottom: 5,
      color: colors.text,
    },
  });
  return (
    <View accessibilityRole="header">
      <Text style={styles.text} maxFontSizeMultiplier={1.8}>
        {children}
      </Text>
    </View>
  );
}
