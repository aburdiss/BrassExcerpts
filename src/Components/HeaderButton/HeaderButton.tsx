import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function HeaderButton
 * @component
 * @description A simple button to live on the header and provide additional
 * navigation options in the app. This component handles translation of the
 * text that is passed in to it.
 * Created 3/3/2021
 * @param {Object} props The JSX props passed to this React component
 * @param {Function} props.handler The function to call when the button is
 * pressed.
 * @param {string} props.children The Text to render in the header button.
 * @returns {JSX.Element} JSX Render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
 * @example
 * <HeaderButton handler={handler}>
 *   Hello, World!
 * </HeaderButton />
 */
export default function HeaderButton({
  children,
  handler,
}: {
  children: any;
  handler: Function;
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
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
      color: colors.green,
      fontSize: 16,
    },
  });

  return (
    <Pressable
      android_ripple={{ color: colors.green }}
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
}
