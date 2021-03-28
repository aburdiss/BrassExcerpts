import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {colors} from '../Model/Model';

const ActionButton = ({onPress, children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.button,
      })}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.greenLight,
    borderRadius: 8,
    marginVertical: 10,
    borderBottomColor: colors.blueLight,
    borderBottomWidth: 1,
    borderRightColor: colors.blueLight,
    borderRightWidth: 1,
  },
  text: {
    textAlign: 'center',
    padding: 15,
  },
});

export default ActionButton;
