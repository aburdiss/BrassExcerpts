import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

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

/**
 * @todo Get the Image View to change width when you rotate the phone.
 * @todo Add Loading State to images.
 */
const ExcerptDetail = () => {
  const route = useRoute();
  const item = route.params;

  const {state} = useContext(PreferencesContext);

  const [screenWidth, setScreenWidth] = useState(0);

  const [hornExcerpt, setHornExcerpt] = useState(undefined);
  const [trumpetExcerpt, setTrumpetExcerpt] = useState(undefined);
  const [tromboneExcerpt, setTromboneExcerpt] = useState(undefined);
  const [tubaExcerpt, setTubaExcerpt] = useState(undefined);

  function getNumberOfInstruments(state) {
    let count = 0;
    if (state.horn) {
      count++;
    }
    if (state.trumpet) {
      count++;
    }
    if (state.trombone) {
      count++;
    }
    if (state.tuba) {
      count++;
    }
    return count;
  }

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

  useEffect(
    function updateScreenWidth() {
      const {width} = Dimensions.get('window');
      setScreenWidth(width);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Dimensions],
  );

  function displayExcerpts(instrumentExcerpt) {
    return instrumentExcerpt.excerpts.map((excerpt) => (
      <View key={excerpt.id} style={styles.excerptContainer}>
        <View style={styles.excerptMetaContainer}>
          <Text style={styles.heading}>{excerpt.description}</Text>
          <Text style={styles.excerptMeasures}>{excerpt.measures}</Text>
        </View>
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
      </View>
    ));
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
      </View>
      <View>
        {hornExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <Text style={styles.instrumentHeading}>Horn</Text>
            )}
            {displayExcerpts(hornExcerpt)}
          </View>
        )}
        {trumpetExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <Text style={styles.instrumentHeading}>Trumpet</Text>
            )}
            {displayExcerpts(trumpetExcerpt)}
          </View>
        )}
        {tromboneExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <Text style={styles.instrumentHeading}>Trombone</Text>
            )}
            {displayExcerpts(tromboneExcerpt)}
          </View>
        )}
        {tubaExcerpt && (
          <View style={styles.instrumentExcerptContainer}>
            {getNumberOfInstruments(state) > 1 && (
              <Text style={styles.instrumentHeading}>Tuba</Text>
            )}
            {displayExcerpts(tubaExcerpt)}
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

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.systemGray4Light,
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
