import React from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {useRoute} from '@react-navigation/core';

/**
 * @function ImageDetail
 * @description Displays one image horizontally, with a scrollview letting you
 * scroll all the way to the bottom of the image.
 * @author Alexander Burdiss
 * @since 5/21/21
 * @version 1.0.0
 * @component
 * @example
 * ```jsx
 * <ImageDetail />
 * ```
 */
export default function ImageDetail() {
  const route = useRoute();

  return (
    <ScrollView style={styles.imageDetailContainer} horizontal>
      <View style={styles.imageRotateContainer}>
        <View style={styles.imageContainer}>
          <AutoHeightImage
            source={{uri: route.params.url}}
            width={Dimensions.get('window').height - 180}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageRotateContainer: {
    transform: [{rotate: '270deg'}],
    flexShrink: 1,
  },
  imageContainer: {
    flexShrink: 1,
    marginTop: 10,
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageDetailContainer: {
    flexShrink: 1,
  },
});
