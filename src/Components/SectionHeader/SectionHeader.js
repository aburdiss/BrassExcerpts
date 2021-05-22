import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

/**
 * @function SectionHeader
 * @description A prestyled section header that can be used across the app
 * @author Alexander Burdiss
 * @since 5/22/21
 * @version 1.0.0
 * @param props The JSX props passed to this React component
 * @param {String} props.children the text to render in this component
 * @component
 * @example
 * ```jsx
 * <SectionHeader>Tuba</SectionHeader />
 * ```
 */
const SectionHeader = ({children}) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 5,
  },
});

export default SectionHeader;
