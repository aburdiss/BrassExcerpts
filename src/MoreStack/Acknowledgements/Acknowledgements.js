import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { TRANSLATIONS } from '../../Model/AcknowledgementsModel/AcknowledgementsModel';
import TextListItem from '../../Components/ListItems/TextListItem/TextListItem';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace Acknowledgements
 * @function Acknowledgements
 * @description A View that displays the people who directly assisted with
 * this project
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.2.0
 *
 * @component
 * @example
 * <Acknowledgements />
 */
export default function Acknowledgements() {
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

  return (
    <SafeAreaView style={styles.sectionList}>
      <SectionList
        sections={[{ title: 'Translations', data: TRANSLATIONS }]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <TextListItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text accessibilityRole="text" style={styles.listHeader}>
            {title}
          </Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}
