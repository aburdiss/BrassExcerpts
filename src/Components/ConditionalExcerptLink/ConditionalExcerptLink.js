import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { capitalize } from '../../utils/captiatlize/capitalize';
import { isFavorite } from '../../utils/isFavorite/isFavorite';
import { getExcerptData } from '../../utils/getExcerptData/getExcerptData';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import { getInstrumentsSelected } from '../../utils/getInstrumentsSelected/getInstrumentsSelected';

/**
 * @namespace ConditionalExcerptLink
 * @function ConditionalExcerptLink
 * @author Alexander Burdiss
 * @since 09/25/21
 * @version 1.0.0
 * @component
 */
export default function ConditionalExcerptLink({
  instrument,
  excerpt,
  index,
  state,
  navigateToExcerptDetail,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    buttonBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.systemGray5,
    },
    excerptButton: {
      marginLeft: 20,
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
    excerptLink: {
      color: colors.green,
      width: '85%',
      paddingVertical: 13,
    },
    forwardIcon: {
      paddingRight: 5,
    },
    iconContainer: {
      flexDirection: 'row',
      width: '20%',
      justifyContent: 'flex-end',
    },
  });

  const borderTop = index != 0 ? styles.buttonBorder : null;
  const activeInstruments = getInstrumentsSelected(state);
  const instrumentActive = activeInstruments.includes(capitalize(instrument));
  const excerptData = getExcerptData(instrument, excerpt);

  if (excerptData && instrumentActive) {
    return (
      <SafeAreaView edges={['left']} key={index}>
        <Pressable
          accessible
          accessibilityRole="button"
          accessibilityLabel={excerptData.composerLast + ' ' + excerptData.name}
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
            navigateToExcerptDetail(excerptData);
          }}
        >
          <Text style={styles.excerptLink}>
            <Text maxFontSizeMultiplier={1.8}>
              {excerptData.composerLast} -{' '}
            </Text>
            <Text maxFontSizeMultiplier={1.8}>{excerptData.name}</Text>
          </Text>
          <SafeAreaView style={styles.iconContainer} edges={['right']}>
            {isFavorite(state, excerptData.composerLast, excerptData.name) && (
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
  } else if (excerptData && !instrumentActive) {
    return (
      <SafeAreaView key={index} edges={['left']}>
        <View
          accessibilityRole="text"
          style={[styles.excerptButton, borderTop]}
        >
          <Text style={styles.excerptName}>
            <Text maxFontSizeMultiplier={1.8}>
              {excerptData.composerLast} -{' '}
            </Text>
            <Text maxFontSizeMultiplier={1.8}>{excerptData.name}</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView key={index} edges={['left']}>
        <View
          accessibilityRole="text"
          style={[styles.excerptButton, borderTop]}
        >
          <Text style={styles.excerptName} maxFontSizeMultiplier={1.8}>
            {excerpt}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
