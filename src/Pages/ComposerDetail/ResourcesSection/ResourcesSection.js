import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainHeading from '../../../Components/MainHeading/MainHeading';
import ActionButton from '../../../Components/ActionButton/ActionButton';

/**
 * @namespace ResourcesSection
 */

/**
 * @function ResourcesSection
 * @memberof ResourcesSection
 * @description Handles the logic for the Resources section on the Composer
 * Detail Page
 * Created 9/17/21
 * @param {Object} props JSX props passed to this React Component
 * @param {string} props.data Passed to Linking.openURL
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.0
 */
export default function ResourcesSection({ data }) {
  /**
   * @function openImslpLink
   * @memberof ResourcesSection
   * @description Opens the IMSLP link in the default browser.
   * @author Alexander Burdiss
   * @since 9/17/21
   * @version 1.0.0
   */
  function openImslpLink() {
    Linking.openURL(data).catch((err) =>
      console.warn("Couldn't load page", err),
    );
  }

  return (
    <View>
      <MainHeading>Resources</MainHeading>
      <SafeAreaView edges={['right', 'left']}>
        <View style={styles.linksContainer}>
          <ActionButton onPress={openImslpLink}>IMSLP</ActionButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  linksContainer: {
    paddingHorizontal: 20,
    marginBottom: 70,
  },
});
