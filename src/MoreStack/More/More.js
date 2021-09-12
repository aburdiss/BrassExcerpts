import { View, SectionList, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  INSTRUMENT,
  FAVORITES,
  ABOUT,
  RESOURCES,
  RANDOM,
  SETTINGS,
} from '../../Model/MoreModel/MoreModel';
import { PreferencesContext } from '../../Model/Preferences';
import ButtonListItem from '../../Components/ListItems/ButtonListItem/ButtonListItem';
import TextListItem from '../../Components/ListItems/TextListItem/TextListItem';
import SwitchListItem from '../../Components/ListItems/SwitchListItem/SwitchListItem';
import LinkListItem from '../../Components/ListItems/LinkListItem/LinkListItem';
import InternalListItem from '../../Components/ListItems/InternalListItem/InternalListItem';
import SegmentedFilterListItem from '../../Components/ListItems/SegmentedFilterListItem/SegmentedFilterListItem';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import { PickerListItem } from '../../Components/ListItems/PickerListItem/PickerListItem';

/**
 * @namespace More
 * @function More
 * @description A View that allows the user to set custom settings, or view
 * additional resources.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.2.0
 * @component
 * @example
 * <More />
 */
export default function More() {
  const colors = useColors();
  const styles = StyleSheet.create({
    listHeader: {
      textTransform: 'uppercase',
      paddingLeft: 20,
      paddingTop: 30,
      paddingBottom: 10,
      color: colors.systemGray,
    },
    sectionList: {
      height: '100%',
      backgroundColor: colors.background,
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

  const { state, dispatch } = useContext(PreferencesContext);

  return (
    <SafeAreaView style={styles.sectionList} edges={['right', 'left']}>
      <SectionList
        sections={[
          { title: 'Instrument', data: INSTRUMENT },
          { title: 'Favorites', data: FAVORITES },
          { title: 'Random', data: RANDOM },
          { title: 'Settings', data: SETTINGS },
          { title: 'Resources', data: RESOURCES },
          { title: 'About', data: ABOUT },
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
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
            case 'picker':
              return (
                <PickerListItem item={item} dispatch={dispatch} state={state} />
              );
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
        renderSectionHeader={({ section: { title } }) => (
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
                color={colors.react}
              />
              <View>
                <View style={styles.javascriptBackground} />
                <Ionicons
                  accessibilityLabel={'JavaScript Icon'}
                  accessibilityRole="image"
                  style={styles.icon}
                  name="logo-javascript"
                  size={24}
                  color={colors.javascript}
                />
              </View>
            </View>
            <Text
              style={styles.footerText}
              accessibilityRole="text"
              accessibilityLabel="Made with love in Dayton, Ohio"
            >
              {'Made with ❤️ in Dayton, Ohio'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
