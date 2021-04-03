import React from 'react';
import {Text, View} from 'react-native';

const CompositionSectionHeader = ({children}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontStyle: 'italic',
          paddingTop: 5,
          paddingLeft: 20,
          paddingBottom: 5,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default CompositionSectionHeader;
