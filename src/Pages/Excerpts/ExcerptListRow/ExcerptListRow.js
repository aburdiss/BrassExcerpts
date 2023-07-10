// @ts-check
import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PreferencesContext } from '../../../Model/Preferences';
import { isFavorite } from '../../../utils/isFavorite/isFavorite';
import { useColors } from '../../../utils/customHooks/useColors/useColors';

/**
 * @function ExcerptListRow
 * @description One row in the Excerpts List.
 * Created 3/6/21
 * @param {Object} props JSX props passed to this React Component
 * @param {string} props.composer The composer of this Excerpt row
 * @param {string} props.composition The composition to navigate to
 * @param {function} props.onPress The function to call when this component is
 * pressed.
 * @param {string} props.color
 * @param {string} props.backgroundColor
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.4.2
 */
export default function ExcerptListRow({
  composer,
  composition,
  onPress,
  color,
  backgroundColor,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    accentColor: {
      color: color ? color : colors.green,
    },
    button: {
      paddingVertical: 10,
      paddingLeft: 25,
      paddingRight: 10,
      borderTopColor: colors.systemGray5,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 44,
      backgroundColor: backgroundColor ? backgroundColor : colors.background2,
    },
    chevron: {
      width: 25,
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
      justifyContent: 'flex-end',
      flexShrink: 0,
    },
    favoriteIcon: {
      paddingRight: 3,
      width: 25,
    },
    text: {
      fontSize: 16,
      flexDirection: 'row',
      flexShrink: 10,
      flexWrap: 'wrap',
    },
  });
  const { state } = useContext(PreferencesContext);

  return (
    <Pressable
      // @ts-ignore
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
            style={styles.chevron}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
}
