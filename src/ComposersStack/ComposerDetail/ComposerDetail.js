import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/core';

import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import {composers as hornComposers} from '../../Model/Excerpts/HornExcerpts';
import {composers as trumpetComposers} from '../../Model/Excerpts/TrumpetExcerpts';
import {composers as tromboneComposers} from '../../Model/Excerpts/TromboneExcerpts';
import {composers as tubaComposers} from '../../Model/Excerpts/TubaExcerpts';
import CompositionSectionHeader from './CompositionSectionHeader';
import CompositionSection from './CompositionSection';
import {colors} from '../../Model/Model';

/**
 * @todo Style this component.
 * @todo Make chevrons green accent color.
 */
const ComposerDetail = () => {
  const route = useRoute();
  const composer = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardImageTop}>
          <Text style={styles.cardImageTopText}>/{composer.ipa}/</Text>
          <Text style={styles.cardImageTopText}>{composer.dates}</Text>
        </View>
        <LinearGradient
          colors={[colors.blueLight, colors.greenLight]}
          style={{width: '100%', alignItems: 'center'}}>
          <Image source={composer.image} style={styles.image} />
        </LinearGradient>
        <View style={styles.cardBottom}>
          <View style={styles.cardImageBottom}>
            <MetaLabel label="Country" data={composer.country} />
          </View>
          <Text style={styles.bio}>{composer.bio}</Text>
        </View>
      </View>
      {hornComposers[composer.slug] ? (
        <View>
          <CompositionSectionHeader>Horn</CompositionSectionHeader>
          <CompositionSection
            excerpts={hornComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      {trumpetComposers[composer.slug] ? (
        <View>
          <CompositionSectionHeader>Trumpet</CompositionSectionHeader>
          <CompositionSection
            excerpts={trumpetComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      {tromboneComposers[composer.slug] ? (
        <View>
          <CompositionSectionHeader>Trombone</CompositionSectionHeader>
          <CompositionSection
            excerpts={tromboneComposers[composer.slug].excerpts}
          />
        </View>
      ) : null}
      {tubaComposers[composer.slug] ? (
        <View>
          <CompositionSectionHeader>Tuba</CompositionSectionHeader>
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
  cardImageTopText: {fontWeight: 'bold'},
  container: {},
  image: {
    aspectRatio: 1,
    height: 200,
  },
});

export default ComposerDetail;
