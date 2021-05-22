import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 * @function YoutubeSectionHeader
 * @description The header for a section of YouTube videos, with styles
 * already attached.
 * @author Alexander Burdiss
 * @since 3/10/21
 * @version 1.1.0
 * @param props The JSX props passed to this React component
 * @param {String} props.children The text to render in this header.
 * @component
 * @example
 * ```jsx
 * <YoutubeSectionHeader>Orchestra</YoutubeSectionHeader>
 * ```
 */
const YoutubeSectionHeader = ({children}) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 5,
  },
});

export default YoutubeSectionHeader;
