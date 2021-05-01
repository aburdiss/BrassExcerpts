import React, {useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {capitalize} from 'underscore.string';

import {colors} from '../../../Model/Model';

import {PreferencesContext} from '../../../Model/Preferences';
import {getNumberOfInstruments} from '../../../utils/getNumberOfInstruments/getNumberOfInstruments';
import ExcerptCollapsible from '../ExcerptCollapsible/ExcerptCollapsible';

const ExcerptSection = ({
  instrumentExcerpt,
  instrumentName,
  addToFavorites,
  shouldStartCollapsed,
  item,
}) => {
  const {state} = useContext(PreferencesContext);

  return instrumentExcerpt ? (
    <View style={styles.instrumentExcerptContainer}>
      {getNumberOfInstruments(state) > 1 && (
        <View style={styles.instrumentHeadingContainer}>
          <Text style={styles.instrumentHeading}>
            {capitalize(instrumentName)}
          </Text>
          <Pressable
            onPress={() => {
              addToFavorites(instrumentName);
            }}>
            <Ionicons
              name={
                state.favorites.includes(
                  instrumentName + item.composerLast + item.name,
                )
                  ? 'heart'
                  : 'heart-outline'
              }
              size={32}
              color={
                state.favorites.includes(
                  instrumentName + item.composerLast + item.name,
                )
                  ? colors.redLight
                  : colors.greenLight
              }
            />
          </Pressable>
        </View>
      )}
      {instrumentExcerpt.excerpts.map((excerpt, index) => (
        <ExcerptCollapsible
          excerpt={excerpt}
          key={excerpt.id}
          index={index}
          startCollapsed={shouldStartCollapsed()}
        />
      ))}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  instrumentExcerptContainer: {
    borderTopColor: colors.greenDark,
    borderTopWidth: 2,
    marginTop: 10,
    paddingTop: 0,
  },
  instrumentHeading: {
    fontSize: 28,
  },
  instrumentHeadingContainer: {
    backgroundColor: colors.systemGray4Light,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExcerptSection;
