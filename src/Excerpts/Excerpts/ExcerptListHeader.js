import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Pressable} from 'react-native';
import {Text, View} from 'react-native';
import {colors} from '../../Model/Model';

/**
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.0.0
 *
 * @component
 * @example
 * ```jsx
 * <ExcerptListHeader />
 * ```
 */
const ExcerptListHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.instrumentText}>Trombone</Text>
      </Pressable>
      <Pressable
        onPress={function navigateToTopExcerpts() {
          navigation.navigate('Top Excerpts');
        }}
        style={({pressed}) => ({
          opacity: pressed ? 0.7 : 1,
          ...styles.topButton,
        })}>
        <Text style={styles.topText}>Top Excerpts</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray2Light,
  },
  instrumentText: {
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
  },
  topButton: {
    backgroundColor: colors.greenDark,
    padding: 10,
    borderRadius: 8,
  },
  topText: {
    fontSize: 16,
  },
});

export default ExcerptListHeader;
