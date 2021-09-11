import React, { useContext } from 'react';
import {
  ScrollView,
  Text,
  Linking,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dynamic';

import Calendar from './Calendar/Calendar';
import MetaContainer from './MetaContainer/MetaContainer';
import ActionButton from '../../Components/ActionButton/ActionButton';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';

import { PreferencesContext } from '../../Model/Preferences';
import { colors } from '../../Model/Model';
import { isFavorite } from '../../utils/isFavorite/isFavorite';
import { useIdleScreen } from '../../utils/CustomHooks/useIdleScreen/useIdleScreen';
import { getDateFromString } from '../../utils/getDateFromString/getDateFromString';
import { getExcerptData } from '../../utils/getExcerptData/getExcerptData';

/**
 * @todo Separate out these internal components to separate files.
 *
 * @function JobDetail
 * @description A detailed view of one of the jobs in the app, with a list of
 * excerpts. When clicked, if the excerpt exists in the app, it will lead the
 * user directly to that excerpt.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.3.0
 * @component
 * @example
 * <JobDetail />
 */
const JobDetail = () => {
  useIdleScreen();

  const route = useRoute();
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const { state } = useContext(PreferencesContext);
  const styles = useDynamicStyleSheet(dynamicStyles);

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
        <SectionHeader>Excerpts</SectionHeader>
      </SafeAreaView>
      {route.params.excerpts?.length > 0 ? (
        <View style={styles.excerptsContainer}>
          {route.params.excerpts.map((excerpt, index) => {
            const borderTop = index != 0 ? styles.buttonBorder : null;

            const excerptData = getExcerptData(
              ['horn', 'trumpet', 'trombone', 'tuba'][state.jobsIndex],
              excerpt,
            );

            if (excerptData) {
              return (
                <SafeAreaView edges={['left']} key={index}>
                  <Pressable
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={
                      excerptData.composerLast + ' ' + excerptData.name
                    }
                    accessibilityHint={
                      'Navigates to excerpt ' +
                      excerptData.composerLast +
                      ' ' +
                      excerptData.name
                    }
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                      ...styles.excerptButton,
                      ...borderTop,
                    })}
                    onPress={() => {
                      navigateToExcerptDetailPage(excerptData);
                    }}
                  >
                    <Text style={styles.excerptLink}>
                      <Text maxFontSizeMultiplier={1.8}>
                        {excerptData.composerLast} -{' '}
                      </Text>
                      <Text maxFontSizeMultiplier={1.8}>
                        {excerptData.name}
                      </Text>
                    </Text>
                    <SafeAreaView
                      style={styles.iconContainer}
                      edges={['right']}
                    >
                      {isFavorite(
                        {
                          ...state,
                          horn: state.jobsIndex == 0,
                          trumpet: state.jobsIndex == 1,
                          trombone: state.jobsIndex == 2,
                          tuba: state.jobsIndex == 3,
                        },
                        excerptData.composerLast,
                        excerptData.name,
                      ) && (
                        <Ionicons
                          name="heart"
                          size={24}
                          color={colors.redLight}
                          style={styles.favoriteIcon}
                        />
                      )}
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={colors.greenLight}
                        style={styles.forwardIcon}
                      />
                    </SafeAreaView>
                  </Pressable>
                </SafeAreaView>
              );
            } else {
              return (
                <SafeAreaView key={index} edges={['left']}>
                  <View
                    accessibilityRole="text"
                    style={[styles.excerptButton, borderTop]}
                  >
                    <Text
                      style={styles.excerptName}
                      maxFontSizeMultiplier={1.8}
                    >
                      {excerpt}
                    </Text>
                  </View>
                </SafeAreaView>
              );
            }
          })}
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
};

const dynamicStyles = new DynamicStyleSheet({
  actionButtonContainer: {
    paddingHorizontal: 20,
  },
  bottomDisclaimer: {
    marginVertical: 20,
  },
  bottomDisclaimerText: {
    color: new DynamicValue(colors.black, colors.white),
    textAlign: 'center',
  },
  buttonBorder: {
    borderTopWidth: 1,
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  excerptButton: {
    marginLeft: 20,
    paddingRight: 20,
    minHeight: 45,
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  excerptName: {
    color: new DynamicValue(colors.black, colors.white),
  },
  excerptsHeader: {
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
  },
  excerptLink: {
    color: new DynamicValue(colors.greenLight, colors.greenDark),
    width: '85%',
    paddingVertical: 13,
  },
  excerptsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
  },
  forwardIcon: {
    paddingRight: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'flex-end',
  },
  jobDetailContainer: {
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
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
    color: new DynamicValue(colors.black, colors.white),
  },
  position: {
    paddingTop: 20,
    paddingHorizontal: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: new DynamicValue(colors.black, colors.white),
  },
});

export default JobDetail;
