import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {colors} from '../../Model/Model';

/**
 * @todo Add share modal when long press this job.
 */
const JobsListRow = ({job}) => {
  const navigation = useNavigation();
  function navigateToJobDetail() {
    navigation.navigate('Job Detail', job);
  }

  return (
    <Pressable
      onPress={navigateToJobDetail}
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.container,
      })}>
      <View>
        <Text style={styles.orchestra}>{job.orchestra}</Text>
        <Text>{job.position}</Text>
      </View>
      <Text>
        Closing Date:{'\n'}
        {job.closingDate}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greenLight,
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orchestra: {
    fontWeight: 'bold',
  },
});

export default JobsListRow;
