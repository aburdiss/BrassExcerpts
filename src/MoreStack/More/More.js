import {View, SectionList, Text} from 'react-native';
import React, {useContext} from 'react';
import SafeAreaView from 'react-native-safe-area-view';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '../../Model/Model';
import {
  INSTRUMENT,
  FAVORITES,
  ABOUT,
  RESOURCES,
  RANDOM,
  SETTINGS,
} from '../../Model/MoreModel';
import {PreferencesContext} from '../../Model/Preferences';
import {
  TextListItem,
  LinkListItem,
  InternalListItem,
  SwitchListItem,
  ButtonListItem,
  SegmentedFilterListItem,
} from './MoreListItems/MoreListItems';

/**
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.1.0
 *
 * @component
 * @example
 * ```jsx
 * <Settings />
 * ```
 */
const More = () => {
  const styles = useDynamicValue(dynamicStyles);
  const {state, dispatch} = useContext(PreferencesContext);

  return (
    <SafeAreaView style={styles.sectionList}>
      <SectionList
        sections={[
          {title: 'Instrument', data: INSTRUMENT},
          {title: 'Favorites', data: FAVORITES},
          {title: 'Random', data: RANDOM},
          {title: 'Settings', data: SETTINGS},
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
            default:
              return null;
          }
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text accessibilityRole="header" style={styles.listHeader}>
            {title}
          </Text>
        )}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          <View style={styles.footerContainer} importantForAccessibility="no">
            <View style={styles.iconContainer}>
              <Ionicons
                accessibilityLabel={'React Native Icon'}
                accessibilityRole="image"
                style={styles.icon}
                name="logo-react"
                size={24}
                color={colors.reactColor}
              />
              <View>
                <View style={styles.javascriptBackground} />
                <Ionicons
                  accessibilityLabel={'JavaScript Icon'}
                  accessibilityRole="image"
                  style={styles.icon}
                  name="logo-javascript"
                  size={24}
                  color={colors.javascriptColor}
                />
              </View>
            </View>
            <Text
              style={styles.footerText}
              accessibilityRole="text"
              accessibilityLabel="Made with love in Dayton, Ohio">
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
  javascriptBackground: {
    backgroundColor: colors.black,
    height: 20,
    width: 20,
    marginLeft: 7,
    marginTop: 3,
    zIndex: -1,
    position: 'absolute',
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
