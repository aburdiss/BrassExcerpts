// @ts-check
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

/**
 * @function Loading
 * @component
 * @description A styled Loading component for the BrassXcerpts application.
 * Created 12/13/21
 * @param {Object} props The JSX props passed to this React component
 * @param {boolean} [props.large=true] Whether or not to load the large loading
 * component.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.0
 */
export default function Loading({ large = true }) {
  const styles = StyleSheet.create({
    container: {
      padding: 40,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={large ? 'large' : 'small'} />
    </View>
  );
}
