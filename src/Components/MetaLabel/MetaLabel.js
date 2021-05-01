import React from 'react';
import {Text, StyleSheet} from 'react-native';

/**
 * @description Renders a bold label with a colon, and the meta data
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.1.0
 * @param props The JSX props passed to this React component
 * @param {String} props.label The meta label for this data
 * @param {String} props.data The meta data to render
 */
const MetaLabel = ({label, data}) => {
  if (!data) {
    return null;
  } else {
    return (
      <Text style={styles.textWrapper}>
        <Text style={styles.labelText}>{label + ': '}</Text>
        {data}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  labelText: {
    fontWeight: 'bold',
  },
  textWrapper: {
    paddingTop: 3,
  },
});

export default MetaLabel;
