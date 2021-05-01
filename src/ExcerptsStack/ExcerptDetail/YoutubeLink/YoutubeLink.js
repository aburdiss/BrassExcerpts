import React from 'react';
import {Pressable, Linking, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../../Model/Model';

const YoutubeLink = ({video, type}) => {
  const DARKMODE = useDarkMode();

  const backgroundColors = {
    full: DARKMODE ? colors.greenDark : colors.greenLight,
    score: DARKMODE ? colors.orangeDark : colors.orangeLight,
    band: DARKMODE ? colors.redDark : colors.redLight,
    instrument: DARKMODE ? colors.blueDark : colors.blueLight,
  };

  const bottomBorderColors = {
    full: DARKMODE ? colors.blueDark : colors.blueLight,
    score: DARKMODE ? colors.yellowDark : colors.yellowLight,
    band: DARKMODE ? colors.orangeDark : colors.orangeLight,
    instrument: DARKMODE ? colors.purpleDark : colors.purpleLight,
  };

  const textColors = {
    full: DARKMODE ? colors.white : colors.black,
    score: DARKMODE ? colors.white : colors.black,
    band: DARKMODE ? colors.white : colors.black,
    instrument: DARKMODE ? colors.white : colors.white,
  };

  return (
    <Pressable
      onPress={function openYouTubeLink() {
        const url = video[1];
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(`https://youtu.be/${url}`);
          } else {
            console.log("Can't open url: " + url);
          }
          return false;
        });
      }}
      style={({pressed}) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: pressed ? 0.7 : 1,
        backgroundColor: backgroundColors[type],
        marginVertical: 4,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderBottomColor: bottomBorderColors[type],
        borderBottomWidth: 1,
      })}>
      <Text
        style={{
          fontWeight: 'bold',
          flex: 1,
          color: textColors[type],
          paddingRight: 10,
        }}>
        {video[0]}
      </Text>
      <Ionicons name="open-outline" size={20} color={textColors[type]} />
    </Pressable>
  );
};

export default YoutubeLink;
