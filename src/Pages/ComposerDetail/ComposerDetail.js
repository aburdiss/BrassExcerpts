import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

import SectionHeading from '../../Components/SectionHeading/SectionHeading';
import CompositionSection from './CompositionSection/CompositionSection';
import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import ResourcesSection from './ResourcesSection/ResourcesSection';
import { composers as hornComposers } from '../../Model/Excerpts/HornExcerpts';
import { composers as trumpetComposers } from '../../Model/Excerpts/TrumpetExcerpts';
import { composers as tromboneComposers } from '../../Model/Excerpts/TromboneExcerpts';
import { composers as tubaComposers } from '../../Model/Excerpts/TubaExcerpts';
import { PreferencesContext } from '../../Model/Preferences';
import { getNumberOfInstruments } from '../../utils/getNumberOfInstruments/getNumberOfInstruments';
import { useIdleScreen } from '../../utils/customHooks/useIdleScreen/useIdleScreen';
import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @namespace ComposerDetail
 */

/**
 * @function ComposerDetail
 * @memberof ComposerDetail
 * @component
 * @description A listing of one composer, and the exerpts for the different
 * instruments available for that composer.
 * Created 3/3/21
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.2
 * @example
 * <ComposerDetail />
 */
export default function ComposerDetail() {
  const colors = useColors();
  const styles = StyleSheet.create({
    bio: {
      padding: 20,
      color: colors.text,
    },
    card: {
      margin: 20,
      backgroundColor: colors.green,
      alignItems: 'center',
      shadowColor: colors.text,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
      borderRadius: 4,
    },
    cardBottom: {
      backgroundColor: colors.textInverse,
      width: '100%',
      borderRadius: 4,
    },
    cardImageBottom: {
      backgroundColor: colors.green,
      padding: 10,
    },
    cardImageTop: {
      backgroundColor: colors.green,
      width: '100%',
      padding: 10,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardImageTopText: {
      fontWeight: 'bold',
      color: colors.alwaysBlack,
    },
    container: {
      paddingBottom: 50,
      backgroundColor: colors.background,
    },
    image: {
      aspectRatio: 1,
      height: 200,
    },
    linearGradient: {
      width: '100%',
      alignItems: 'center',
    },
  });

  useIdleScreen();
  const route = useRoute();
  const composer = route.params;
  const { state } = useContext(PreferencesContext);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={['left', 'right']}>
        <View style={styles.card}>
          <View style={styles.cardImageTop}>
            <Text
              accessibilityRole="text"
              style={styles.cardImageTopText}
              maxFontSizeMultiplier={1.4}
            >
              /{composer.ipa}/
            </Text>
            <Text
              accessibilityRole="text"
              style={styles.cardImageTopText}
              maxFontSizeMultiplier={1.4}
            >
              {composer.dates}
            </Text>
          </View>
          <View style={styles.linearGradient}>
            <Image
              source={composer.image}
              style={styles.image}
              accessibilityRole="image"
              accessibilityLabel={'A picture of ' + composer.name}
            />
          </View>
          <View style={styles.cardBottom}>
            <View style={styles.cardImageBottom}>
              <MetaLabel
                label="Country"
                data={composer.country}
                color={colors.alwaysBlack}
              />
            </View>
            <Text
              accessibilityRole="text"
              style={styles.bio}
              maxFontSizeMultiplier={1.8}
            >
              {composer.bio}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      {state?.horn && hornComposers[composer.slug] ? (
        <View>
          {getNumberOfInstruments(state) > 1 && (
            <SafeAreaView edges={['right', 'left']}>
              <SectionHeading>Horn</SectionHeading>
            </SafeAreaView>
          )}
          <CompositionSection
            excerpts={hornComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      {state?.trumpet && trumpetComposers[composer.slug] ? (
        <View>
          {getNumberOfInstruments(state) > 1 && (
            <SafeAreaView edges={['right', 'left']}>
              <SectionHeading>Trumpet</SectionHeading>
            </SafeAreaView>
          )}
          <CompositionSection
            excerpts={trumpetComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      {state?.trombone && tromboneComposers[composer.slug] ? (
        <View>
          {getNumberOfInstruments(state) > 1 && (
            <SafeAreaView edges={['right', 'left']}>
              <SectionHeading>Trombone</SectionHeading>
            </SafeAreaView>
          )}
          <CompositionSection
            excerpts={tromboneComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      {state?.tuba && tubaComposers[composer.slug] ? (
        <View>
          {getNumberOfInstruments(state) > 1 && (
            <SafeAreaView edges={['right', 'left']}>
              <SectionHeading>Tuba</SectionHeading>
            </SafeAreaView>
          )}
          <CompositionSection
            excerpts={tubaComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      <ResourcesSection data={composer.imslp} />
    </ScrollView>
  );
}
