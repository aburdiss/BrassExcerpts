import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TRANSLATIONS } from '../../Model/AcknowledgementsModel/AcknowledgementsModel';
import TextListItem from '../../Components/ListItems/TextListItem/TextListItem';
import { useColors } from '../../utils/customHooks/useColors/useColors';

/**
 * @function Acknowledgements
 * @component
 * @description A View that displays the people who directly assisted with
 * this project
 * Created 12/14/20
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
 *
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
    <SafeAreaView style={styles.sectionList} edges={['right', 'left']}>
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
