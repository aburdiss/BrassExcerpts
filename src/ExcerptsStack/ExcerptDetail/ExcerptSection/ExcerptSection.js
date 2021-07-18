import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useContext } from 'react';

import { capitalize } from 'underscore.string';

import { colors } from '../../../Model/Model';
import { getNumberOfInstruments } from '../../../utils/getNumberOfInstruments/getNumberOfInstruments';
import { PreferencesContext } from '../../../Model/Preferences';
import ExcerptCollapsible from '../ExcerptCollapsible/ExcerptCollapsible';

/**
 * @function ExcerptSection
 * @description One Excerpt from a composition. If there are too many excerpts,
 * they get collapsed, or if the user has set them to always collapse.
 * @author Alexander Burdiss
 * @since 5/1/21
 * @version 1.1.1
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
 * ```jsx
 * <ExcerptSection
 *   instrumentExcerpt={tubaExcerpt}
 *   instrumentName={'tuba'}
 *   addToFavorites={addToFavorites}
 *   shouldStartCollapsed={shouldStartCollapsed}
 *   item={item}
 * />
 * ```
 */
const ExcerptSection = ({
  instrumentExcerpt,
  instrumentName,
  addToFavorites,
  shouldStartCollapsed,
  item,
}) => {
  const { state } = useContext(PreferencesContext);
  const styles = useDynamicStyleSheet(dynamicStyles);

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
};

const dynamicStyles = new DynamicStyleSheet({
  accentColor: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
  },
  favoriteColor: {
    color: new DynamicValue(colors.redLight, colors.redDark),
  },
  instrumentExcerptContainer: {
    borderTopColor: new DynamicValue(colors.greenLight, colors.greenDark),
    borderTopWidth: 2,
    marginTop: 10,
    paddingTop: 0,
  },
  instrumentHeading: {
    fontSize: 28,
    color: new DynamicValue(colors.black, colors.white),
  },
  instrumentHeadingContainer: {
    backgroundColor: new DynamicValue(
      colors.systemGray4Light,
      colors.systemGray4Dark,
    ),
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExcerptSection;
