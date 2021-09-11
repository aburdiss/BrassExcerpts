import React from 'react';
import {
  Pressable,
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace RandomExcerptHeader
 * @function RandomExcerptHeader
 * @description The header information to display on the Random Excerpt screen.
 * @param props The JSX props passed to this React Component
 * @param {Object} props.composition The data object for the composition that
 * is being displayed
 * @param {Number} props.excerptIndex The index of the excerpt that has been
 * randomly chosen
 * @param {Number} props.partIndex The index of the part that has been
 * randomly chosen
 * @author Alexander Burdiss
 * @since 5/8/21
 * @version 1.3.0
 */
export default function RandomExcerptHeader({
  composition,
  excerptIndex,
  partIndex,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    composer: {
      fontStyle: 'italic',
      color: colors.text,
    },
    composerInstrumentWrapper: {
      justifyContent: 'center',
    },
    composerInstrumentButtonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    composition: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      maxWidth: '50%',
      color: colors.text,
    },
    compositionPressable: {
      borderColor: colors.green,
      borderWidth: 1,
      borderRadius: 8,
      padding: 8,
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '50%',
    },
    excerptDetail: {
      flexWrap: 'wrap',
      textAlign: 'right',
      color: colors.text,
    },
    excerptDetailContainer: {
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      flexShrink: 1,
      paddingLeft: 20,
      textAlign: 'right',
      maxWidth: '50%',
    },
    excerptTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 10,
    },
    instrument: {
      color: colors.text,
    },
    pressableText: {
      color: colors.green,
      fontWeight: 'bold',
      flexWrap: 'wrap',
    },
    pressableTextContainer: { flexDirection: 'row' },
  });
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;

  return (
    <View>
      <View style={styles.excerptTitleContainer}>
        <Text style={styles.composition} maxFontSizeMultiplier={1.4}>
          {composition?.name}
        </Text>
        <View style={styles.excerptDetailContainer}>
          <Text style={styles.excerptDetail} maxFontSizeMultiplier={1.6}>
            {composition?.excerpts[excerptIndex]?.description}
          </Text>
          <Text style={styles.excerptDetail} maxFontSizeMultiplier={1.6}>
            {composition?.excerpts[excerptIndex]?.measures}
          </Text>
        </View>
      </View>
      <View style={styles.composerInstrumentButtonWrapper}>
        <View style={styles.composerInstrumentWrapper}>
          <Text style={styles.composer} maxFontSizeMultiplier={1.4}>
            {composition?.composer}
          </Text>
          <Text style={styles.instrument} maxFontSizeMultiplier={1.4}>
            {composition?.excerpts[excerptIndex]?.pictures[partIndex][0]}
          </Text>
        </View>
        <Pressable
          accessible
          accessibilityRole="button"
          accessibilityLabel="View Full Excerpt"
          accessibilityHint={'Navigates to Excerpt page ' + composition?.name}
          android_ripple={{
            color: styles.pressableText.color,
          }}
          style={styles.compositionPressable}
          onPress={() => {
            navigation.navigate('Excerpt Detail', composition);
          }}
        >
          <View style={styles.pressableTextContainer}>
            <Text style={styles.pressableText} maxFontSizeMultiplier={1.4}>
              View Full Excerpt
            </Text>
          </View>
          {windowWidth > 330 && (
            <Ionicons
              name="chevron-forward"
              color={colors.greenLight}
              size={24}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}
