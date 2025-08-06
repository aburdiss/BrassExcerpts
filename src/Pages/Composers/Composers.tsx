import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';

import { composers } from '../../Model/ComposerModel/ComposerModel';
import { useColors } from '../../utils/customHooks/useColors/useColors';
import ComposerListRow from './ComposerListRow/ComposerListRow';
import { StackNavigation } from '../../Types/navigation';

/**
 * @namespace Composers
 */
/**
 * @function Composers
 * @memberof Composers
 * @component
 * @description A list of composers of all of the different compositions in the
 * app.
 * Created 3/3/21
 * @returns {JSX.Element} JSX render Instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.2.0
 * @example
 * <Composers />
 */
export default function Composers() {
  const colors = useColors();
  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.background,
    },
  });

  const navigation = useNavigation<StackNavigation>();

  /**
   * @function navigateToComposerDetail
   * @memberof Composers
   * @description Opens the composer detail with more information about a
   * certain composer
   * @param {Object} item The composer object to open in more detail
   * @author Alexander Burdiss
   * @since 3/18/21
   * @version 1.0.0
   */
  function navigateToComposerDetail(item) {
    navigation.navigate('Composer Detail', item);
  }

  return (
    <FlatList
      style={styles.list}
      data={composers}
      renderItem={({ item, index }) => (
        <ComposerListRow
          name={item.name}
          index={index}
          imageSource={item.image}
          onPress={() => {
            navigateToComposerDetail(item);
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
