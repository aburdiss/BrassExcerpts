import React from 'react';
import { Linking, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '../../../Components/ActionButton/ActionButton';
import MainHeading from '../../../Components/MainHeading/MainHeading';
import AllExcerptDataModel from '../../../Model/AllExcerptDataModel/AllExcerptDataModel';

/**
 * @namespace ResourcesSection
 */

/**
 * @function ResourcesSection
 * @memberof ExcerptsDetail.ResourcesSection
 * @description The section of the ExcerptsDetail that renders additional
 * resources for the excerpt.
 * Created 9/17/21
 * @param {Object} props The JSX props passed to this React component
 * @param {string} props.data The key to pull from the AllExcerptDataModel
 * @returns {JSX.Element} JSX Render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export default function ResourcesSection({ data }) {
  const styles = StyleSheet.create({
    linksContainer: {
      paddingHorizontal: 20,
      marginBottom: 70,
    },
  });

  /**
   * @function openImslpLink
   * @memberof ExcerptsDetail.ResourcesSection
   * @description Opens the IMSLP link in the default browser.
   * @author Alexander Burdiss
   * @since 9/17/21
   * @version 1.0.0
   */
  function openImslpLink() {
    const url = AllExcerptDataModel[data]?.imslp;
    Linking.openURL(url).catch((err) =>
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
