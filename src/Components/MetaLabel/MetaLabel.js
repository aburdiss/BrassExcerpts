import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @description Renders a bold label with a colon, and the meta data
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.3.0
 * @param props The JSX props passed to this React component
 * @param {String} props.label The meta label for this data
 * @param {String} props.data The meta data to render
 * @param {String} [props.labelColor] The color to make the label
 */
export default function MetaLabel({ label, data, labelColor }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    labelText: {
      fontWeight: 'bold',
    },
    textWrapper: {
      paddingTop: 3,
      color: colors.text,
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
        <Text
          style={[
            styles.labelText,
            { color: labelColor ? labelColor : styles.textWrapper.color },
          ]}
        >
          {label + ': '}
        </Text>
        {data}
      </Text>
    );
  }
}
