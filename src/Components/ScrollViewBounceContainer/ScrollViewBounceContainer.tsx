import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * @function ScrollViewBounceContainer
 * @component
 * @description A container for a scrollview that provides different colors
 * on the top and the bottom. This is useful for making the bounce look better
 * on top and bottom.
 * Created 5/4/21
 * @param {Object} props The JSX props passed to this React component
 * @param {*} props.children Any child to be rendered inside this
 * wrapper
 * @param {string} props.topBounceColor
 * @param {string} props.bottomBounceColor
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.0
 */
export default function ScrollViewBounceContainer({
  children,
  topBounceColor,
  bottomBounceColor,
}: {
  children: any;
  topBounceColor: String;
  bottomBounceColor: String;
}) {
  const styles = StyleSheet.create({
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
    container: {
      position: 'relative',
    },
  });

  return (
    <View
      style={styles.container}
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants"
    >
      {children}
      <View style={styles.backgroundContainer}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1, backgroundColor: topBounceColor }}
          testID="topBounce"
        />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flex: 1, backgroundColor: bottomBounceColor }}
          testID="bottomBounce"
        />
      </View>
    </View>
  );
}
