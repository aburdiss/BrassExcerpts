import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import MetaLabel from './ExcerptDetail/MetaLabel';
import YoutubeLink from './ExcerptDetail/YoutubeLink';
import {colors} from '../Model/Model';
import {Image} from 'react-native';

/**
 * @todo Images: Load into this repo. Make this Repo public. Use
 * https://github.com/vivaxy/react-native-auto-height-image
 * to get them to display correctly.
 */
const ExcerptDetail = () => {
  const route = useRoute();
  const item = route.params;
  console.log(item.videos);

  return (
    <ScrollView>
      <View style={styles.metaInfoContainer}>
        <Text style={styles.title}>{item.composer}</Text>
        <MetaLabel label="Date" data={item.date} />
        <MetaLabel label="Era" data={item.era} />
        <MetaLabel label="Genre" data={item.genre} />
        <MetaLabel label="Mutes" data={item.mutes} />
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
                <Image
                  style={{
                    height: 100,
                  }}
                  source={{
                    uri:
                      'https://raw.githubusercontent.com/aburdiss/ScalePractice/master/img/ANPLogo.png',
                  }}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.youtubeLinksContainer}>
        <Text style={styles.heading}>Listen</Text>
        {item.videos.map((video) => (
          <YoutubeLink key={video[1]} video={video} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
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
