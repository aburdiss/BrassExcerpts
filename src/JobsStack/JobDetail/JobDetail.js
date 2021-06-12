import React, {useContext} from 'react';
import {
  ScrollView,
  Text,
  Linking,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import {SafeAreaView} from 'react-native-safe-area-context';

import ActionButton from '../../Components/ActionButton/ActionButton';
import MetaLabel from '../../Components/MetaLabel/MetaLabel';
import SectionHeader from '../../Components/SectionHeader/SectionHeader';

import {PreferencesContext} from '../../Model/Preferences';
import {excerpts as hornExcerpts} from '../../Model/Excerpts/HornExcerpts';
import {excerpts as trumpetExcerpts} from '../../Model/Excerpts/TrumpetExcerpts';
import {excerpts as tromboneExcerpts} from '../../Model/Excerpts/TromboneExcerpts';
import {excerpts as tubaExcerpts} from '../../Model/Excerpts/TubaExcerpts';
import {colors} from '../../Model/Model';
import {getDaysUntilDate} from '../../utils/getDaysUntilDate/getDaysUntilDate';
import {isFavorite} from '../../utils/isFavorite/isFavorite';

/**
 * @todo Update Excerpt list to look like composer Excerpts section.
 *
 * @function JobDetail
 * @description A detailed view of one of the jobs in the app, with a list of
 * excerpts. When clicked, if the excerpt exists in the app, it will lead the
 * user directly to that excerpt.
 * @author Alexander Burdiss
 * @since 3/28/21
 * @version 1.1.0
 * @component
 * @example
 * ```jsx
 * <JobDetail />
 * ```
 */
const JobDetail = () => {
  const route = useRoute();
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

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
   * @version 1.0.0
   */
  function shouldCalendarDisplay() {
    const closingDate = route.params.closingDate;
    const auditionDate = route.params.auditionDate;
    if (!auditionDate) {
      return new Date(closingDate) > new Date();
    }
    return new Date(auditionDate) > new Date();
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

  /**
   * @function JobDetail~Calendar
   * @description The calendar from the display, removed from the display so
   * that props only need to be updated once when the component is rendered
   * in two different modes.
   * @author Alexander Burdiss
   * @since 6/11/21
   * @version 1.0.0
   * @component
   * @example
   * ```jsx
   * <Calendar />
   * ```
   */
  function Calendar() {
    return (
      <CalendarStrip
        style={styles.calendarStrip}
        minDate={new Date()}
        maxDate={
          route.params.auditionDate
            ? new Date(route.params.auditionDate)
            : new Date(route.params.closingDate)
        }
        markedDates={[
          {
            date: new Date(),
            lines: [
              {
                color: colors.greenLight,
              },
            ],
          },
          {
            date: new Date(route.params.closingDate),
            lines: [
              {
                color: colors.orangeLight,
              },
            ],
          },
          {
            date: new Date(route.params.auditionDate),
            lines: [
              {
                color: colors.redLight,
              },
            ],
          },
        ]}
      />
    );
  }

  /**
   * @function JobDetail~MetaContainer
   * @description The Meta Container pulled out into a separate conainer so that
   * it only needs updated once when props change, because it is rendered in
   * two different modes.
   * @author Alexander Burdiss
   * @since 6/11/21
   * @version 1.0.0
   * @component
   * @example
   * ```jsx
   * <MetaContainer />
   * ```
   */
  function MetaContainer() {
    return (
      <View>
        <MetaLabel label="Country" data={route.params.country} />
        <MetaLabel
          label="Closing Date"
          labelColor={colors.orangeLight}
          data={
            route.params.closingDate +
            ` (${getDaysUntilDate(route.params.closingDate)} days from today)`
          }
        />
        {route.params.auditionDate ? (
          <MetaLabel
            label="Audition Date"
            labelColor={colors.redLight}
            data={
              route.params.auditionDate +
              ` (${getDaysUntilDate(
                route.params.auditionDate,
              )} days from today)`
            }
          />
        ) : (
          <MetaLabel
            label="Audition Date"
            labelColor={colors.redLight}
            data={'unknown'}
          />
        )}
      </View>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView edges={['left', 'right']}>
        <Text accessibilityRole="text" style={styles.position}>
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

            const excerptData = [
              hornExcerpts,
              trumpetExcerpts,
              tromboneExcerpts,
              tubaExcerpts,
            ][state.jobsIndex].find((modelExcerpt) => {
              return modelExcerpt.videos == excerpt;
            });

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
                    style={({pressed}) => ({
                      opacity: pressed ? 0.7 : 1,
                      ...styles.excerptButton,
                      ...borderTop,
                    })}
                    onPress={() => {
                      navigateToExcerptDetailPage(excerptData);
                    }}>
                    <Text style={styles.excerptLink}>
                      <Text>{excerptData.composerLast} - </Text>
                      <Text>{excerptData.name}</Text>
                    </Text>
                    <SafeAreaView
                      style={styles.iconContainer}
                      edges={['right']}>
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
                    style={[styles.excerptButton, borderTop]}>
                    <Text>{excerpt}</Text>
                  </View>
                </SafeAreaView>
              );
            }
          })}
        </View>
      ) : (
        <SafeAreaView
          style={styles.noExcerptsContainer}
          edges={['left', 'right']}>
          <Text accessibilityRole="text">
            No excerpts available for this job.
          </Text>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    paddingHorizontal: 20,
  },
  buttonBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.systemGray,
  },
  calendarStrip: {
    height: 80,
    paddingVertical: 5,
  },
  excerptsHeader: {
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 24,
  },
  excerptButton: {
    marginLeft: 20,
    paddingRight: 20,
    height: 45,
    backgroundColor: colors.white,
    borderTopColor: colors.systemGray6Light,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  excerptsContainer: {
    marginBottom: 70,
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray,
    borderTopWidth: 1,
    borderTopColor: colors.systemGray,
    backgroundColor: colors.white,
  },
  excerptLink: {
    color: colors.greenLight,
  },
  iconContainer: {
    flexDirection: 'row',
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
  position: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default JobDetail;
