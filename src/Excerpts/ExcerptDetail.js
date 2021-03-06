import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import MetaLabel from './ExcerptDetail/MetaLabel';
import {colors} from '../Model/Model';
import {Image} from 'react-native';

const ExcerptDetail = () => {
  const route = useRoute();
  const item = route.params;
  console.log(item.excerpts);

  return (
    <ScrollView>
      <View style={styles.metaInfoContainer}>
        <Text style={styles.title}>{item.composer}</Text>
        <MetaLabel label="Date" data={item.date} />
        <MetaLabel label="Era" data={item.era} />
        <MetaLabel label="Genre" data={item.genre} />
        <MetaLabel label="Mutes" data={item.mutes} />
      </View>
      <View style={styles.excerptsContainer}>
        {item.excerpts.map((excerpt) => (
          <View key={excerpt.id}>
            <Text>{excerpt.description}</Text>
            <Text>{excerpt.measures}</Text>
            {excerpt.pictures.map((picture) => (
              <View key={picture[1]}>
                <Text>{picture[0]}</Text>
                <Image
                  style={{
                    height: 100,
                  }}
                  source={{
                    uri:
                      'https://raw.githubusercontent.com/aburdiss/ScalePractice/master/img/ANPLogo.png',
                  }}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  excerptsContainer: {},
  metaInfoContainer: {
    borderBottomColor: colors.greenDark,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default ExcerptDetail;
