import React, { useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';
import { isFavorite } from '../../../utils/isFavorite/isFavorite';
import { PreferencesContext } from '../../../Model/Preferences';

/**
 * @function CompositionSection
 * @description A section of the different compositions that the composer has
 * created.
 * @param props The JSX props passed to this React component.
 * @param {Object[]} props.excerpts The list of excerpts to be displayed in this
 * section.
 * @author Alexander Burdiss
 * @since 3/9/21
 * @version 1.0.2
 */
const CompositionSection = ({ excerpts }) => {
  const { state } = useContext(PreferencesContext);
  const navigation = useNavigation();
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <View style={styles.container}>
      {excerpts.map((excerpt, index) => {
        const borderTop = index != 0 ? styles.buttonBorder : null;
        return (
          <SafeAreaView
            edges={['left']}
            key={excerpt.id.toString()}
            style={styles.buttonSafeArea}
          >
            <Pressable
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={excerpt.name}
              accessibilityHint={
                'Navigates to Excerpt Detail for' + excerpt.name
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                ...borderTop,
                ...styles.button,
              })}
              android_ripple={{
                color: styles.accentColor.color,
              }}
              onPress={function navigateToExcerpt() {
                navigation.navigate('Composer Excerpt Detail', excerpt);
              }}
            >
              <Text style={styles.text}>{excerpt.name}</Text>
              <SafeAreaView style={styles.iconContainer} edges={['right']}>
                {isFavorite(state, excerpt.composerLast, excerpt.name) && (
                  <Ionicons
                    name="heart"
                    size={24}
                    color={colors.redLight}
                    style={styles.favoriteIcon}
                  />
                )}
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={styles.accentColor.color}
                />
              </SafeAreaView>
            </Pressable>
          </SafeAreaView>
        );
      })}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  accentColor: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
  },
  button: {
    paddingVertical: 10,
    paddingRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBorder: {
    borderTopWidth: 1,
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    color: new DynamicValue(colors.black, colors.white),
  },
});

export default CompositionSection;
