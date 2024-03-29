import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PreferencesContext } from '../../../Model/Preferences';
import { isFavorite } from '../../../utils/isFavorite/isFavorite';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace ExcerptListRow
 * @function ExcerptListRow
 * @description One row in the Excerpts List.
 * @param {*} props JSX props passed to this React Component
 * @param {String} props.composer The composer of this Excerpt row
 * @param {String} props.composition The composition to navigate to
 * @param {Function} props.onPress The function to call when this component is
 * pressed.
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.4.0
 */
export default function ExcerptListRow({
  composer,
  composition,
  onPress,
  color,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    accentColor: {
      color: color ? color : colors.green,
    },
    button: {
      paddingVertical: 10,
      paddingLeft: 25,
      borderBottomColor: colors.systemGray5,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 44,
      backgroundColor: colors.background2,
    },
    composerText: {
      fontWeight: 'bold',
      color: color ? color : colors.text,
    },
    compositionText: {
      color: colors.text,
      flexWrap: 'wrap',
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
      flexDirection: 'row',
      maxWidth: '85%',
      flexWrap: 'wrap',
    },
  });
  const { state } = useContext(PreferencesContext);

  return (
    <Pressable
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={composer + ' ' + composition}
      accessibilityHint={'Navigates to ' + composer + ' ' + composition}
      android_ripple={{ color: colors.green }}
    >
      <SafeAreaView edges={['right', 'left']} style={styles.button}>
        <View style={styles.text}>
          <Text style={styles.composerText} maxFontSizeMultiplier={1.7}>
            {composer + '  '}
          </Text>
          <Text style={styles.compositionText} maxFontSizeMultiplier={1.8}>
            {composition}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {isFavorite(state, composer, composition) && (
            <Ionicons
              name="heart"
              size={24}
              color={colors.red}
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
}
