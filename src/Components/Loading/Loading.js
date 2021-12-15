// @ts-check
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

/**
 * @namespace Loading
 * @function Loading
 * @description A styled Loading component for the BrassXcerpts application.
 * @param {object} props The JSX props passed to this React component
 * @param {boolean} [props.large=true] Whether or not to load the large loading
 * component.
 * @author Alexander Burdiss
 * @since 12/13/21
 * @version 1.1.0
 * @component
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
