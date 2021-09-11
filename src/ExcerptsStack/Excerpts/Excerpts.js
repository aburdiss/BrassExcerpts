import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ExcerptListRow from './ExcerptListRow/ExcerptListRow';
import ExcerptListHeader from './ExcerptListHeader/ExcerptListHeader';
import { processListData } from './utils/processListData/processListData';
import ScrollViewBounceContainer from '../../Components/ScrollViewBounceContainer/ScrollViewBounceContainer';
import { PreferencesContext } from '../../Model/Preferences';

import { excerpts as hornExcerpts } from '../../Model/Excerpts/HornExcerpts';
import { excerpts as trumpetExcerpts } from '../../Model/Excerpts/TrumpetExcerpts';
import { excerpts as tromboneExcerpts } from '../../Model/Excerpts/TromboneExcerpts';
import { excerpts as tubaExcerpts } from '../../Model/Excerpts/TubaExcerpts';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace Excerpts
 * @function Excerpts
 * @description A list of excerpts sorted in alphabetical order. When pressed,
 * each excerpt leads to the ExcerptDetail view with more information on each
 * excerpt.
 * @author Alexander Burdiss
 * @since 3/3/21
 * @version 1.2.0
 * @component
 * @example
 * <Excerpts />
 */
const Excerpts = () => {
  const { state } = useContext(PreferencesContext);
  const navigation = useNavigation();
  const colors = useColors();

  const [listData, setListData] = useState([]);
  useEffect(
    /**
     * @function Excerpts~useEffect~updateData
     * @description Updates the data in the excerpts row if a different
     * instrument is selected in the users' preferences.
     * @author Alexander Burdiss
     * @since 4/30/21
     * @version 1.0.0
     */
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

  /**
   * @function Excerpts~navigateToExcerptDetail
   * @description Navigates to the Excerpt Detail view and passes in the
   * appropriate data.
   * @author Alexander Burdiss
   * @since 3/5/21
   * @param {Object} item The item to pass to the Excerpt Detail Screen.
   */
  function navigateToExcerptDetail(item) {
    navigation.navigate('Excerpt Detail', item);
  }

  return (
    <ScrollViewBounceContainer
      topBounceColor={colors.green}
      bottomBounceColor={colors.background}
    >
      <FlatList
        ListHeaderComponent={ExcerptListHeader}
        data={listData}
        renderItem={({ item }) => (
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
    </ScrollViewBounceContainer>
  );
};

export default Excerpts;
