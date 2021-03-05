import React from 'react';
import {View, FlatList, Text} from 'react-native';

import ExcerptListRow from './ExcerptListRow';
import {excerpts as tromboneExcerpts} from '../Model/TromboneExcerpts';
import {useNavigation} from '@react-navigation/native';

const Excerpts = () => {
  const navigation = useNavigation();

  function navigateToExcerptDetail(item) {
    navigation.navigate('Excerpt Detail', item);
  }

  return (
    <FlatList
      data={tromboneExcerpts}
      renderItem={({item}) => (
        <ExcerptListRow
          composer={item.composerLast}
          composition={item.name}
          onPress={() => {
            navigateToExcerptDetail(item);
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default Excerpts;
