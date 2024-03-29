import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pinchable from 'react-native-pinchable';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useColors } from '../../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace ExcerptCollapsible
 * @function ExcerptCollapsible
 * @description An animated collapsed section of excerpts, that can be disabled
 * @param props The JSX props passed to this react component
 * @param {Object} props.excerpt The excerpt to be rendered in this collapsible
 * @param {Boolean} props.startCollapsed A prop to determine if this collapsible
 * should start in the collapsed state.
 * @param {Number} props.index The index of this collapsible, used for styling]
 * purposes.
 * @author Alexander Burdiss
 * @since 5/1/21
 * @version 1.2.0
 * @component
 * @example
 * <ExcerptCollapsible
 *   excerpt={excerpt}
 *   startCollapsed={shouldStartCollapsed()}
 *   index={index}
 * />
 */
export default function ExcerptCollapsible({ excerpt, startCollapsed, index }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    excerptCaption: {
      paddingLeft: 20,
      paddingTop: 7,
      fontSize: 16,
      paddingBottom: 2,
      color: colors.text,
    },
    excerptContainer: {
      paddingBottom: 20,
    },
    excerptMeasures: {
      fontSize: 14,
      marginLeft: 10,
      fontStyle: 'italic',
      color: colors.text,
    },
    excerptMetaContainer: {
      paddingVertical: 5,
      marginBottom: 5,
      minHeight: 50,
      maxWidth: '90%',
    },
    excerptPressable: {
      paddingHorizontal: 20,
      backgroundColor: colors.systemGray5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '100%',
    },
    excerptPressableBorder: {
      borderTopColor: colors.green,
      borderTopWidth: 1,
    },
    excerptNumber: {
      fontSize: 22,
      color: colors.text,
    },
  });

  const EXTERNAL_GITHUB_URL =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/img/External/';

  const [excerptIsCollapsed, setExcerptIsCollapsed] = useState(startCollapsed);
  const animatedController = useRef(new Animated.Value(0)).current;

  const windowWidth = useWindowDimensions().width;
  const windowInsets = useSafeAreaInsets();

  /**
   * @function ExcerptCollapsible~toggleChevron
   * @description Animates the chevron open or closed based on the position of
   * the accordion. This will only show or be triggered if there are more
   * than six excerpts showing for any one composition.
   * @author Alexander Burdiss
   * @since 5/1/21
   * @version 1.0.0
   */
  function toggleChevron() {
    if (excerptIsCollapsed) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }).start();
    }
  }

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  return (
    <View>
      <Pressable
        accessibilityRole="spinbutton"
        accessible={true}
        accessibilityLabel={excerpt.description + ' ' + excerpt.measures}
        accessibilityState={{ expanded: !excerptIsCollapsed }}
        accessibilityHint={'Opens ' + excerpt.description}
        android_ripple={{
          color: styles.excerptPressableBorder.borderTopColor,
        }}
        disabled={!startCollapsed}
        onPress={() => {
          toggleChevron();
          setExcerptIsCollapsed((previous) => !previous);
        }}
      >
        <SafeAreaView
          edges={['right', 'left']}
          style={[
            styles.excerptPressable,
            !startCollapsed || index == 0 ? {} : styles.excerptPressableBorder,
          ]}
        >
          <View style={styles.excerptMetaContainer}>
            <Text style={styles.excerptNumber} maxFontSizeMultiplier={1.4}>
              {excerpt.description}
            </Text>
            <Text style={styles.excerptMeasures} maxFontSizeMultiplier={1.8}>
              {excerpt.measures}
            </Text>
          </View>
          {startCollapsed ? (
            <Animated.View
              style={{
                transform: [{ rotateZ: arrowAngle }],
              }}
            >
              <Ionicons
                name="chevron-down"
                size={32}
                color={styles.excerptPressableBorder.borderTopColor}
              />
            </Animated.View>
          ) : null}
        </SafeAreaView>
      </Pressable>
      <Collapsible
        collapsed={excerptIsCollapsed}
        style={styles.excerptContainer}
      >
        {excerpt.pictures.map((picture) => (
          <SafeAreaView key={picture[1]} edges={['right', 'left']}>
            <Text style={styles.excerptCaption} maxFontSizeMultiplier={2.0}>
              {picture[0]}
            </Text>
            <Pinchable>
              <AutoHeightImage
                accessibilityRole="image"
                accessibilityLabel={
                  excerpt.description +
                  ' ' +
                  excerpt.measuers +
                  ' ' +
                  picture[0]
                }
                width={windowWidth - windowInsets.left - windowInsets.right}
                source={{
                  uri: EXTERNAL_GITHUB_URL + picture[1],
                }}
              />
            </Pinchable>
          </SafeAreaView>
        ))}
      </Collapsible>
    </View>
  );
}
