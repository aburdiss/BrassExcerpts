// @ts-check
import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { capitalize } from '../../utils/captiatlize/capitalize';
import { isFavorite } from '../../utils/isFavorite/isFavorite';
import { getExcerptData } from '../../utils/getExcerptData/getExcerptData';
import { useColors } from '../../utils/customHooks/useColors/useColors';
import { getInstrumentsSelected } from '../../utils/getInstrumentsSelected/getInstrumentsSelected';

/**
 * @function ConditionalExcerptLink
 * @component
 * @description Conditionally renders the Excerpt as a Link or as text
 * depending on if it exists in the App or not.
 * Created 9/25/2021
 * @param {Object} props The JSX props passed to this React Component
 * @param {string} props.instrument The instrument that this conditional link
 * is being rendered for.
 * @param {string} props.excerpt The name of the excerpt to be looked up in
 * state.
 * @param {number} props.index The index that this link is rendering as. This
 * is used for styling purposes.
 * @param {Object} props.state The user state stored in Context.
 * @param {Function} props.navigateToExcerptDetail A function that will handle
 * navigating the user to the Excerpt Detail screen.
 * @returns {JSX.Element} JSX Render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.1
 */
export default function ConditionalExcerptLink({
  instrument,
  excerpt,
  index,
  state,
  navigateToExcerptDetail,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    buttonBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.systemGray5,
    },
    excerptButton: {
      marginLeft: 20,
      paddingRight: 20,
      minHeight: 45,
      backgroundColor: colors.background2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    excerptName: {
      color: colors.text,
    },
    excerptLink: {
      color: colors.green,
      width: '80%',
      paddingVertical: 13,
    },
    forwardIcon: {
      paddingRight: 5,
    },
    iconContainer: {
      flexDirection: 'row',
      width: '20%',
      justifyContent: 'flex-end',
    },
  });

  const borderTop = index != 0 ? styles.buttonBorder : null;
  const activeInstruments = getInstrumentsSelected(state);
  const instrumentActive = activeInstruments.includes(capitalize(instrument));
  const excerptData = getExcerptData(instrument, excerpt);

  if (excerptData && instrumentActive) {
    return (
      <SafeAreaView edges={['left']}>
        <Pressable
          accessible
          accessibilityRole="button"
          accessibilityLabel={excerptData.composerLast + ' ' + excerptData.name}
          accessibilityHint={
            'Navigates to excerpt ' +
            excerptData.composerLast +
            ' ' +
            excerptData.name
          }
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            ...styles.excerptButton,
            ...borderTop,
          })}
          onPress={() => {
            navigateToExcerptDetail(excerptData);
          }}
        >
          <Text style={styles.excerptLink}>
            <Text maxFontSizeMultiplier={1.8}>
              {excerptData.composerLast} -{' '}
            </Text>
            <Text maxFontSizeMultiplier={1.8}>{excerptData.name}</Text>
          </Text>
          <SafeAreaView style={styles.iconContainer} edges={['right']}>
            {isFavorite(state, excerptData.composerLast, excerptData.name) && (
              <Ionicons name="heart" size={24} color={colors.red} />
            )}
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.green}
              style={styles.forwardIcon}
            />
          </SafeAreaView>
        </Pressable>
      </SafeAreaView>
    );
  } else if (excerptData && !instrumentActive) {
    return (
      <SafeAreaView edges={['left']}>
        <View
          accessibilityRole="text"
          style={[styles.excerptButton, borderTop]}
        >
          <Text style={styles.excerptName}>
            <Text maxFontSizeMultiplier={1.8}>
              {excerptData.composerLast} -{' '}
            </Text>
            <Text maxFontSizeMultiplier={1.8}>{excerptData.name}</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView edges={['left']}>
        <View
          accessibilityRole="text"
          style={[styles.excerptButton, borderTop]}
        >
          <Text style={styles.excerptName} maxFontSizeMultiplier={1.8}>
            {excerpt}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
