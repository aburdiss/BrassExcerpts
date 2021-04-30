import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ExcerptListRow from './ExcerptListRow';
import ExcerptListHeader from './ExcerptListHeader';
import {processListData} from './ExcerptsUtils';
import {PreferencesContext} from '../../Model/Preferences';

import {excerpts as hornExcerpts} from '../../Model/Excerpts/HornExcerpts';
import {excerpts as trumpetExcerpts} from '../../Model/Excerpts/TrumpetExcerpts';
import {excerpts as tromboneExcerpts} from '../../Model/Excerpts/TromboneExcerpts';
import {excerpts as tubaExcerpts} from '../../Model/Excerpts/TubaExcerpts';

const Excerpts = () => {
  const {state} = useContext(PreferencesContext);
  const navigation = useNavigation();

  const [listData, setListData] = useState([]);
  useEffect(
    function updateData() {
      setListData([]);
      // state is undefined initially.
      if (state) {
        let tempData = [];
        if (state.horn) {
          tempData = hornExcerpts;
        }
        if (state.trumpet) {
          tempData = tempData.concat(trumpetExcerpts);
        }
        if (state.trombone) {
          tempData = tempData.concat(tromboneExcerpts);
        }
        if (state.tuba) {
          tempData = tempData.concat(tubaExcerpts);
        }
        tempData = processListData(tempData);
        setListData(tempData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state?.horn, state?.trumpet, state?.trombone, state?.tuba],
  );

  function navigateToExcerptDetail(item) {
    navigation.navigate('Excerpt Detail', item);
  }

  return (
    <FlatList
      ListHeaderComponent={ExcerptListHeader}
      data={listData}
      renderItem={({item}) => (
        <ExcerptListRow
          composer={item.composerLast}
          composition={item.name}
          onPress={() => {
            navigateToExcerptDetail(item);
          }}
        />
      )}
      keyExtractor={(item) =>
        item.id.toString() + item.name + item.composerLast
      }
    />
  );
};

export default Excerpts;
