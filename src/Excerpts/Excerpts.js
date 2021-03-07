import React from 'react';
import {View, FlatList, Text} from 'react-native';

import ExcerptListRow from './Excerpts/ExcerptListRow';
import {excerpts as tromboneExcerpts} from '../Model/Excerpts/TromboneExcerpts';
import {useNavigation} from '@react-navigation/native';
import ExcerptListHeader from './Excerpts/ExcerptListHeader';

const Excerpts = () => {
  const navigation = useNavigation();

  function navigateToExcerptDetail(item) {
    navigation.navigate('Excerpt Detail', item);
  }

  return (
    <FlatList
      ListHeaderComponent={ExcerptListHeader}
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
