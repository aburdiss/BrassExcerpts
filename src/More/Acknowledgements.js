import React from 'react';
import {SectionList, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import {TRANSLATIONS} from '../Model/AcknowledgementsModel';
import {TextListItem} from './MoreListItems';

/**
 * @description A View that displays the people who directly assisted with
 * this project
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.2
 * 
 * @component
 * @example
 * ```jsx
<Acknowledgements />
```
 */
const Acknowledgements = () => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <SafeAreaView style={styles.sectionList}>
      <SectionList
        sections={[{title: 'Translations', data: TRANSLATIONS}]}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <TextListItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  listHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: new DynamicValue(colors.systemGray, colors.systemGray),
  },
  sectionList: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 5,
  },
  footerContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: colors.systemGray,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default Acknowledgements;
