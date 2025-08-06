import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from '../../../utils/customHooks/useColors/useColors';
import { isFavorite } from '../../../utils/isFavorite/isFavorite';
import { PreferencesContext } from '../../../Model/Preferences';
import { StackNavigation } from '../../../Types/navigation';

/**
 * @function CompositionSection
 * @memberof ComposerDetail
 * @component
 * @description A section of the different compositions that the composer has
 * created.
 * Created 3/9/21
 * @param {Object} props The JSX props passed to this React component.
 * @param {Object[]} props.excerpts The list of excerpts to be displayed in this
 * section.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.2
 */
export default function CompositionSection({
  excerpts,
}: {
  excerpts: Object[];
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    accentColor: { color: colors.green },
    button: {
      paddingVertical: 10,
      paddingRight: 20,
      paddingLeft: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonBorder: {
      borderTopWidth: 1,
      borderTopColor: colors.systemGray5,
    },
    container: {
      borderBottomWidth: 1,
      borderBottomColor: colors.systemGray5,
      borderTopWidth: 1,
      borderTopColor: colors.systemGray5,
      backgroundColor: colors.background2,
      marginBottom: 20,
    },
    iconContainer: {
      flexDirection: 'row',
    },
    text: {
      fontSize: 15,
      color: colors.text,
    },
  });

  const { state } = useContext(PreferencesContext);
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.container}>
      {excerpts.map((excerpt, index) => {
        const borderTop = index != 0 ? styles.buttonBorder : null;
        return (
          <SafeAreaView edges={['left']} key={excerpt.id.toString()}>
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
              <Text style={styles.text} maxFontSizeMultiplier={1.8}>
                {excerpt.name}
              </Text>
              <SafeAreaView style={styles.iconContainer} edges={['right']}>
                {isFavorite(state, excerpt.composerLast, excerpt.name) && (
                  <Ionicons
                    name="heart"
                    size={24}
                    color={colors.red}
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
}
