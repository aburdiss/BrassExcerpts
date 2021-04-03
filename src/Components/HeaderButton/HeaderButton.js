import React from 'react';
import {View} from 'react-native';
import {Text, Pressable} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';
// import {translate} from '../Translations/TranslationModel';
const translate = (text) => text;

/**
 * @description A simple button to live on the header and provide additional
 * navigation options in the app. This component handles translation of the
 * text that is passed in to it.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.0.0
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
const HeaderButton = ({children, handler}) => {
  const DARKMODE = useDarkMode();
  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.orangeDark : colors.orangeLight,
      }}
      onPress={handler}
      accessibilityRole="link"
      accessible={true}
      accessibilityLabel={translate(children)}
      accessibilityHint={translate('Navigates to') + ' ' + translate(children)}
      style={{
        padding: 8,
        marginRight: 4,
      }}>
      {({pressed}) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            opacity: pressed ? 0.7 : 1,
          }}>
          {children == 'Random' ? (
            <Ionicons
              name="cube-outline"
              size={25}
              color={DARKMODE ? colors.greenDark : colors.greenLight}
              style={{
                marginBottom: -10,
                marginTop: -8,
                paddingRight: 3,
              }}
            />
          ) : null}
          <Text
            maxFontSizeMultiplier={1.8}
            style={{
              color: DARKMODE ? colors.greenDark : colors.greenLight,
              fontSize: 16,
            }}>
            {translate(children)}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default HeaderButton;
