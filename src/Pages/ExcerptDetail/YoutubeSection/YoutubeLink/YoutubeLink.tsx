import React from 'react';
import { Pressable, Linking, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../../utils/customHooks/useColors/useColors';
import { getContrast } from '../../../../utils/getContrast/getContrast';

/**
 * @function YoutubeLink
 * @memberof ExcerptsDetail
 * @component
 * @description One link in the YouTube link section.
 * Created 3/10/21
 * @param {Object} props The JSX props passed to this React component.
 * @param {string[]} props.video An array, where the first index is the
 * instrument part name, and the second is the YouTube code, to be attached
 * to the end of a Youtube URL.
 * @param {string} props.type The type of YouTube link that this is. This
 * affects the color of the link button.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.3.2
 * @example
 * <YoutubeLink video={video} type="band" />
 */
export default function YoutubeLink({
  video,
  type,
}: {
  video: String[];
  type: String;
}) {
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
        const url = `https://www.youtube.com/watch?v=${video[1]}`;
        Linking.openURL(url).catch((err) => {
          console.warn(err);
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
