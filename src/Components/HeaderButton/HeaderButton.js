import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../Model/Model';

/**
 * @description A simple button to live on the header and provide additional
 * navigation options in the app. This component handles translation of the
 * text that is passed in to it.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.1.1
 * @param {Function} props.handler The function to call when the button is
 * pressed.
 * @param {String} props.children The Text to render in the header button.
 *
 * @component
 * @example
 *   <HeaderButton handler={handler}>
 *     Hello, World!
 *   </HeaderButton />
 */
const HeaderButton = ({ children, handler }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <Pressable
      android_ripple={{
        color: new DynamicValue(colors.greenLight, colors.greenDark),
      }}
      onPress={handler}
      accessibilityRole="link"
      accessible={true}
      accessibilityLabel={children}
      accessibilityHint={'Navigates to' + ' ' + children}
      style={styles.containerButton}
    >
      {({ pressed }) => (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ ...styles.buttonTextContainer, opacity: pressed ? 0.7 : 1 }}
        >
          {children == 'Random' ? (
            <Ionicons
              name="cube-outline"
              size={25}
              color={styles.text.color}
              style={styles.icon}
            />
          ) : null}
          <Text maxFontSizeMultiplier={1.8} style={styles.text}>
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  buttonTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerButton: {
    padding: 8,
    marginRight: 4,
  },
  icon: {
    marginBottom: -10,
    marginTop: -8,
    paddingRight: 3,
  },
  text: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
    fontSize: 16,
  },
});

export default HeaderButton;
