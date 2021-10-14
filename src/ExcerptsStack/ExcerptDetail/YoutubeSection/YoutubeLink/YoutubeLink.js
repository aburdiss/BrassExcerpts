import React from 'react';
import { Pressable, Linking, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../../utils/CustomHooks/useColors/useColors';
import { getContrast } from '../../../../utils/getContrast/getContrast';

/**
 * @namespace YoutubeLink
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
 * @version 1.3.1
 * @component
 * @example
 * <YoutubeLink video={video} type="band" />
 */
export default function YoutubeLink({ video, type }) {
  const colors = useColors();

  const backgroundColors = {
    full: colors.green,
    score: colors.orange,
    band: colors.yellow,
    instrument: colors.blue,
  };

  return (
    <Pressable
      accessible="true"
      accessibilityRole="button"
      accessibilityLabel={video[0]}
      accessibilityHint={'Opens YouTube video in separate app'}
      android_ripple={{
        color: getContrast(backgroundColors[type], colors),
      }}
      onPress={function openYouTubeLink() {
        const url = `https://youtu.be/${video[1]}`;
        Linking.canOpenURL(url).then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Can't open url: " + url);
          }
          return false;
        });
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        backgroundColor: backgroundColors[type],
        ...styles.button,
      })}
    >
      <Text
        style={{
          color: getContrast(backgroundColors[type], colors),
          ...styles.text,
        }}
        maxFontSizeMultiplier={1.8}
      >
        {video[0]}
      </Text>
      <Ionicons
        name="open-outline"
        size={20}
        color={getContrast(backgroundColors[type], colors)}
      />
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  text: {
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
});
