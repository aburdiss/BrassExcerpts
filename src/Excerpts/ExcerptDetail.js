import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

const ExcerptDetail = () => {
  const route = useRoute();
  const item = route.params;

  return (
    <View>
      <Text>{item.composer}</Text>
      <Text>{item.name}</Text>
      {item.date && (
        <Text>
          <Text style={styles.dataLabel}>Date: </Text>
          {item.date}
        </Text>
      )}
      {item.era && (
        <Text>
          <Text style={styles.dataLabel}>Era: </Text>
          {item.era}
        </Text>
      )}
      {item.genre && (
        <Text>
          <Text style={styles.dataLabel}>Genre: </Text>
          {item.genre}
        </Text>
      )}
      {item.mutes && (
        <Text>
          <Text style={styles.dataLabel}>Mutes: </Text>
          {item.mutes}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dataLabel: {
    fontWeight: 'bold',
  },
});

export default ExcerptDetail;
