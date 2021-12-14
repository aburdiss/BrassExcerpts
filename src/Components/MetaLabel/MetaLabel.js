import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @description Renders a bold label with a colon, and the meta data
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.4.0
 * @param props The JSX props passed to this React component
 * @param {String} props.label The meta label for this data
 * @param {String} props.data The meta data to render
 * @param {String} [props.labelColor] The color to make the label
 * @param {string} [props.color] A color to apply to the entire component if
 * passed. props.labelColor will still take precedence over this.
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
