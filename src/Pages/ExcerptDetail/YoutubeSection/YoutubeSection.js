import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import YoutubeLink from './YoutubeLink/YoutubeLink';
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';
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
              <SectionHeading>Orchestra</SectionHeading>
              {excerptVideos.full.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="full" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.band ? (
            <View>
              <SectionHeading>Band</SectionHeading>
              {excerptVideos.band.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="band" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.score ? (
            <View>
              <SectionHeading>Full Orchestra with Score</SectionHeading>
              {excerptVideos.score.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="score" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.horn ? (
            <View>
              <SectionHeading>Horn Specific</SectionHeading>
              {excerptVideos.horn.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.trumpet ? (
            <View>
              <SectionHeading>Trumpet Specific</SectionHeading>
              {excerptVideos.trumpet.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.trombone ? (
            <View>
              <SectionHeading>Trombone Specific</SectionHeading>
              {excerptVideos.trombone.map((video) => (
                <YoutubeLink video={video} key={video[1]} type="instrument" />
              ))}
            </View>
          ) : null}
          {excerptVideos?.tuba ? (
            <View>
              <SectionHeading>Tuba Specific</SectionHeading>
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
