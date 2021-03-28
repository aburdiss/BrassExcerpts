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

import ActionButton from '../Components/ActionButton';
import MetaLabel from '../Components/MetaLabel';

import {PreferencesContext} from '../Model/Preferences';
import {excerpts as hornExcerpts} from '../Model/Excerpts/HornExcerpts';
import {excerpts as trumpetExcerpts} from '../Model/Excerpts/TrumpetExcerpts';
import {excerpts as tromboneExcerpts} from '../Model/Excerpts/TromboneExcerpts';
import {excerpts as tubaExcerpts} from '../Model/Excerpts/TubaExcerpts';
import {getDaysUntilDate} from './JobsUtils';
import {colors} from '../Model/Model';

/**
 * @todo Update Excerpt list to look like composer Excerpts section.
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
        <MetaLabel
          label="Closing Date"
          data={
            route.params.closingDate +
            ` (${getDaysUntilDate(route.params.closingDate)} days from today)`
          }
        />
        <MetaLabel label="Country" data={route.params.country} />
      </View>
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
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={colors.greenLight}
                />
              </Pressable>
            );
          } else {
            return (
              <View style={styles.excerptButton}>
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
