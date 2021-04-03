import React, {useContext, useEffect} from 'react';
import {View, SectionList, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';
import {INSTRUMENT, FAVORITES, ABOUT, RESOURCES} from '../../Model/MoreModel';
import {PreferencesContext} from '../../Model/Preferences';
import {
  TextListItem,
  LinkListItem,
  InternalListItem,
  SwitchListItem,
  ButtonListItem,
} from './MoreListItems';

/**
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.1
 * 
 * @component
 * @example
 * ```jsx
<Settings />
```
 */
const More = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state, dispatch} = useContext(PreferencesContext);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.sectionList}>
      <SectionList
        sections={[
          {title: 'Instrument', data: INSTRUMENT},
          {title: 'Favorites', data: FAVORITES},
          {title: 'Resources', data: RESOURCES},
          {title: 'About', data: ABOUT},
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          switch (item.type) {
            case 'link':
              return <LinkListItem item={item} state={state} />;
            case 'navigate':
              return <InternalListItem item={item} />;
            case 'text':
              return <TextListItem item={item} />;
            case 'switch':
              return (
                <SwitchListItem item={item} state={state} dispatch={dispatch} />
              );
            case 'button':
              return <ButtonListItem item={item} dispatch={dispatch} />;
            case 'segmentedFilter':
              return (
                <SegmentedFilterListItem
                  item={item}
                  state={state}
                  dispatch={dispatch}
                />
              );
            case 'picker':
              return (
                <PickerListItem dispatch={dispatch} state={state} item={item} />
              );
            default:
              return null;
          }
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          <View style={styles.footerContainer} importantForAccessibility="no">
            <View style={styles.iconContainer}>
              <Ionicons
                accessibilityLabel={'React Native Icon'}
                style={styles.icon}
                name="logo-react"
                size={24}
                color={colors.systemGray}
              />
              <Ionicons
                accessibilityLabel={'JavaScript Icon'}
                style={styles.icon}
                name="logo-javascript"
                size={24}
                color={colors.systemGray}
              />
            </View>
            <Text style={styles.footerText}>
              {'Made with ❤️ in Dayton, Ohio'}
            </Text>
          </View>
        }
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

export default More;
