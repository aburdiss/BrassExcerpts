import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';

import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import YoutubeSection from './YoutubeSection';
import {colors} from '../../Model/Model';
import {composers} from '../../Model/ComposerModel';
import AutoHeightImage from 'react-native-auto-height-image';

import {excerpts as hornExcerpts} from '../../Model/Excerpts/HornExcerpts';
import {excerpts as trumpetExcerpts} from '../../Model/Excerpts/TrumpetExcerpts';
import {excerpts as tromboneExcerpts} from '../../Model/Excerpts/TromboneExcerpts';
import {excerpts as tubaExcerpts} from '../../Model/Excerpts/TubaExcerpts';
import {PreferencesContext} from '../../Model/Preferences';
import {getNumberOfInstruments} from '../../utils/getNumberOfInstruments/getNumberOfInstruments';
import {getActiveInstrument} from '../../utils/getActiveInstrument/getActiveInstrument';

/**
 * @todo Get the Image View to change width when you rotate the phone.
 * @todo Add Loading State to images.
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

  function shouldStartCollapsed() {
    return true;
  }

  return (
    <ScrollView>
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
                <MetaLabel label="Trumpet Mutes" data={trumpetExcerpt.mutes} />
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
            composers.find((object) => object.slug == item.composerLast)?.image
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
      <View>
        {hornExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <View style={styles.instrumentHeadingContainer}>
                <Text style={styles.instrumentHeading}>Horn</Text>
                <Pressable
                  onPress={() => {
                    addToFavorites('horn');
                  }}>
                  <Ionicons
                    name={
                      state.favorites.includes(
                        'horn' + item.composerLast + item.name,
                      )
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={32}
                    color={
                      state.favorites.includes(
                        'horn' + item.composerLast + item.name,
                      )
                        ? colors.redLight
                        : colors.greenLight
                    }
                  />
                </Pressable>
              </View>
            )}
            {hornExcerpt.excerpts.map((excerpt) => (
              <Excerpt
                excerpt={excerpt}
                key={excerpt.id}
                startCollapsed={shouldStartCollapsed()}
              />
            ))}
          </View>
        )}
        {trumpetExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <View style={styles.instrumentHeadingContainer}>
                <Text style={styles.instrumentHeading}>Trumpet</Text>
                <Pressable
                  onPress={() => {
                    addToFavorites('trumpet');
                  }}>
                  <Ionicons
                    name={
                      state.favorites.includes(
                        'trumpet' + item.composerLast + item.name,
                      )
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={32}
                    color={
                      state.favorites.includes(
                        'trumpet' + item.composerLast + item.name,
                      )
                        ? colors.redLight
                        : colors.greenLight
                    }
                  />
                </Pressable>
              </View>
            )}
            {trumpetExcerpt.excerpts.map((excerpt) => (
              <Excerpt
                excerpt={excerpt}
                key={excerpt.id}
                startCollapsed={shouldStartCollapsed()}
              />
            ))}
          </View>
        )}
        {tromboneExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <View style={styles.instrumentHeadingContainer}>
                <Text style={styles.instrumentHeading}>Trombone</Text>
                <Pressable
                  onPress={() => {
                    addToFavorites('trombone');
                  }}>
                  <Ionicons
                    name={
                      state.favorites.includes(
                        'trombone' + item.composerLast + item.name,
                      )
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={32}
                    color={
                      state.favorites.includes(
                        'trombone' + item.composerLast + item.name,
                      )
                        ? colors.redLight
                        : colors.greenLight
                    }
                  />
                </Pressable>
              </View>
            )}
            {tromboneExcerpt.excerpts.map((excerpt) => (
              <Excerpt
                excerpt={excerpt}
                key={excerpt.id}
                startCollapsed={shouldStartCollapsed()}
              />
            ))}
          </View>
        )}
        {tubaExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <View style={styles.instrumentHeadingContainer}>
                <Text style={styles.instrumentHeading}>Tuba</Text>
                <Pressable
                  onPress={() => {
                    addToFavorites('tuba');
                  }}>
                  <Ionicons
                    name={
                      state.favorites.includes(
                        'tuba' + item.composerLast + item.name,
                      )
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={32}
                    color={
                      state.favorites.includes(
                        'tuba' + item.composerLast + item.name,
                      )
                        ? colors.redLight
                        : colors.greenLight
                    }
                  />
                </Pressable>
              </View>
            )}
            {tubaExcerpt.excerpts.map((excerpt) => (
              <Excerpt
                excerpt={excerpt}
                key={excerpt.id}
                startCollapsed={shouldStartCollapsed()}
              />
            ))}
          </View>
        )}
      </View>
      <View style={styles.youtubeLinksContainer}>
        <Text style={styles.youtubeHeading}>Listen</Text>
        <YoutubeSection data={item.videos} />
      </View>
    </ScrollView>
  );
};

const Excerpt = ({excerpt, startCollapsed}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(
    function updateScreenWidth() {
      const {width} = Dimensions.get('window');
      setScreenWidth(width);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Dimensions],
  );
  const [excerptIsCollapsed, setExcerptIsCollapsed] = useState(startCollapsed);
  return (
    <View>
      <Pressable
        disabled={!startCollapsed}
        onPress={() => {
          setExcerptIsCollapsed((previous) => !previous);
        }}
        style={styles.excerptMetaContainer}>
        <Text style={styles.heading}>{excerpt.description}</Text>
        <Text style={styles.excerptMeasures}>{excerpt.measures}</Text>
      </Pressable>
      <Collapsible
        collapsed={excerptIsCollapsed}
        style={styles.excerptContainer}>
        {excerpt.pictures.map((picture) => (
          <View key={picture[1]}>
            <Text style={styles.excerptCaption}>{picture[0]}</Text>
            <AutoHeightImage
              width={screenWidth}
              source={{
                uri:
                  'https://github.com/aburdiss/BrassExcerpts/raw/master/img/External/' +
                  picture[1],
              }}
            />
          </View>
        ))}
      </Collapsible>
    </View>
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
  excerptCaption: {
    paddingLeft: 20,
    paddingTop: 7,
    fontSize: 16,
    paddingBottom: 2,
  },
  excerptContainer: {
    paddingBottom: 20,
  },
  excerptMeasures: {
    fontSize: 18,
    marginLeft: 20,
    fontStyle: 'italic',
  },
  excerptMetaContainer: {
    paddingVertical: 5,
    marginBottom: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemGray5Light,
    borderTopColor: colors.greenDark,
    borderTopWidth: 0.2,
    height: 40,
  },
  heading: {
    fontSize: 22,
  },
  instrumentExcerptContainer: {
    borderTopColor: colors.greenDark,
    borderTopWidth: 2,
    marginTop: 10,
    paddingTop: 0,
  },
  instrumentHeading: {
    fontSize: 28,
  },
  instrumentHeadingContainer: {
    backgroundColor: colors.systemGray4Light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
