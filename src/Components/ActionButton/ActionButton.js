import React from 'react';
import {StyleSheet, Pressable, Text} from 'react-native';
import {colors} from '../../Model/Model';

/**
 * @description A styled button that is used for actions throughout the app.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.0.1
 * @param props The JSX props passed to this React component
 * @param {Function} props.onPress The function to call when this component is
 * pressed
 * @param {String} children The text to render on this button.
 */
const ActionButton = ({onPress, children}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.button,
      })}
      accessibilityRole="button">
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
