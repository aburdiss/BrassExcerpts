// @ts-check
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import LicensesListItem from '../LicensesListItem/LicensesListItem';

/**
 * @function LicensesList
 * @memberof Licenses
 * @component
 * @description The list of licenses of dependencies used in this app.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Created 12/17/20
 * @param {Object} props The JSX props passed to this React component
 * @param {Object[]} props.licenses The list of licenses that will be displayed.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.2
 *
 * @example
 * <LicensesList licenses={licenses} />
 */
export default function LicensesList({ licenses }) {
  const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
  });

  return (
    <FlatList
      style={styles.list}
      keyExtractor={({ key }) => key}
      data={licenses}
      renderItem={({ item, index }) => (
        <LicensesListItem {...item} index={index} />
      )}
    />
  );
}
