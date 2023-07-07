import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function SectionHeading
 * @component
 * @description A prestyled section header that can be used across the app
 * Created 5/22/21
 * @param {Object} props The JSX props passed to this React component
 * @param {*} props.children the text to render in this component
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
 * @example
 * <SectionHeading>Tuba</SectionHeading />
 */
export default function SectionHeading({ children }) {
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
