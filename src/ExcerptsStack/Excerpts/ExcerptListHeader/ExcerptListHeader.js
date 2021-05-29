import React, {useContext} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../Model/Model';
import {PreferencesContext} from '../../../Model/Preferences';
import {getInstrumentsSelected} from '../../../utils/getInstrumentsSelected/getInstrumentsSelected';

/**
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.0.1
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
        <SafeAreaView edges={['right', 'left']}>
          <Text style={styles.instrumentText}>
            {getInstrumentsSelected(state)}
          </Text>
          <Text>Tap to change instrument selection</Text>
        </SafeAreaView>
      </Pressable>
    </View>
  );
};

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
