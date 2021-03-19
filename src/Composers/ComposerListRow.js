import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../Model/Model';

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
