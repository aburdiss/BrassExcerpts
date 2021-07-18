import React from 'react';
import { View, Pressable, Text, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';

/**
 * @description A rendered Link list item with a chevron and theme colored text
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.0.2
 * @param {Object} props.item The list item containing a link and some text.
 * @param {Object} props.state The app state, containing all of the user's
 * preferences.
 *
 * @component
 * @example
 * <LinkListItem
 *   item={item}
 *   state={state}
 * />
 */
export default function LinkListItem({ item, state }) {
  const styles = useDynamicValue(dynamicStyles);
  const isHidden = item.instrument && state.instrument != item.instrument;

  return isHidden ? null : (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={item.value}
      accessibilityRole="link"
      onPress={() => {
        Linking.openURL(item.link).catch((err) =>
          console.warn("Couldn't load page", err),
        );
      }}
    >
      <View style={styles.listRowContainer}>
        <Text maxFontSizeMultiplier={1.8} style={styles.linkText}>
          {item.value}
        </Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={25}
          color={styles.linkText.color}
        />
      </View>
    </Pressable>
  );
}

const dynamicStyles = new DynamicStyleSheet({
  listItemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: new DynamicValue(
      colors.systemGray3Light,
      colors.systemGray3Dark,
    ),
  },
  listSegmentedRowContainer: {
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    height: 45,
  },
  listButtonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    height: 45,
  },
  listPickerContainer: {
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    height: 45,
    alignItems: 'center',
  },
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
    paddingVertical: 5,
  },
  linkText: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
    paddingRight: 5,
  },
});
