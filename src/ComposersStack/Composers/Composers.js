import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';

import { composers } from '../../Model/ComposerModel/ComposerModel';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import ComposerListRow from './ComposerListRow/ComposerListRow';

/**
 * @namespace Composers
 * @function Composers
 * @description A list of composers of all of the different compositions in the
 * app.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.2.0
 * @component
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

  const navigation = useNavigation();

  /**
   * @function Composers~navigateToComposerDetail
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
