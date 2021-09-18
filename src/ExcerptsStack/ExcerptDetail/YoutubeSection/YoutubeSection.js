import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import YoutubeLink from './YoutubeLink/YoutubeLink';
import SectionHeader from '../../../Components/SectionHeader/SectionHeader';
import YouTubeModel from '../../../Model/YouTubeModel/YouTubeModel';
import MainHeading from '../../../Components/MainHeading/MainHeading';

/**
 * @namespace YoutubeSection
 * @function YoutubeSection
 * @description One section of Youtube videos. This section takes care of
 * separating all of the colors for the different section.
 * @author Alexander Burdiss
 * @since 3/10/21
 * @version 1.1.0
 * @param props The JSX props passed to this React component
 * @param {String} props.data A key used to retrieve data from YouTubeModel.js
 * @component
 * @example
 * <YoutubeSection data={item.videos} />
 */
export default function YoutubeSection({ data }) {
  const excerptVideos = YouTubeModel[data];

  const styles = StyleSheet.create({
    videosContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
  });

  return (
    <View>
      <MainHeading>Listen</MainHeading>
      <SafeAreaView edges={['right', 'left']}>
        <View style={styles.videosContainer}>
          {excerptVideos?.full ? (
            <View>
              <SectionHeader>Orchestra</SectionHeader>
              {excerptVideos.full.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="full" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.band ? (
            <View>
              <SectionHeader>Band</SectionHeader>
              {excerptVideos.band.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="band" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.score ? (
            <View>
              <SectionHeader>Full Orchestra with Score</SectionHeader>
              {excerptVideos.score.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="score" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.horn ? (
            <View>
              <SectionHeader>Horn Specific</SectionHeader>
              {excerptVideos.horn.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.trumpet ? (
            <View>
              <SectionHeader>Trumpet Specific</SectionHeader>
              {excerptVideos.trumpet.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.trombone ? (
            <View>
              <SectionHeader>Trombone Specific</SectionHeader>
              {excerptVideos.trombone.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.tuba ? (
            <View>
              <SectionHeader>Tuba Specific</SectionHeader>
              {excerptVideos.tuba.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
