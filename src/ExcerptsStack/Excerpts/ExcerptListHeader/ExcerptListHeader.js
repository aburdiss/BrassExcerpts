import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../Model/Model';
import {PreferencesContext} from '../../../Model/Preferences';
import {getInstrumentsSelected} from '../../../utils/getInstrumentsSelected/getInstrumentsSelected';

/**
 * @function ExcerptListHeader
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.1.0
 *
 * @component
 * @example
 * ```jsx
 * <ExcerptListHeader />
 * ```
 */
function ExcerptListHeader() {
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  const [instrumentsSelected, setInstrumentsSelected] = useState(
    getInstrumentsSelected(state),
  );
  useEffect(
    function updateInstrumentsSelected() {
      const newInstrumentsSelected = getInstrumentsSelected(state);
      setInstrumentsSelected(newInstrumentsSelected);
    },
    [state],
  );

  /**
   * @function ExcerptListHeader~navigateToSettings
   * @description Navigates the user from the home tab to the settings tab so
   * that they can change instruments.
   * @author Alexander Burdiss
   * @since 6/11/21
   * @version 1.0.1
   */
  function navigateToSettings() {
    navigation.navigate('More');
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={navigateToSettings}
        accessibilityRole="button"
        accessibilityLabel={instrumentsSelected}
        accessibilityHint="Navigates to Settings screen change instrument">
        <SafeAreaView edges={['right', 'left']}>
          <Text style={styles.instrumentText} accessibilityRole="header">
            {instrumentsSelected}
          </Text>
          <Text accessibilityRole="text">
            Tap to change instrument selection
          </Text>
        </SafeAreaView>
      </Pressable>
    </View>
  );
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
