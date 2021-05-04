import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const ScrollViewBounceContainer = ({
  children,
  topBounceColor,
  bottomBounceColor,
}) => {
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.backgroundContainer}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{flex: 1, backgroundColor: topBounceColor}} />
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{flex: 1, backgroundColor: bottomBounceColor}} />
      </View>
    </View>
  );
};

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

export default ScrollViewBounceContainer;
