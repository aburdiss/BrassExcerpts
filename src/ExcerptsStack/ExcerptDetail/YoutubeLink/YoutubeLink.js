import React from 'react';
import {Pressable, Linking, Text, StyleSheet} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../../Model/Model';

/**
 * @function YoutubeLink
 * @description One link in the YouTube link section.
 * @param props The JSX props passed to this React component.
 * @param {String[]} props.video An array, where the first index is the
 * instrument part name, and the second is the YouTube code, to be attached
 * to the end of a Youtube URL.
 * @param {String} props.type The type of YouTube link that this is. This
 * affects the color of the link button.
 * @author Alexander Burdiss
 * @since 3/10/21
 * @version 1.1.1
 * @component
 * @example
 * ```jsx
 * <YoutubeLink video={video} type="band" />
 * ```
 */
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
      accessible="true"
      accessibilityRole="button"
      accessibilityLabel={video[0]}
      accessibilityHint={'Opens YouTube video in separate app'}
      android_ripple={{
        color: textColors[type],
      }}
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
        opacity: pressed ? 0.7 : 1,
        backgroundColor: backgroundColors[type],
        borderBottomColor: bottomBorderColors[type],
        ...styles.button,
      })}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: textColors[type],
          ...styles.text,
        }}>
        {video[0]}
      </Text>
      <Ionicons name="open-outline" size={20} color={textColors[type]} />
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
});

export default YoutubeLink;
