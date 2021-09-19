import React, { useRef, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PreferencesContext } from '../../Model/Preferences';
import { isFavorite } from '../../utils/isFavorite/isFavorite';
import { getExcerptData } from '../../utils/getExcerptData/getExcerptData';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import { useTheme } from '../../utils/CustomHooks/useTheme/useTheme';
import { useTopExcerpts } from '../../utils/CustomHooks/useTopExcerpts/useTopExcerpts';

/**
 * @function TopExcerpts
 * @description The top asked for excerpts for each instrument in the app.
 * @author Alexander Burdiss
 * @since 9/18/21
 * @version 1.1.0
 * @component
 * @example
 * <TopExcerpts />
 */
const TopExcerpts = () => {
  const colors = useColors();
  const theme = useTheme();
  const styles = StyleSheet.create({
    buttonBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.systemGray5,
    },
    container: {
      height: '100%',
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
      paddingBottom: 10,
    },
    count: {
      textAlign: 'center',
      color: colors.text,
    },
    countContainer: {
      width: '18%',
      backgroundColor: colors.background,
      padding: 8,
      marginHorizontal: 10,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.systemGray5,
    },
    countHeader: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    countHeaderContainer: {
      width: '20%',
    },
    disclaimerText: {
      color: colors.text,
      textAlign: 'center',
      padding: 20,
    },
    excerptButton: {
      paddingRight: 20,
      minHeight: 45,
      backgroundColor: colors.background2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    excerptName: {
      color: colors.text,
    },
    excerptNotButton: {
      paddingRight: 20,
      minHeight: 45,
      backgroundColor: colors.background2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    excerptLink: {
      color: colors.green,
      width: '67%',
      paddingVertical: 13,
    },
    forwardIcon: {
      paddingRight: 5,
    },
    iconContainer: {
      flexDirection: 'row',
      width: '15%',
      justifyContent: 'flex-end',
    },
    listHeader: {
      paddingHorizontal: 20,
      minHeight: 45,
      backgroundColor: colors.background2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.systemGray5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    segmentedControlContainer: {
      padding: 10,
    },
    topContainer: {
      paddingHorizontal: 2,
    },
  });

  const possibleInstruments = ['Horn', 'Trumpet', 'Trombone', 'Tuba'];

  const scrollViewRef = useRef();
  const { state, dispatch } = useContext(PreferencesContext);

  const topExcerpts = useTopExcerpts(possibleInstruments[state.jobsIndex]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['left', 'right']} style={styles.topContainer}>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            accessibilityRole="menu"
            accessibilityValue={{ now: possibleInstruments[state.jobsIndex] }}
            values={possibleInstruments}
            selectedIndex={state.jobsIndex}
            appearance={
              theme == 'dark' || theme == 'dracula' ? 'dark' : 'light'
            }
            onChange={(event) => {
              scrollViewRef.current.scrollTo({ x: 0, y: 0 });
              dispatch({
                type: 'SET_SETTING',
                payload: { jobsIndex: event.nativeEvent.selectedSegmentIndex },
              });
            }}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView edges={['left']}>
        <View accessibilityRole="text" style={styles.listHeader}>
          <View style={styles.countHeaderContainer}>
            <Text maxFontSizeMultiplier={1.8} style={styles.countHeader}>
              Count
            </Text>
          </View>
          <Text style={styles.countHeader} maxFontSizeMultiplier={1.8}>
            Excerpt
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.contentContainer} ref={scrollViewRef}>
        {topExcerpts &&
          topExcerpts.map((excerpt, index) => {
            const borderTop = index != 0 ? styles.buttonBorder : null;
            const excerptData = getExcerptData(
              ['horn', 'trumpet', 'trombone', 'tuba'][state.jobsIndex],
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
                    <View style={styles.countContainer}>
                      <Text maxFontSizeMultiplier={1.8} style={styles.count}>
                        {excerpt.count}
                      </Text>
                    </View>
                    <Text style={styles.excerptLink}>
                      <Text maxFontSizeMultiplier={1.8}>
                        {excerptData.composerLast}
                        {' - '}
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
                          horn: state.jobsIndex == 0,
                          trumpet: state.jobsIndex == 1,
                          trombone: state.jobsIndex == 2,
                          tuba: state.jobsIndex == 3,
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
                    style={[styles.excerptNotButton, borderTop]}
                  >
                    <View style={styles.countContainer}>
                      <Text maxFontSizeMultiplier={1.8} style={styles.count}>
                        {excerpt.count}
                      </Text>
                    </View>
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
          })}
        <Text style={styles.disclaimerText}>
          Excerpt Counts are drawn from all of the current and past auditions
          available in this app.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TopExcerpts;
