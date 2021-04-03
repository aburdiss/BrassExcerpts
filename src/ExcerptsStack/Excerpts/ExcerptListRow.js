import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {colors} from '../../Model/Model';

/**
 * @description One row in the Excerpts List.
 * @param {*} props JSX props passed to this React Component
 * @param {String} props.composer The composer of this Excerpt row
 * @param {String} props.composition The composition to navigate to
 * @param {Function} props.onPress The function to call when this component is
 * pressed.
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.0.0
 */
const ExcerptListRow = ({composer, composition, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text styles={styles.text}>
        <Text style={styles.composerText}>{composer + '  '}</Text>
        <Text style={styles.compositionText}>{composition}</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingLeft: 25,
    borderBottomColor: colors.systemGray2Light,
    borderBottomWidth: 1,
  },
  composerText: {
    fontWeight: 'bold',
  },
  compositionText: {},
});

export default ExcerptListRow;
