import {Text, View} from 'react-native';
import React from 'react';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import {colors} from '../../Model/Model';

/**
 * @function SectionHeader
 * @description A prestyled section header that can be used across the app
 * @author Alexander Burdiss
 * @since 5/22/21
 * @version 1.1.0
 * @param props The JSX props passed to this React component
 * @param {String} props.children the text to render in this component
 * @component
 * @example
 * ```jsx
 * <SectionHeader>Tuba</SectionHeader />
 * ```
 */
const SectionHeader = ({children}) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  return (
    <View accessibilityRole="header">
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 5,
    color: new DynamicValue(colors.black, colors.white),
  },
});

export default SectionHeader;
