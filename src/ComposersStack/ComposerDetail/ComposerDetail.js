import React, { useContext } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDarkMode,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import CompositionSection from './CompositionSection/CompositionSection';
import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import { composers as hornComposers } from '../../Model/Excerpts/HornExcerpts';
import { composers as trumpetComposers } from '../../Model/Excerpts/TrumpetExcerpts';
import { composers as tromboneComposers } from '../../Model/Excerpts/TromboneExcerpts';
import { composers as tubaComposers } from '../../Model/Excerpts/TubaExcerpts';
import { colors } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { getNumberOfInstruments } from '../../utils/getNumberOfInstruments/getNumberOfInstruments';

/**
 * @function ComposerDetail
 * @description A listing of one composer, and the exerpts for the different
 * instruments available for that composer.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.0.1
 * @component
 * @example
 * ```jsx
 * <ComposerDetail />
 * ```
 */
const ComposerDetail = () => {
  const route = useRoute();
  const composer = route.params;
  const { state } = useContext(PreferencesContext);
  const styles = useDynamicStyleSheet(dynamicStyles);
  const DARKMODE = useDarkMode();

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
          <LinearGradient
            colors={[
              DARKMODE ? colors.blueDark : colors.blueLight,
              DARKMODE ? colors.greenDark : colors.greenLight,
            ]}
            style={styles.linearGradient}
          >
            <Image
              source={composer.image}
              style={styles.image}
              accessibilityRole="image"
              accessibilityLabel={'A picture of ' + composer.name}
            />
          </LinearGradient>
          <View style={styles.cardBottom}>
            <View style={styles.cardImageBottom}>
              <MetaLabel label="Country" data={composer.country} />
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
              <SectionHeader>Horn</SectionHeader>
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
              <SectionHeader>Trumpet</SectionHeader>
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
              <SectionHeader>Trombone</SectionHeader>
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
              <SectionHeader>Tuba</SectionHeader>
            </SafeAreaView>
          )}
          <CompositionSection
            excerpts={tubaComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  bio: {
    padding: 20,
    color: new DynamicValue(colors.black, colors.white),
  },
  card: {
    margin: 20,
    backgroundColor: new DynamicValue(colors.blueLight, colors.blueDark),
    alignItems: 'center',
    shadowColor: new DynamicValue(colors.black, colors.white),
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
    backgroundColor: new DynamicValue(colors.white, colors.black),
    width: '100%',
    borderRadius: 4,
  },
  cardImageBottom: {
    backgroundColor: new DynamicValue(colors.greenLight, colors.greenDark),
    padding: 10,
  },
  cardImageTop: {
    backgroundColor: new DynamicValue(colors.blueLight, colors.blueDark),
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImageTopText: {
    fontWeight: 'bold',
    color: new DynamicValue(colors.black, colors.white),
  },
  container: {
    paddingBottom: 50,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
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

export default ComposerDetail;
