import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';

const CompositionSection = ({excerpts}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {excerpts.map((excerpt, index) => {
        const borderTop = index != 0 ? styles.buttonBorder : null;
        return (
          <Pressable
            style={({pressed}) => ({
              opacity: pressed ? 0.7 : 1,
              ...styles.button,
              ...borderTop,
            })}
            key={excerpt.id.toString()}
            onPress={function navigateToExcerpt() {
              navigation.navigate('Composer Excerpt Detail', excerpt);
            }}>
            <Text style={styles.text}>{excerpt.name}</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.systemGray}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.systemGray,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray,
    borderTopWidth: 1,
    borderTopColor: colors.systemGray,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
  },
});

export default CompositionSection;
