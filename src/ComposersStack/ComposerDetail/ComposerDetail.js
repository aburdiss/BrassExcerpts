import React, {useContext} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

import SectionHeader from '../../Components/SectionHeader/SectionHeader';
import CompositionSection from './CompositionSection/CompositionSection';
import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import {composers as hornComposers} from '../../Model/Excerpts/HornExcerpts';
import {composers as trumpetComposers} from '../../Model/Excerpts/TrumpetExcerpts';
import {composers as tromboneComposers} from '../../Model/Excerpts/TromboneExcerpts';
import {composers as tubaComposers} from '../../Model/Excerpts/TubaExcerpts';
import {colors} from '../../Model/Model';
import {PreferencesContext} from '../../Model/Preferences';
import {getNumberOfInstruments} from '../../utils/getNumberOfInstruments/getNumberOfInstruments';

/**
 * @function ComposerDetail
 * @description A listing of one composer, and the exerpts for the different
 * instruments available for that composer.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.0.0
 * @component
 * @example
 * ```jsx
 * <ComposerDetail />
 * ```
 */
const ComposerDetail = () => {
  const route = useRoute();
  const composer = route.params;
  const {state} = useContext(PreferencesContext);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={['left', 'right']}>
        <View style={styles.card}>
          <View style={styles.cardImageTop}>
            <Text style={styles.cardImageTopText}>/{composer.ipa}/</Text>
            <Text style={styles.cardImageTopText}>{composer.dates}</Text>
          </View>
          <LinearGradient
            colors={[colors.blueLight, colors.greenLight]}
            style={styles.linearGradient}>
            <Image source={composer.image} style={styles.image} />
          </LinearGradient>
          <View style={styles.cardBottom}>
            <View style={styles.cardImageBottom}>
              <MetaLabel label="Country" data={composer.country} />
            </View>
            <Text style={styles.bio}>{composer.bio}</Text>
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

const styles = StyleSheet.create({
  bio: {
    padding: 20,
  },
  card: {
    margin: 20,
    backgroundColor: colors.blueLight,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 4,
  },
  cardImageBottom: {
    backgroundColor: colors.greenLight,
    padding: 10,
  },
  cardImageTop: {
    backgroundColor: colors.blueLight,
    width: '100%',
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardImageTopText: {
    fontWeight: 'bold',
  },
  container: {
    paddingBottom: 50,
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
