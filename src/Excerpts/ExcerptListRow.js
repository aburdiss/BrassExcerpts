import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {colors} from '../Model/Model';

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
    borderBottomColor: colors.systemGray,
    borderBottomWidth: 1,
  },
  composerText: {
    fontWeight: 'bold',
  },
  compositionText: {},
});

export default ExcerptListRow;
