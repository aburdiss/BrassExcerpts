import React from 'react';
import {View} from 'react-native';
import YouTubeModel from '../../Model/YouTubeModel';
import YoutubeLink from './YoutubeLink';
import YoutubeSectionHeader from './YoutubeSectionHeader';

const YoutubeSection = ({data}) => {
  const excerptVideos = YouTubeModel[data];
  return (
    <View>
      {excerptVideos.full ? (
        <View>
          <YoutubeSectionHeader>Orchestra</YoutubeSectionHeader>
          {excerptVideos.full.map((video) => (
            <YoutubeLink video={video} key={video[1]} type="full" />
          ))}
        </View>
      ) : null}
      {excerptVideos.band ? (
        <View>
          <YoutubeSectionHeader>Band</YoutubeSectionHeader>
          {excerptVideos.band.map((video) => (
            <YoutubeLink video={video} key={video[1]} type="band" />
          ))}
        </View>
      ) : null}
      {excerptVideos.score ? (
        <View>
          <YoutubeSectionHeader>Full Orchestra with Score</YoutubeSectionHeader>
          {excerptVideos.score.map((video) => (
            <YoutubeLink video={video} key={video[1]} type="score" />
          ))}
        </View>
      ) : null}
      {excerptVideos.trombone ? (
        <View>
          <YoutubeSectionHeader>Trombone Specific</YoutubeSectionHeader>
          {excerptVideos.trombone.map((video) => (
            <YoutubeLink video={video} key={video[1]} type="instrument" />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default YoutubeSection;
