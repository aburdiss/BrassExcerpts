// @ts-check
import React, { useState } from 'react';
import { useWindowDimensions, View, Text, StyleSheet } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Pinchable from 'react-native-pinchable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loading from '../Loading/Loading';

import { useColors } from '../../utils/customHooks/useColors/useColors';
import { getContrast } from '../../utils/getContrast/getContrast';

/**
 * @namespace RemoteImage
 * @function RemoteImage
 * @description A wrapper for a remote image, with loading and error states
 * styled for the application.
 * @param {object} props The JSX props passed to this React component
 * @param {string} props.description The Accessibility Label used on this
 * component
 * @param {string} props.source The remote source to pull the image in from.
 * @author Alexander Burdiss
 * @since 12/14/21
 * @version 1.0.1
 * @component
 * @example
 */
export default function RemoteImage({ description, source }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    errorContainer: {
      backgroundColor: colors.red,
      padding: 40,
      borderRadius: 8,
    },
    errorTextBold: {
      textAlign: 'center',
      color: getContrast(colors.red, colors),
      fontWeight: 'bold',
      fontSize: 16,
      paddingBottom: 10,
    },
    errorText: {
      textAlign: 'center',
      color: getContrast(colors.red, colors),
    },
  });
  const windowWidth = useWindowDimensions().width;
  const windowInsets = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {loading && <Loading large={false} />}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTextBold}>
            There was an error loading this image.
          </Text>
          <Text style={styles.errorText}>
            If this persists, please contact us.
          </Text>
        </View>
      )}
      <Pinchable>
        <AutoHeightImage
          accessibilityRole="image"
          accessibilityLabel={description}
          width={windowWidth - windowInsets.left - windowInsets.right}
          source={{
            uri: source,
          }}
          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}
          onLoadEnd={() => {
            setLoading(false);
            setError(false);
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      </Pinchable>
    </>
  );
}
