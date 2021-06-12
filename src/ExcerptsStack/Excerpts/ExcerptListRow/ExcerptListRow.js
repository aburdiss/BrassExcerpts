import React, {useContext} from 'react';
import {Pressable, Text, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

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
 * @version 1.2.0
 */
const ExcerptListRow = ({composer, composition, onPress}) => {
  const {state} = useContext(PreferencesContext);

  return (
    <Pressable
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={composer + ' ' + composition}
      accessibilityHint={'Navigates to ' + composer + ' ' + composition}
      android_ripple={{
        color: styles.accentColor.color,
      }}>
      <SafeAreaView edges={['right', 'left']} style={styles.button}>
        <Text styles={styles.text}>
          <Text style={styles.composerText}>{composer + '  '}</Text>
          <Text style={styles.compositionText}>{composition}</Text>
        </Text>
        <View style={styles.iconContainer}>
          {isFavorite(state, composer, composition) && (
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
            color={styles.accentColor.color}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  accentColor: {
    color: colors.greenLight,
  },
  button: {
    paddingVertical: 10,
    paddingLeft: 25,
    borderBottomColor: colors.systemGray2Light,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    backgroundColor: colors.systemGray6Light,
  },
  composerText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  favoriteIcon: {
    paddingRight: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default ExcerptListRow;
