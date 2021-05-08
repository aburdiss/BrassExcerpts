import React, {useContext} from 'react';
import {
  ScrollView,
  Text,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';

import ActionButton from '../../Components/ActionButton/ActionButton';
import MetaLabel from '../../Components/MetaLabel/MetaLabel';

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
 * @todo Make Calendar not appear if current date is past the closing date.
 */
const JobDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  function openAuditionWebsite() {
    Linking.openURL(route.params.link).catch((err) =>
      console.warn("Couldn't load page", err),
    );
  }

  function navigateToExcerptDetailPage(excerpt) {
    navigation.navigate('Jobs Excerpt Detail', excerpt);
  }

  return (
    <ScrollView>
      <View style={styles.metaContainer}>
        <Text style={styles.position}>{route.params.position}</Text>
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
      <View style={styles.actionButtonContainer}>
        <ActionButton onPress={openAuditionWebsite}>View Posting</ActionButton>
      </View>
      <Text style={styles.excerptsHeader}>Excerpts</Text>
      <View style={styles.excerptsContainer}>
        {route.params.excerpts.map((excerpt, index) => {
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
              <Pressable
                key={index}
                style={({pressed}) => ({
                  opacity: pressed ? 0.7 : 1,
                  ...styles.excerptButton,
                })}
                onPress={() => {
                  navigateToExcerptDetailPage(excerptData);
                }}>
                <Text style={styles.excerptLink}>
                  <Text>{excerptData.composerLast} - </Text>
                  <Text>{excerptData.name}</Text>
                </Text>
                <View style={styles.iconContainer}>
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
                </View>
              </Pressable>
            );
          } else {
            return (
              <View key={index} style={styles.excerptButton}>
                <Text>{excerpt}</Text>
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
    borderBottomColor: colors.systemGray6Light,
    borderBottomWidth: 1,
  },
  excerptLink: {
    color: colors.greenLight,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  metaContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  position: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default JobDetail;
