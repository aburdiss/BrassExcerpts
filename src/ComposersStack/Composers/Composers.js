import React from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ComposerListRow from './ComposerListRow';
import {composers} from '../../Model/ComposerModel';

/**
 * @function Composers
 * @description A list of composers of all of the different compositions in the
 * app.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.0.0
 * @component
 * @example
 * ```jsx
 * <Composers />
 * ```
 */
const Composers = () => {
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
      data={composers}
      renderItem={({item, index}) => (
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
};

export default Composers;
