import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../../Model/Model';
import {PreferencesContext} from '../../../Model/Preferences';
import {isFavorite} from '../../../utils/isFavorite/isFavorite';

/**
 * @description One row in the Excerpts List.
 * @param {*} props JSX props passed to this React Component
 * @param {String} props.composer The composer of this Excerpt row
 * @param {String} props.composition The composition to navigate to
 * @param {Function} props.onPress The function to call when this component is
 * pressed.
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.0.0
 */
const ExcerptListRow = ({composer, composition, onPress}) => {
  const {state} = useContext(PreferencesContext);

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text styles={styles.text}>
        <Text style={styles.composerText}>{composer + '  '}</Text>
        <Text style={styles.compositionText}>{composition}</Text>
      </Text>
      {isFavorite(state, composer, composition) && (
        <Ionicons
          name="heart"
          size={24}
          color={colors.redLight}
          style={styles.favoriteIcon}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingLeft: 25,
    borderBottomColor: colors.systemGray2Light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
  },
  composerText: {
    fontWeight: 'bold',
  },
  favoriteIcon: {
    paddingRight: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default ExcerptListRow;
