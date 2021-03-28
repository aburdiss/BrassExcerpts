import React from 'react';
import {Text} from 'react-native';

const MetaLabel = ({label, data}) => {
  if (!data) {
    return null;
  } else {
    return (
      <Text
        style={{
          paddingTop: 3,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          {label + ': '}
        </Text>
        {data}
      </Text>
    );
  }
};

export default MetaLabel;
