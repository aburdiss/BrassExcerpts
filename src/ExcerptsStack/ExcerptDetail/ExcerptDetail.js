import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import YoutubeSection from './YoutubeSection/YoutubeSection';
import ExcerptSection from './ExcerptSection/ExcerptSection';
import {colors} from '../../Model/Model';
import {composers} from '../../Model/ComposerModel';

import {excerpts as hornExcerpts} from '../../Model/Excerpts/HornExcerpts';
import {excerpts as trumpetExcerpts} from '../../Model/Excerpts/TrumpetExcerpts';
import {excerpts as tromboneExcerpts} from '../../Model/Excerpts/TromboneExcerpts';
import {excerpts as tubaExcerpts} from '../../Model/Excerpts/TubaExcerpts';
import {PreferencesContext} from '../../Model/Preferences';
import {getNumberOfInstruments} from '../../utils/getNumberOfInstruments/getNumberOfInstruments';
import {getActiveInstrument} from '../../utils/getActiveInstrument/getActiveInstrument';

/**
 * @todo Add Loading State to images.
 *
 * @function ExcerptDetail
 * @description A component that displays all of the details about one of the
 * excerpts in the app. When clicking on each image, it opens a separate view
 * where the image is rotated.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.0.1
 * @component
 * @example
 * ```jsx
 * <ExcerptDetail />
 * ```
 */
const ExcerptDetail = () => {
  const route = useRoute();
  const item = route.params;

  const {state, dispatch} = useContext(PreferencesContext);
  const [hornExcerpt, setHornExcerpt] = useState(undefined);
  const [trumpetExcerpt, setTrumpetExcerpt] = useState(undefined);
  const [tromboneExcerpt, setTromboneExcerpt] = useState(undefined);
  const [tubaExcerpt, setTubaExcerpt] = useState(undefined);

  useEffect(
    /**
     * @function ExcerptDetail~useEffect~getAllExcerptData
     * @description Collects all of the data about the current excerpt from the
     * Model, and sets it as the state variables.
     * @author Alexander Burdiss
     * @since 4/30/21
     * @version 1.0.0
     */
    function getAllExcerptData() {
      if (state.horn) {
        const hornData = hornExcerpts.find((excerpt) => {
          return (
            excerpt.name == item.name &&
            excerpt.composerLast == item.composerLast
          );
        });
        hornData && setHornExcerpt(hornData);
      }
      if (state.trumpet) {
        const trumpetData = trumpetExcerpts.find((excerpt) => {
          return (
            excerpt.name == item.name &&
            excerpt.composerLast == item.composerLast
          );
        });
        trumpetData && setTrumpetExcerpt(trumpetData);
      }
      if (state.trombone) {
        const tromboneData = tromboneExcerpts.find((excerpt) => {
          return (
            excerpt.name == item.name &&
            excerpt.composerLast == item.composerLast
          );
        });
        tromboneData && setTromboneExcerpt(tromboneData);
      }
      if (state.tuba) {
        const tubaData = tubaExcerpts.find((excerpt) => {
          return (
            excerpt.name == item.name &&
            excerpt.composerLast == item.composerLast
          );
        });
        tubaData && setTubaExcerpt(tubaData);
      }
    },
    [
      item.composerLast,
      item.name,
      state.horn,
      state.trombone,
      state.trumpet,
      state.tuba,
    ],
  );

  /**
   * @function ExcerptDetail~addToFavorites
   * @description Adds a selected excerpt/instrument combo to the user's
   * favorites.
   * @param {String} instrument The current instrument attached to the excerpt,
   * so that when added to the favorites it is only added for that instrument.
   * @author Alexander Burdiss
   * @since 4/30/21
   * @version 1.0.0
   */
  function addToFavorites(instrument) {
    let activeInstrument = instrument;
    if (getNumberOfInstruments(state) == 1) {
      activeInstrument = getActiveInstrument(state);
    }
    const favoriteKey = activeInstrument + item.composerLast + item.name;
    if (state?.favorites.includes(favoriteKey)) {
      let tempFavorites = state?.favorites.filter((favorite) => {
        return favorite != favoriteKey;
      });
      dispatch({
        type: 'REMOVE_FROM_FAVORITES',
        payload: tempFavorites,
      });
    } else {
      dispatch({
        type: 'ADD_TO_FAVORITES',
        payload: [...state.favorites, favoriteKey],
      });
    }
  }

  /**
   * @function ExcerptDetail~getSingleFavoritesIcon
   * @description If the excerpt is only showing for one instrument, this
   * function returns the correct icon based on whether the excerpt is in the
   * users' favorites or not.
   * @author Alexander Burdiss
   * @since 4/30/21
   * @version 1.0.0
   * @returns {React.Component} An icon to display on the excerpt Header.
   */
  function getSingleFavoritesIcon() {
    const activeInstrument = getActiveInstrument(state);
    const favoriteKey = activeInstrument + item.composerLast + item.name;

    let highlighted;

    if (state?.favorites) {
      highlighted = state.favorites.includes(favoriteKey);
    } else {
      highlighted = false;
    }

    return (
      <Ionicons
        name={highlighted ? 'heart' : 'heart-outline'}
        size={32}
        color={highlighted ? colors.redLight : colors.greenLight}
      />
    );
  }

  /**
   * @function ExcerptDetail~shouldStartCollapsed
   * @description Returns whether or not on the initial load the excerpt should
   * start collapsed.
   * @returns {Boolean} Whether or not the excerpt should be collapsed when the
   * screen mounts.
   */
  function shouldStartCollapsed() {
    let count = 0;

    if (state.alwaysCollapse) {
      return true;
    } else {
      if (hornExcerpt) {
        count += hornExcerpt.excerpts.length;
      }
      if (trumpetExcerpt) {
        count += trumpetExcerpt.excerpts.length;
      }
      if (tromboneExcerpt) {
        count += tromboneExcerpt.excerpts.length;
      }
      if (tubaExcerpt) {
        count += tubaExcerpt.excerpts.length;
      }
      return count > 5;
    }
  }

  return (
    <ScrollView>
      <SafeAreaView edges={['right', 'left']}>
        <View style={styles.metaInfoContainer}>
          <View>
            <Text style={styles.title}>{item.composer}</Text>
            <MetaLabel label="Date" data={item.date} />
            <MetaLabel label="Era" data={item.era} />
            <MetaLabel label="Genre" data={item.genre} />
            {getNumberOfInstruments(state) == 1 ? (
              <MetaLabel label="Mutes" data={item.mutes} />
            ) : (
              <>
                {hornExcerpt && (
                  <MetaLabel label="Horn Mutes" data={hornExcerpt.mutes} />
                )}
                {trumpetExcerpt && (
                  <MetaLabel
                    label="Trumpet Mutes"
                    data={trumpetExcerpt.mutes}
                  />
                )}
                {tromboneExcerpt && (
                  <MetaLabel
                    label="Trombone Mutes"
                    data={tromboneExcerpt.mutes}
                  />
                )}
                {tubaExcerpt && (
                  <MetaLabel label="Tuba Mutes" data={tubaExcerpt.mutes} />
                )}
              </>
            )}
          </View>
          <Image
            style={styles.composerImage}
            source={
              composers.find((object) => object.slug == item.composerLast)
                ?.image
            }
          />
          {getNumberOfInstruments(state) == 1 && (
            <Pressable
              onPress={addToFavorites}
              hitSlop={10}
              style={styles.singleAddToFavoritesButton}>
              {getSingleFavoritesIcon()}
            </Pressable>
          )}
        </View>
      </SafeAreaView>
      <View>
        <ExcerptSection
          instrumentExcerpt={hornExcerpt}
          instrumentName={'horn'}
          addToFavorites={addToFavorites}
          shouldStartCollapsed={shouldStartCollapsed}
          item={item}
        />
        <ExcerptSection
          instrumentExcerpt={trumpetExcerpt}
          instrumentName={'trumpet'}
          addToFavorites={addToFavorites}
          shouldStartCollapsed={shouldStartCollapsed}
          item={item}
        />
        <ExcerptSection
          instrumentExcerpt={tromboneExcerpt}
          instrumentName={'trombone'}
          addToFavorites={addToFavorites}
          shouldStartCollapsed={shouldStartCollapsed}
          item={item}
        />
        <ExcerptSection
          instrumentExcerpt={tubaExcerpt}
          instrumentName={'tuba'}
          addToFavorites={addToFavorites}
          shouldStartCollapsed={shouldStartCollapsed}
          item={item}
        />
      </View>
      <View style={styles.youtubeLinksContainer}>
        <SafeAreaView edges={['right', 'left']}>
          <Text style={styles.youtubeHeading}>Listen</Text>
          <YoutubeSection data={item.videos} />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  singleAddToFavoritesButton: {
    position: 'absolute',
    top: 5,
    right: 90,
  },
  composerImage: {
    aspectRatio: 1,
    width: 95,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  excerptContainer: {
    paddingBottom: 20,
  },
  metaInfoContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  youtubeHeading: {
    fontSize: 28,
    paddingTop: 10,
  },
  youtubeLinksContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 70,
    borderTopColor: colors.greenDark,
    borderTopWidth: 2,
  },
});

export default ExcerptDetail;
