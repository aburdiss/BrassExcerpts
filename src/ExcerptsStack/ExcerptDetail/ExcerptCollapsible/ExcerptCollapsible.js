import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import AutoHeightImage from 'react-native-auto-height-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/core';

import {colors} from '../../../Model/Model';

/**
 * @description An animated collapsed section of excerpts, that can be disabled
 * @param props The JSX props passed to this react component
 * @param {Object} props.excerpt The excerpt to be rendered in this collapsible
 * @param {Boolean} props.startCollapsed A prop to determine if this collapsible
 * should start in the collapsed state.
 * @param {Number} props.index The index of this collapsible, used for styling]
 * purposes.
 * @author Alexander Burdiss
 * @since 5/1/21
 * @version 1.0.0
 */
const ExcerptCollapsible = ({excerpt, startCollapsed, index}) => {
  const EXTERNAL_GITHUB_URL =
    'https://github.com/aburdiss/BrassExcerpts/raw/master/img/External/';

  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(
    function updateScreenWidth() {
      const {width} = Dimensions.get('window');
      setScreenWidth(width);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Dimensions],
  );
  const [excerptIsCollapsed, setExcerptIsCollapsed] = useState(startCollapsed);
  const animatedController = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();

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

  function navigateToImageDetail(imageUrl) {
    navigation.navigate('Image Detail', {
      url: imageUrl,
      name: route.params.name,
    });
  }

  return (
    <View>
      <Pressable
        disabled={!startCollapsed}
        onPress={() => {
          toggleChevron();
          setExcerptIsCollapsed((previous) => !previous);
        }}
        style={[
          styles.excerptPressable,
          !startCollapsed || index == 0 ? {} : styles.excerptPressableBorder,
        ]}>
        <View style={styles.excerptMetaContainer}>
          <Text style={styles.excerptNumber}>{excerpt.description}</Text>
          <Text style={styles.excerptMeasures}>{excerpt.measures}</Text>
        </View>
        {startCollapsed ? (
          <Animated.View
            style={{
              transform: [{rotateZ: arrowAngle}],
            }}>
            <Ionicons name="chevron-down" size={32} color={colors.greenLight} />
          </Animated.View>
        ) : null}
      </Pressable>
      <Collapsible
        collapsed={excerptIsCollapsed}
        style={styles.excerptContainer}>
        {excerpt.pictures.map((picture) => (
          <View key={picture[1]}>
            <Text style={styles.excerptCaption}>{picture[0]}</Text>
            <Pressable
              onPress={() =>
                navigateToImageDetail(EXTERNAL_GITHUB_URL + picture[1])
              }>
              <AutoHeightImage
                width={screenWidth}
                source={{
                  uri: EXTERNAL_GITHUB_URL + picture[1],
                }}
              />
            </Pressable>
          </View>
        ))}
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  excerptCaption: {
    paddingLeft: 20,
    paddingTop: 7,
    fontSize: 16,
    paddingBottom: 2,
  },
  excerptContainer: {
    paddingBottom: 20,
  },
  excerptMeasures: {
    fontSize: 14,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  excerptMetaContainer: {
    paddingVertical: 5,
    marginBottom: 5,

    height: 50,
  },
  excerptPressable: {
    paddingHorizontal: 20,
    backgroundColor: colors.systemGray5Light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  excerptPressableBorder: {
    borderTopColor: colors.greenDark,
    borderTopWidth: 1,
  },
  excerptNumber: {
    fontSize: 22,
  },
});

export default ExcerptCollapsible;
