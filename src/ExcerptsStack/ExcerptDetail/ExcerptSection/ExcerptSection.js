import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { capitalize } from '../../../utils/captiatlize/capitalize';

import { getNumberOfInstruments } from '../../../utils/getNumberOfInstruments/getNumberOfInstruments';
import { PreferencesContext } from '../../../Model/Preferences';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';
import ExcerptCollapsible from './ExcerptCollapsible/ExcerptCollapsible';

/**
 * @function ExcerptSection
 * @description One Excerpt from a composition. If there are too many excerpts,
 * they get collapsed, or if the user has set them to always collapse.
 * @author Alexander Burdiss
 * @since 5/1/21
 * @version 1.2.0
 * @param props The JSX props passed to this React component
 * @param {Object} props.instrumentExcerpt The object that contains the excerpts
 * for this instrument.
 * @param {String} props.instrumentName The name of the instrument this excerpt
 * is for.
 * @param {Function} props.addToFavorites A function that adds the current
 * excerpt/instrument to favorites.
 * @param {Boolean} props.shouldStartCollapsed A flag that determines if the
 * excerpts should start collapsed.
 * @param {Object} props.item The Composition Item object.
 * @component
 * @example
 * <ExcerptSection
 *   instrumentExcerpt={tubaExcerpt}
 *   instrumentName={'tuba'}
 *   addToFavorites={addToFavorites}
 *   shouldStartCollapsed={shouldStartCollapsed}
 *   item={item}
 * />
 */
export default function ExcerptSection({
  instrumentExcerpt,
  instrumentName,
  addToFavorites,
  shouldStartCollapsed,
  item,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    accentColor: {
      color: colors.green,
    },
    favoriteColor: {
      color: colors.red,
    },
    instrumentExcerptContainer: {
      borderTopColor: colors.green,
      borderTopWidth: 2,
      marginTop: 10,
      paddingTop: 0,
    },
    instrumentHeading: {
      fontSize: 28,
      color: colors.text,
    },
    instrumentHeadingContainer: {
      backgroundColor: colors.systemGray4,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
  const { state } = useContext(PreferencesContext);

  const isFavorite = state.favorites.includes(
    instrumentName + item.composerLast + item.name,
  );

  return instrumentExcerpt ? (
    <View style={styles.instrumentExcerptContainer}>
      {getNumberOfInstruments(state) > 1 && (
        <SafeAreaView
          edges={['right', 'left']}
          style={styles.instrumentHeadingContainer}
        >
          <Text
            style={styles.instrumentHeading}
            accessibilityRole="header"
            maxFontSizeMultiplier={1.8}
          >
            {capitalize(instrumentName)}
          </Text>
          <Pressable
            accessible={true}
            accessibilityRole="imagebutton"
            accessibilityLabel={isFavorite ? 'Favorite' : 'Not Favorite'}
            accessibilityHint={
              isFavorite
                ? 'Remove excercise from favorites'
                : 'Add excercise to favorites'
            }
            accessibilityState={{ selected: isFavorite }}
            onPress={() => {
              addToFavorites(instrumentName);
            }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={32}
              color={
                isFavorite
                  ? styles.favoriteColor.color
                  : styles.accentColor.color
              }
            />
          </Pressable>
        </SafeAreaView>
      )}
      {instrumentExcerpt.excerpts.map((excerpt, index) => (
        <ExcerptCollapsible
          excerpt={excerpt}
          key={excerpt.id}
          index={index}
          startCollapsed={shouldStartCollapsed()}
        />
      ))}
    </View>
  ) : null;
}
