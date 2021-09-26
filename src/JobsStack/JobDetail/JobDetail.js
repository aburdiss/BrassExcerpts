import React, { useContext } from 'react';
import {
  ScrollView,
  Text,
  Linking,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

import Calendar from './Calendar/Calendar';
import MetaContainer from './MetaContainer/MetaContainer';
import ActionButton from '../../Components/ActionButton/ActionButton';
import SectionHeading from '../../Components/SectionHeading/SectionHeading';
import ConditionalExcerptLink from '../../Components/ConditionalExcerptLink/ConditionalExcerptLink';

import { PreferencesContext } from '../../Model/Preferences';
import { useIdleScreen } from '../../utils/CustomHooks/useIdleScreen/useIdleScreen';
import { getDateFromString } from '../../utils/getDateFromString/getDateFromString';
import { useColors } from '../../utils/CustomHooks/useColors/useColors';
import { getInstrumentsSelected } from '../../utils/getInstrumentsSelected/getInstrumentsSelected';
import { capitalize } from '../../utils/captiatlize/capitalize';

/**
 * @namespace JobDetail
 * @function JobDetail
 * @description A detailed view of one of the jobs in the app, with a list of
 * excerpts. When clicked, if the excerpt exists in the app, it will lead the
 * user directly to that excerpt.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.4.0
 * @component
 * @example
 * <JobDetail />
 */
export default function JobDetail() {
  const colors = useColors();
  const styles = StyleSheet.create({
    actionButtonContainer: {
      paddingHorizontal: 20,
    },
    bottomDisclaimer: {
      marginVertical: 20,
    },
    bottomDisclaimerText: {
      color: colors.text,
      textAlign: 'center',
    },
    excerptsContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.systemGray5,
      borderTopWidth: 1,
      borderTopColor: colors.systemGray5,
      backgroundColor: colors.background2,
    },
    jobDetailContainer: {
      backgroundColor: colors.background,
    },
    metaContainer: {
      paddingHorizontal: 20,
    },
    metaContainerHorizontal: {
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    metaContainerLeft: {
      width: '50%',
    },
    metaContainerRight: {
      width: '50%',
    },
    noExcerptsContainer: {
      padding: 20,
    },
    noExcerptsText: {
      color: colors.text,
      textAlign: 'center',
    },
    position: {
      paddingTop: 20,
      paddingHorizontal: 10,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text,
    },
  });
  useIdleScreen();

  const route = useRoute();
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const { state } = useContext(PreferencesContext);

  /**
   * @function JobDetail~openAuditionWebsite
   * @description Opens the audition website, if possible. Console logs if not.
   * @author Alexander Burdiss
   * @since 3/28/21
   * @version 1.0.0
   */
  function openAuditionWebsite() {
    Linking.openURL(route.params.link).catch((err) =>
      console.warn("Couldn't load page", err),
    );
  }

  /**
   * @function JobDetail~isPhonePortrait
   * @description A function that determines if the display is a phone portrait
   * or not.
   * @returns {Boolean} Whether or not the display is a phone portrait.
   * @author Alexander Burdiss
   * @since 5/29/21
   * @version 1.0.0
   */
  function isPhonePortrait() {
    const maxPhonePortraitWidth = 650;
    return width < maxPhonePortraitWidth;
  }

  /**
   * @function JobDetail~shouldCalendarDisplay
   * @description A function that determines whether or not the calendar should
   * display on the Job Detail screen.
   * @returns {Boolean} Whether or not the calendar should appear on the job
   * view.
   * @author Alexander Burdiss
   * @since 5/29/21
   * @version 1.0.1
   */
  function shouldCalendarDisplay() {
    const closingDate = route.params.closingDate;
    const auditionDate = route.params.auditionDate;
    if (!auditionDate) {
      return getDateFromString(closingDate) > new Date();
    }
    return getDateFromString(auditionDate) > new Date();
  }

  /**
   * @function JobDetail~navigateToExcerptDetailPage
   * @description Opens the excerpt detail page with the appropriate excerpt
   * data passed in
   * @author Alexander Burdiss
   * @since 3/28/21
   * @version 1.0.0
   * @param {Object} excerpt The excerpt to display in detail
   */
  function navigateToExcerptDetailPage(excerpt) {
    navigation.navigate('Jobs Excerpt Detail', excerpt);
  }

  const instrument = ['horn', 'trumpet', 'trombone', 'tuba'][state.jobsIndex];
  const activeInstruments = getInstrumentsSelected(state);
  const instrumentActive = activeInstruments.includes(capitalize(instrument));
  const hasExcerpts = route.params.excerpts?.length > 0;

  return (
    <ScrollView style={styles.jobDetailContainer}>
      <SafeAreaView edges={['left', 'right']}>
        <Text
          accessibilityRole="text"
          style={styles.position}
          maxFontSizeMultiplier={1.8}
        >
          {route.params.position}
        </Text>
        {isPhonePortrait() ? (
          <View style={styles.metaContainer}>
            <MetaContainer />
            {shouldCalendarDisplay() && <Calendar />}
          </View>
        ) : (
          <View style={styles.metaContainerHorizontal}>
            <View style={styles.metaContainerLeft}>
              <MetaContainer />
            </View>
            <View style={styles.metaContainerRight}>
              {shouldCalendarDisplay() && <Calendar />}
            </View>
          </View>
        )}
        <View style={styles.actionButtonContainer}>
          <ActionButton onPress={openAuditionWebsite}>
            View Posting
          </ActionButton>
        </View>
        {hasExcerpts && !instrumentActive && (
          <SafeAreaView
            style={styles.noExcerptsContainer}
            edges={['left', 'right']}
          >
            <Text
              accessibilityRole="text"
              style={styles.noExcerptsText}
              maxFontSizeMultiplier={1.8}
            >
              Enable This instrument in settings to be able to view available
              excerpts
            </Text>
          </SafeAreaView>
        )}
        <SectionHeading>Excerpts</SectionHeading>
      </SafeAreaView>
      {hasExcerpts ? (
        <View style={styles.excerptsContainer}>
          {route.params.excerpts.map((excerpt, index) => (
            <ConditionalExcerptLink
              instrument={instrument}
              state={state}
              excerpt={excerpt}
              navigateToExcerptDetail={navigateToExcerptDetailPage}
              key={index}
              index={index}
            />
          ))}
        </View>
      ) : (
        <SafeAreaView
          style={styles.noExcerptsContainer}
          edges={['left', 'right']}
        >
          <Text
            accessibilityRole="text"
            style={styles.noExcerptsText}
            maxFontSizeMultiplier={1.8}
          >
            No excerpts available for this job.
          </Text>
        </SafeAreaView>
      )}
      <View style={styles.bottomDisclaimer}>
        <Text style={styles.bottomDisclaimerText}>
          Check official job posts for exact excerpt requirements.
        </Text>
      </View>
    </ScrollView>
  );
}
