import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Pressable, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PreferencesContext} from '../../Model/Preferences';
import ActionButton from '../../Components/ActionButton/ActionButton';
import RandomExcerptHeader from './RandomExcertHeader/RandomExcerptHeader';
import {generateRandomExcerpt} from './generateRandomExcerpt';
import {StyleSheet} from 'react-native';
import {colors} from '../../Model/Model';

/**
 * @todo Implement Pull to refresh
 *
 * @description Displays a random excerpt based on the settings the user has
 * chosen.
 * @author Alexander Burdiss
 * @since 5/3/21
 * @version 1.0.0
 * @component
 * @example
 * ```jsx
 * <RandomExcerpt />
 * ```
 */
const RandomExcerpt = (props) => {
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(
    function updateScreenWidth() {
      const {width} = Dimensions.get('window');
      setScreenWidth(width);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Dimensions],
  );
  const {state} = useContext(PreferencesContext);
  const [composition, setComposition] = useState(undefined);
  const [excerptIndex, setExcerptIndex] = useState(undefined);
  const [partIndex, setPartIndex] = useState(undefined);

  useEffect(
    () =>
      generateRandomExcerpt(
        state,
        setComposition,
        setExcerptIndex,
        setPartIndex,
        composition,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return (
    <View style={styles.randomExcerptContainer}>
      <View style={styles.excerptContainer}>
        <RandomExcerptHeader
          composition={composition}
          excerptIndex={excerptIndex}
          partIndex={partIndex}
        />
        <AutoHeightImage
          width={screenWidth}
          accessibilityLabel={
            composition?.excerpts[excerptIndex].pictures[partIndex][0]
          }
          source={{
            uri:
              'https://github.com/aburdiss/BrassExcerpts/raw/master/img/External/' +
              composition?.excerpts[excerptIndex].pictures[partIndex][1],
          }}
        />
      </View>
      <View style={styles.actionButtonContainer}>
        <ActionButton
          onPress={() =>
            generateRandomExcerpt(
              state,
              setComposition,
              setExcerptIndex,
              setPartIndex,
              composition,
            )
          }>
          Randomize
        </ActionButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    paddingHorizontal: 10,
  },
  excerptContainer: {
    flex: 1,
  },
  randomExcerptContainer: {
    flex: 1,
  },
});

export default RandomExcerpt;
