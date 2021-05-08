import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StyleSheet} from 'react-native';
import {colors} from '../../../Model/Model';
import {useNavigation} from '@react-navigation/core';

/**
 *
 * @param props The JSX props passed to this React Component
 */
const RandomExcerptHeader = ({composition, excerptIndex, partIndex}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.excerptTitleContainer}>
        <Text style={styles.composition}>{composition?.name}</Text>
        <View style={styles.excerptDetailContainer}>
          <Text style={styles.excerptDetail}>
            {composition?.excerpts[excerptIndex]?.description}
          </Text>
          <Text style={styles.excerptDetail}>
            {composition?.excerpts[excerptIndex]?.measures}
          </Text>
        </View>
      </View>
      <View style={styles.composerInstrumentButtonWrapper}>
        <View style={styles.composerInstrumentWrapper}>
          <Text style={styles.composer}>{composition?.composer}</Text>
          <Text style={styles.instrument}>
            {composition?.excerpts[excerptIndex]?.pictures[partIndex][0]}
          </Text>
        </View>
        <Pressable
          style={styles.compositionPressable}
          onPress={() => {
            navigation.navigate('Excerpt Detail', composition);
          }}>
          <View>
            <Text style={styles.pressableText}>View Full Excerpt</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            color={colors.greenLight}
            size={24}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  composer: {
    fontStyle: 'italic',
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
  },
  compositionPressable: {
    borderColor: colors.greenLight,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  excerptDetail: {
    flexWrap: 'wrap',
    textAlign: 'right',
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
  pressableText: {
    color: colors.greenLight,
    fontWeight: 'bold',
  },
});

export default RandomExcerptHeader;