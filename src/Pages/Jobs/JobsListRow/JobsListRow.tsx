import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useColors } from '../../../utils/customHooks/useColors/useColors';
import { getCountryFlagEmoji } from '../../../utils/getCountryFlagEmoji/getCountryFlagEmoji';

/**
 * @namespace JobsListRow
 * @memberof Jobs
 */
/**
 * @todo Add share modal when long press this job.
 *
 * @function JobsListRow
 * @memberof Jobs.JobsListRow
 * @component
 * @description One job item in the list of jobs.
 * Created 3/28/21
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.3.2
 * @example
 * <JobsListRow job={job} />
 */
export default function JobsListRow({ job }: { job: Object }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    closingDate: {
      width: 135,
      textAlign: 'right',
    },
    container: {
      backgroundColor: colors.green,
      marginVertical: 8,
      padding: 15,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    flag: {
      fontSize: 20,
    },
    flagContainer: {
      position: 'absolute',
      top: -10,
      left: Platform.OS == 'android' ? 0 : -4,
    },
    orchestra: {
      fontWeight: 'bold',
      flexWrap: 'wrap',
      color: colors.alwaysBlack,
    },
    orchestraContainer: {
      // width: '60%',
      flexShrink: 10,
    },
  });
  const navigation = useNavigation();

  /**
   * @function navigateToJobDetail
   * @memberof Jobs.JobsListRow
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
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{getCountryFlagEmoji(job?.country)}</Text>
      </View>
      <View style={styles.orchestraContainer}>
        <Text style={styles.orchestra} maxFontSizeMultiplier={1.8}>
          {job?.orchestra}
        </Text>
        <Text maxFontSizeMultiplier={1.8}>{job?.position}</Text>
      </View>
      <Text style={styles.closingDate} maxFontSizeMultiplier={2.0}>
        Closing Date:{'\n'}
        {job?.closingDate}
      </Text>
    </Pressable>
  );
}
