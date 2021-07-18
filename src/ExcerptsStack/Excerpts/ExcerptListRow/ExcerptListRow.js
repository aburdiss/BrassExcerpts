import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';
import { PreferencesContext } from '../../../Model/Preferences';
import { isFavorite } from '../../../utils/isFavorite/isFavorite';

/**
 * @description One row in the Excerpts List.
 * @param {*} props JSX props passed to this React Component
 * @param {String} props.composer The composer of this Excerpt row
 * @param {String} props.composition The composition to navigate to
 * @param {Function} props.onPress The function to call when this component is
 * pressed.
 * @author Alexander Burdiss
 * @since 3/6/21
 * @version 1.3.0
 */
const ExcerptListRow = ({ composer, composition, onPress }) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const { state } = useContext(PreferencesContext);

  return (
    <Pressable
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={composer + ' ' + composition}
      accessibilityHint={'Navigates to ' + composer + ' ' + composition}
      android_ripple={{
        color: new DynamicValue(colors.greenLight, colors.greenDark),
      }}
      style={{}}
    >
      <SafeAreaView edges={['right', 'left']} style={styles.button}>
        <View style={styles.text}>
          <Text style={styles.composerText} maxFontSizeMultiplier={1.7}>
            {composer + '  '}
          </Text>
          <Text style={styles.compositionText} maxFontSizeMultiplier={1.8}>
            {composition}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {isFavorite(state, composer, composition) && (
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
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  accentColor: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
  },
  button: {
    paddingVertical: 10,
    paddingLeft: 25,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 44,
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
  },
  composerText: {
    fontWeight: 'bold',
    color: new DynamicValue(colors.black, colors.white),
  },
  compositionText: {
    color: new DynamicValue(colors.black, colors.white),
    flexWrap: 'wrap',
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  favoriteIcon: {
    paddingRight: 5,
  },
  text: {
    fontSize: 16,
    flexDirection: 'row',
    maxWidth: '85%',
    flexWrap: 'wrap',
  },
});

export default ExcerptListRow;
