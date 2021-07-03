import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';

/**
 * @todo Add share modal when long press this job.
 *
 * @function JobsListRow
 * @description One job item in the list of jobs.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.1.0
 * @component
 * @example
 * ```jsx
 * <JobsListRow job={job} />
 * ```
 */
const JobsListRow = ({ job }) => {
  const navigation = useNavigation();
  const styles = useDynamicStyleSheet(dynamicStyles);

  /**
   * @function JobsListRow~navigateToJobDetail
   * @description Navigates the user to the Job Detail page, passing in the
   * appropriate job information
   * @author Alexander Burdiss
   * @since 3/28/21
   * @version 1.0.0
   */
  function navigateToJobDetail() {
    navigation.navigate('Job Detail', job);
  }

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={job?.position + ' ' + job?.orchestra}
      accessibilityHint={
        'Opens Job details for ' + job?.position + ' ' + job?.orchestra
      }
      android_ripple={{
        color: styles.orchestra.color,
      }}
      onPress={navigateToJobDetail}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        ...styles.container,
      })}
    >
      <View style={styles.orchestraContainer}>
        <Text style={styles.orchestra}>{job?.orchestra}</Text>
        <Text>{job?.position}</Text>
      </View>
      <Text style={styles.closingDate}>
        Closing Date:{'\n'}
        {job?.closingDate}
      </Text>
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  closingDate: {
    width: '40%',
    textAlign: 'right',
  },
  container: {
    backgroundColor: new DynamicValue(colors.greenLight, colors.greenDark),
    marginVertical: 8,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orchestra: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    color: new DynamicValue(colors.black, colors.black),
  },
  orchestraContainer: {
    width: '60%',
  },
});

export default JobsListRow;
