import React from 'react';
import { View, Text } from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';
/**
 * @description A rendered Text list item. This will not translate
 * copyright information.
 * @author Alexander Burdiss
 * @since 1/3/21
 * @version 1.1.0
 * @param {Object} props.item The text to be rendered in the list item.
 *
 * @component
 * @example
 * <TextListItem item={item} />
 */
export default function TextListItem({ item }) {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      <Text
        maxFontSizeMultiplier={1.8}
        style={styles.listRowText}
        accessibilityRole="text"
      >
        {item.value.includes('Alexander Burdiss') ? item.value : item.value}
      </Text>
    </View>
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
