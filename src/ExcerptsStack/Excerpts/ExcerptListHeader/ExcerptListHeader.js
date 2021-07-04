import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../../Model/Model';
import { PreferencesContext } from '../../../Model/Preferences';
import { getInstrumentsSelected } from '../../../utils/getInstrumentsSelected/getInstrumentsSelected';
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
  DynamicValue,
} from 'react-native-dynamic';

/**
 * @function ExcerptListHeader
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.2.1
 *
 * @component
 * @example
 * ```jsx
 * <ExcerptListHeader />
 * ```
 */
function ExcerptListHeader() {
  const navigation = useNavigation();
  const { state } = useContext(PreferencesContext);
  const styles = useDynamicStyleSheet(dynamicStyles);

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
        accessibilityHint="Navigates to Settings screen change instrument"
        android_ripple={{
          color: styles.instrumentText.color,
        }}
      >
        <SafeAreaView edges={['right', 'left']}>
          <Text
            style={styles.instrumentText}
            accessibilityRole="header"
            maxFontSizeMultiplier={1.8}
          >
            {instrumentsSelected}
          </Text>
          <Text
            accessibilityRole="text"
            style={styles.descriptionText}
            maxFontSizeMultiplier={2.4}
          >
            Tap to change instrument selection
          </Text>
        </SafeAreaView>
      </Pressable>
    </View>
  );
}

const dynamicStyles = new DynamicStyleSheet({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(colors.blueLight, colors.blueDark),
    backgroundColor: new DynamicValue(colors.greenLight, colors.greenDark),
  },
  descriptionText: {
    color: new DynamicValue(colors.black, colors.black),
  },
  instrumentText: {
    fontSize: 24,
    flex: 1,
    color: new DynamicValue(colors.black, colors.black),
  },
});

export default ExcerptListHeader;
