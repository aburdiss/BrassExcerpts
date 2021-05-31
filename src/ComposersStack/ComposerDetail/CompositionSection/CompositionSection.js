import React, {useContext} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../Model/Model';
import {isFavorite} from '../../../utils/isFavorite/isFavorite';
import {PreferencesContext} from '../../../Model/Preferences';

/**
 * @function CompositionSection
 * @description A section of the different compositions that the composer has
 * created.
 * @param props The JSX props passed to this React component.
 * @param {Object[]} props.excerpts The list of excerpts to be displayed in this
 * section.
 * @author Alexander Burdiss
 * @since 3/9/21
 * @version 1.0.0
 */
const CompositionSection = ({excerpts}) => {
  const {state} = useContext(PreferencesContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {excerpts.map((excerpt, index) => {
        const borderTop = index != 0 ? styles.buttonBorder : null;
        return (
          <SafeAreaView edges={['left']} style={styles.buttonSafeArea}>
            <Pressable
              style={({pressed}) => ({
                opacity: pressed ? 0.7 : 1,
                ...borderTop,
                ...styles.button,
              })}
              key={excerpt.id.toString()}
              onPress={function navigateToExcerpt() {
                navigation.navigate('Composer Excerpt Detail', excerpt);
              }}>
              <Text style={styles.text}>{excerpt.name}</Text>
              <SafeAreaView style={styles.iconContainer} edges={['right']}>
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
              </SafeAreaView>
            </Pressable>
          </SafeAreaView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingRight: 20,
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
