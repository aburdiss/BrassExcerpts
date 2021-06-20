import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import React from 'react';

import {colors} from '../../Model/Model';
import {composers} from '../../Model/ComposerModel';
import ComposerListRow from './ComposerListRow';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

/**
 * @function Composers
 * @description A list of composers of all of the different compositions in the
 * app.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.1.0
 * @component
 * @example
 * ```jsx
 * <Composers />
 * ```
 */
const Composers = () => {
  const navigation = useNavigation();
  const styles = useDynamicStyleSheet(dynamicStyles);

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

const dynamicStyles = new DynamicStyleSheet({
  list: {
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default Composers;
