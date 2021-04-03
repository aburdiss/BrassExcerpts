import React from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ComposerListRow from './ComposerListRow';
import {composers} from '../../Model/ComposerModel';

const Composers = () => {
  const navigation = useNavigation();

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
