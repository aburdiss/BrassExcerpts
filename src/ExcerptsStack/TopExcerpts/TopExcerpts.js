import React, { useState, useRef, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PreferencesContext } from '../../Model/Preferences';
import { isFavorite } from '../../utils/isFavorite/isFavorite';
import { getExcerptData } from '../../utils/getExcerptData/getExcerptData';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import { useTheme } from '../../utils/CustomHooks/useTheme/useTheme';
import { getTopExcerpts } from '../../utils/getTopExcerpts/getTopExcerpts';

/**
 * @function TopExcerpts
 * @description The top asked for excerpts for each instrument in the app.
 * @author Alexander Burdiss
 * @since 9/18/21
 * @version 1.0.0
 * @component
 * @example
 * <TopExcerpts />
 */
const TopExcerpts = () => {
  const colors = useColors();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    segmentedControlContainer: {
      paddingHorizontal: 8,
      paddingTop: 10,
    },
    topContainer: {
      paddingHorizontal: 2,
    },
  });

  const possibleInstruments = ['Horn', 'Trumpet', 'Trombone', 'Tuba'];

  const scrollViewRef = useRef();
  const [instrumentIndex, setInstrumentIndex] = useState(0);
  const { state } = useContext(PreferencesContext);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['left', 'right']} style={styles.topContainer}>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            accessibilityRole="menu"
            accessibilityValue={{ now: possibleInstruments[instrumentIndex] }}
            values={possibleInstruments}
            selectedIndex={instrumentIndex}
            appearance={
              theme == 'dark' || theme == 'dracula' ? 'dark' : 'light'
            }
            onChange={(event) => {
              scrollViewRef.current.scrollTo({ x: 0, y: 0 });
              setInstrumentIndex(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
      </SafeAreaView>
      <ScrollView style={styles.contentContainer} ref={scrollViewRef}>
        {getTopExcerpts(possibleInstruments[instrumentIndex]).map(
          (excerpt, index) => {
            const borderTop = index != 0 ? styles.buttonBorder : null;
            const excerptData = getExcerptData(
              ['horn', 'trumpet', 'trombone', 'tuba'][instrumentIndex],
              excerpt.name,
            );

            if (excerptData) {
              return (
                <SafeAreaView edges={['left']} key={index}>
                  <Pressable
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={
                      excerptData.composerLast + ' ' + excerptData.name
                    }
                    accessibilityHint={
                      'Navigates to excerpt ' +
                      excerptData.composerLast +
                      ' ' +
                      excerptData.name
                    }
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                      ...styles.excerptButton,
                      ...borderTop,
                    })}
                    onPress={() => {
                      // navigateToExcerptDetailPage(excerptData);
                    }}
                  >
                    <Text style={styles.excerptLink}>
                      <Text maxFontSizeMultiplier={1.8}>
                        {excerptData.composerLast} -{' '}
                      </Text>
                      <Text maxFontSizeMultiplier={1.8}>
                        {excerptData.name}
                      </Text>
                    </Text>
                    <SafeAreaView
                      style={styles.iconContainer}
                      edges={['right']}
                    >
                      {isFavorite(
                        {
                          ...state,
                          horn: instrumentIndex == 0,
                          trumpet: instrumentIndex == 1,
                          trombone: instrumentIndex == 2,
                          tuba: instrumentIndex == 3,
                        },
                        excerptData.composerLast,
                        excerptData.name,
                      ) && (
                        <Ionicons
                          name="heart"
                          size={24}
                          color={colors.red}
                          style={styles.favoriteIcon}
                        />
                      )}
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={colors.green}
                        style={styles.forwardIcon}
                      />
                    </SafeAreaView>
                  </Pressable>
                </SafeAreaView>
              );
            } else {
              return (
                <SafeAreaView key={index} edges={['left']}>
                  <View
                    accessibilityRole="text"
                    style={[styles.excerptButton, borderTop]}
                  >
                    <Text
                      style={styles.excerptName}
                      maxFontSizeMultiplier={1.8}
                    >
                      {excerpt.name}
                    </Text>
                  </View>
                </SafeAreaView>
              );
            }
          },
        )}
        ; })}
      </ScrollView>
    </View>
  );
};

export default TopExcerpts;
