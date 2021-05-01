import React from 'react';
import {View, Text} from 'react-native';

const YoutubeSectionHeader = ({children}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontStyle: 'italic',
          paddingTop: 15,
          paddingLeft: 20,
          paddingBottom: 5,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default YoutubeSectionHeader;
