import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainHeading from '../../../Components/MainHeading/MainHeading';
import ActionButton from '../../../Components/ActionButton/ActionButton';

/**
 * @namespace ResourcesSection
 * @function ResourcesSection
 * @author Alexander Burdiss
 * @since 9/17/21
 * @version 1.0.0
 * @component
 */
export default function ResourcesSection({ data }) {
  /**
   * @function ResourcesSection~openImslpLink
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
