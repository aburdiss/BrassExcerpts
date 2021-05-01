import React, {useContext} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';
import {isFavorite} from '../../utils/isFavorite/isFavorite';
import {PreferencesContext} from '../../Model/Preferences';

const CompositionSection = ({excerpts}) => {
  const {state} = useContext(PreferencesContext);
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
            <View style={styles.iconContainer}>
              {isFavorite(state, excerpt.composerLast, excerpt.name) && (
                <Ionicons
                  name="heart"
                  size={24}
                  color={colors.redLight}
                  style={styles.favoriteIcon}
                />
              )}
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.greenLight}
              />
            </View>
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
  iconContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
  },
});

export default CompositionSection;
