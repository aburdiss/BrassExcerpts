// @ts-check
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

/**
 * @namespace Loading
 * @function Loading
 * @description A styled Loading component for the BrassXcerpts application.
 * @author Alexander Burdiss
 * @since 12/13/21
 * @version 1.0.0
 * @component
 */
export default function Loading() {
  const styles = StyleSheet.create({
    container: {
      padding: 40,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
