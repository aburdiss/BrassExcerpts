import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';
import { getCountryFlagEmoji } from '../../../utils/getCountryFlagEmoji/getCountryFlagEmoji';

/**
 * @todo Add share modal when long press this job.
 *
 * @namespace JobsListRow
 * @function JobsListRow
 * @description One job item in the list of jobs.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.3.0
 * @component
 * @example
 * <JobsListRow job={job} />
 */
export default function JobsListRow({ job }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    closingDate: {
      width: '40%',
      textAlign: 'right',
    },
    container: {
      backgroundColor: colors.green,
      marginVertical: 8,
      padding: 15,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    flag: {
      fontSize: 20,
    },
    flagContainer: {
      position: 'absolute',
      top: -10,
      left: -4,
    },
    orchestra: {
      fontWeight: 'bold',
      flexWrap: 'wrap',
      color: colors.alwaysBlack,
    },
    orchestraContainer: {
      width: '60%',
    },
  });
  const navigation = useNavigation();

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
