import React, {useContext, useEffect, useState} from 'react';
import {View, useWindowDimensions, StyleSheet} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Pinchable from 'react-native-pinchable';

import {PreferencesContext} from '../../Model/Preferences';
import ActionButton from '../../Components/ActionButton/ActionButton';
import RandomExcerptHeader from './RandomExcertHeader/RandomExcerptHeader';
import {generateRandomExcerpt} from './generateRandomExcerpt';

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
const RandomExcerpt = () => {
  const windowWidth = useWindowDimensions().width;
  const {state} = useContext(PreferencesContext);
  const [composition, setComposition] = useState(undefined);
  const [excerptIndex, setExcerptIndex] = useState(undefined);
  const [partIndex, setPartIndex] = useState(undefined);

  useEffect(
    /**
     * @function RandomExcerpt~useEffect~updateRandomExcerpt
     * @description Updates the random excerpt that is displaying if the state
     * changes, so that a new excerpt is always present.
     * @author Alexander Burdiss
     * @since 5/4/21
     * @version 1.0.0
     */
    function updateRandomExcerpt() {
      generateRandomExcerpt(
        state,
        setComposition,
        setExcerptIndex,
        setPartIndex,
        composition,
      );
    },
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
        <Pinchable>
          <AutoHeightImage
            width={windowWidth}
            accessibilityLabel={
              composition?.excerpts[excerptIndex].pictures[partIndex][0]
            }
            source={{
              uri:
                'https://github.com/aburdiss/BrassExcerpts/raw/master/img/External/' +
                composition?.excerpts[excerptIndex].pictures[partIndex][1],
            }}
          />
        </Pinchable>
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
