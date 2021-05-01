import React, {useContext} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {colors} from '../../../Model/Model';
import {PreferencesContext} from '../../../Model/Preferences';

/**
 * @todo Style this component.
 *
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.0.0
 *
 * @component
 * @example
 * ```jsx
 * <ExcerptListHeader />
 * ```
 */
const ExcerptListHeader = () => {
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  function navigateToSettings() {
    navigation.navigate('More');
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={navigateToSettings}>
        <Text style={styles.instrumentText}>
          {getInstrumentsSelected(state)}
        </Text>
        <Text>Tap to change instrument selection</Text>
      </Pressable>
    </View>
  );
};

function getInstrumentsSelected(state) {
  if (state) {
    let instruments = [];
    if (state.horn) {
      instruments.push('Horn');
    }
    if (state.trumpet) {
      instruments.push('Trumpet');
    }
    if (state.trombone) {
      instruments.push('Trombone');
    }
    if (state.tuba) {
      instruments.push('Tuba');
    }
    let string = instruments.join(', ');
    return string;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.blueLight,
    backgroundColor: colors.greenLight,
  },
  instrumentText: {
    fontSize: 24,
    flex: 1,
  },
});

export default ExcerptListHeader;
