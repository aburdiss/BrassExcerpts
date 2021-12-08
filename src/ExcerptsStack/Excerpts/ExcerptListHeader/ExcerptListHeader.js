import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExcerptListRow from '../ExcerptListRow/ExcerptListRow';
import { PreferencesContext } from '../../../Model/Preferences';
import { getInstrumentsSelected } from '../../../utils/getInstrumentsSelected/getInstrumentsSelected';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace ExcerptListHeader
 * @function ExcerptListHeader
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.3.1
 *
 * @component
 * @example
 * <ExcerptListHeader />
 */
export default function ExcerptListHeader() {
  const colors = useColors();
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      padding: 20,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.blue,
      backgroundColor: colors.green,
    },
    descriptionText: {
      color: colors.alwaysBlack,
      textAlign: 'center',
    },
    instrumentText: {
      fontSize: 24,
      flex: 1,
      color: colors.alwaysBlack,
      textAlign: 'center',
    },
    topExcerptsButton: {
      backgroundColor: colors.background2,
    },
  });

  const navigation = useNavigation();
  const { state } = useContext(PreferencesContext);

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
   * @function ExcerptListHeader~openTopExcerptsComponent
   * @description Opens the top excerpts component
   * @author Alexander Burdiss
   * @since 3/28/21
   * @version 1.0.0
   */
  function openTopExcerptComponent() {
    navigation.navigate('Top Excerpts');
  }

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
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={navigateToSettings}
          accessibilityRole="button"
          accessibilityLabel={instrumentsSelected}
          accessibilityHint="Navigates to Settings screen change instrument"
          android_ripple={{
            color: styles.instrumentText.color,
          }}
          style={styles.button}
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
      <View style={styles.topExcerptsButton}>
        <ExcerptListRow
          composer={'Top Excerpts'}
          onPress={openTopExcerptComponent}
          color={colors.alwaysBlack}
          backgroundColor={colors.orange}
        />
      </View>
    </View>
  );
}
