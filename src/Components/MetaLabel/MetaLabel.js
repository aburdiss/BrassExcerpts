import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function MetaLabel
 * @component
 * @description Renders a bold label with a colon, and the meta data
 * Created 3/6/21
 * @param {Object} props The JSX props passed to this React component
 * @param {string} props.label The meta label for this data
 * @param {string} props.data The meta data to render
 * @param {string} [props.labelColor] The color to make the label
 * @param {string} [props.color] A color to apply to the entire component if
 * passed. props.labelColor will still take precedence over this.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.4.0
 */
export default function MetaLabel({ label, data, labelColor, color }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    labelText: {
      fontWeight: 'bold',
      color: labelColor ? labelColor : color ? color : colors.text,
    },
    textWrapper: {
      paddingTop: 3,
      color: color ? color : colors.text,
    },
  });

  if (!data) {
    return null;
  } else {
    return (
      <Text
        style={styles.textWrapper}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={label + ': ' + data}
        maxFontSizeMultiplier={1.8}
      >
        <Text style={styles.labelText}>{label + ': '}</Text>
        {data}
      </Text>
    );
  }
}
