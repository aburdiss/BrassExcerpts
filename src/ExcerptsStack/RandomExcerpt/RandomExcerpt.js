import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AutoHeightImage from 'react-native-auto-height-image';
import Pinchable from 'react-native-pinchable';

import { PreferencesContext } from '../../Model/Preferences';
import { generateRandomExcerpt } from './utils/generateRandomExcerpt/generateRandomExcerpt';
import { useIdleScreen } from '../../utils/CustomHooks/useIdleScreen/useIdleScreen';

import ActionButton from '../../Components/ActionButton/ActionButton';
import RandomExcerptHeader from './RandomExcertHeader/RandomExcerptHeader';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace RandomExcerpt
 * @function RandomExcerpt
 * @description Displays a random excerpt based on the settings the user has
 * chosen.
 * @author Alexander Burdiss
 * @since 5/3/21
 * @version 1.3.0
 * @component
 * @example
 * <RandomExcerpt />
 */
export default function RandomExcerpt() {
  const colors = useColors();
  const styles = StyleSheet.create({
    actionButtonContainer: {
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    excerptContainer: {
      flex: 1,
    },
    randomExcerptContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

  useIdleScreen();
  const windowWidth = useWindowDimensions().width;
  const windowInsets = useSafeAreaInsets();
  const { state } = useContext(PreferencesContext);
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
    <ScrollView style={styles.randomExcerptContainer}>
      <SafeAreaView style={styles.excerptContainer} edges={['left', 'right']}>
        <RandomExcerptHeader
          composition={composition}
          excerptIndex={excerptIndex}
          partIndex={partIndex}
        />
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
            }
          >
            Randomize
          </ActionButton>
        </View>
        <Pinchable>
          <AutoHeightImage
            width={windowWidth - windowInsets.right - windowInsets.left}
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
      </SafeAreaView>
    </ScrollView>
  );
}
