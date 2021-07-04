import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../../Model/Model';

/**
 * @function ComposerListRow
 * @description A styled list row, designed to look like a contact on an iOS
 * device. This is used when displaying a list of composers.
 * @param props The JSX props passed to this React component
 * @param {String} props.name The name of the composer to display
 * @param {Number} props.index The index of the composer. This is used to style
 * the first composer slightly differently.
 * @param {String} props.imageSource The URL of the image to display on the
 * list.
 * @param {Function} props.onPress The function to call when this list row is
 * pressed.
 * @author Alexander Burdiss
 * @since 3/18/21
 * @version 1.1.2
 * @component
 * @example
 * ```jsx
 * <ComposerListRow
 *   name={item.name}
 *   index={index}
 *   imageSource={item.image}
 *   onPress={() => {
 *     navigateToComposerDetail(item);
 *   }}
 * />
 * ```
 */
const ComposerListRow = ({ name, index, imageSource, onPress }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const divider = index != 0 ? styles.notFirstTextContainer : null;

  return (
    <Pressable
      accessible={true}
      accessibilityLabel={name}
      accessibilityHint={'Navigates to Composer ' + name}
      accessibilityRole="button"
      android_ripple={{
        color: styles.androidRipple.color,
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={onPress}
    >
      <SafeAreaView style={styles.container} edges={['right', 'left']}>
        <Image source={imageSource} style={styles.image} />
        <View style={{ ...styles.textContainer, ...divider }}>
          <Text style={styles.text} maxFontSizeMultiplier={1.8}>
            {name}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={styles.chevron.color}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  androidRipple: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
  },
  chevron: {
    color: new DynamicValue(colors.systemGray, colors.systemGray),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  image: {
    aspectRatio: 1,
    height: 54,
    width: 54,
    borderRadius: 29,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: new DynamicValue(colors.black, colors.white),
  },
  notFirstTextContainer: {
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
    height: 78,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
});

export default ComposerListRow;
