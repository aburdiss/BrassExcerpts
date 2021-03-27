import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import MetaLabel from './ExcerptDetail/MetaLabel';
import YoutubeSection from './ExcerptDetail/YoutubeSection';
import {colors} from '../Model/Model';
import {composers} from '../Model/ComposerModel';
import AutoHeightImage from 'react-native-auto-height-image';

/**
 * @todo Get the Image View to change width when you rotate the phone.
 * @todo Add Loading State to images.
 */
const ExcerptDetail = () => {
  const route = useRoute();
  const item = route.params;

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(
    function updateScreenWidth() {
      const {width} = Dimensions.get('window');
      setScreenWidth(width);
    },
    [Dimensions],
  );

  return (
    <ScrollView>
      <View style={styles.metaInfoContainer}>
        <View>
          <Text style={styles.title}>{item.composer}</Text>
          <MetaLabel label="Date" data={item.date} />
          <MetaLabel label="Era" data={item.era} />
          <MetaLabel label="Genre" data={item.genre} />
          <MetaLabel label="Mutes" data={item.mutes} />
        </View>
        <Image
          style={styles.composerImage}
          source={
            composers.find((object) => object.slug == item.composerLast).image
          }
        />
      </View>
      <View style={styles.excerptsContainer}>
        {item.excerpts.map((excerpt) => (
          <View key={excerpt.id}>
            <View style={styles.excerptMetaContainer}>
              <Text style={styles.heading}>{excerpt.description}</Text>
              <Text>{excerpt.measures}</Text>
            </View>
            {excerpt.pictures.map((picture) => (
              <View key={picture[1]}>
                <Text>{picture[0]}</Text>
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
        ))}
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
    backgroundColor: 'white',
  },
  excerptMetaContainer: {
    paddingHorizontal: 20,
  },
  excerptsContainer: {
    marginTop: 10,
  },
  heading: {
    fontSize: 28,
    paddingVertical: 10,
  },
  metaInfoContainer: {
    borderBottomColor: colors.greenDark,
    borderBottomWidth: 1,
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
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 70,
    borderTopColor: colors.greenDark,
    borderTopWidth: 1,
  },
});

export default ExcerptDetail;
