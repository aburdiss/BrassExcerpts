import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';

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
 * @version 1.0.0
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
const ComposerListRow = ({name, index, imageSource, onPress}) => {
  const divider = index != 0 ? styles.notFirstTextContainer : null;

  return (
    <Pressable
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.container,
      })}
      onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={{...styles.textContainer, ...divider}}>
        <Text style={styles.text}>{name}</Text>
        <Ionicons name="chevron-forward" size={24} color={colors.systemGray} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notFirstTextContainer: {
    borderTopColor: 'lightgray',
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
