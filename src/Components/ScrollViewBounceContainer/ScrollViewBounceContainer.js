import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const ScrollViewBounceContainer = ({
  children,
  topBounceColor,
  bottomBounceColor,
}) => {
  return (
    <View
      style={styles.container}
      accessibilityElementsHidden={true}
      importantForAccessibility="no-hide-descendants">
      {children}
      <View style={styles.backgroundContainer}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, backgroundColor: topBounceColor}}
          testID="topBounce"
        />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, backgroundColor: bottomBounceColor}}
          testID="bottomBounce"
        />
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
