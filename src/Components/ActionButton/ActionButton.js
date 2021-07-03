import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors } from '../../Model/Model';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

/**
 * @description A styled button that is used for actions throughout the app.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.1.0
 * @param props The JSX props passed to this React component
 * @param {Function} props.onPress The function to call when this component is
 * pressed
 * @param {String} children The text to render on this button.
 */
const ActionButton = ({ onPress, children }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.button,
      })}
      android_ripple={{
        color: styles.button.backgroundColor,
      }}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  button: {
    backgroundColor: new DynamicValue(colors.greenLight, colors.greenDark),
    borderRadius: 8,
    marginVertical: 10,
    borderBottomColor: new DynamicValue(colors.blueLight, colors.blueDark),
    borderBottomWidth: 1,
    borderRightColor: new DynamicValue(colors.blueLight, colors.blueDark),
    borderRightWidth: 1,
  },
  text: {
    textAlign: 'center',
    padding: 15,
    color: new DynamicValue(colors.black, colors.black),
  },
});

export default ActionButton;
