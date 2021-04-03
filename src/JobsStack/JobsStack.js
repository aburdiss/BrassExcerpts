import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDarkMode} from 'react-native-dynamic';

import HeaderButton from '../Components/HeaderButton/HeaderButton';
import {colors} from '../Model/Model';
import ExcerptDetail from '../ExcerptsStack/ExcerptDetail/ExcerptDetail';
import Jobs from './Jobs/Jobs';
import TopExcerpts from './TopExcerpts/TopExcerpts';
import PastJobs from './PastJobs/PastJobs';
import JobDetail from './JobDetail/JobDetail';
import CreateCustomAudition from './CreateCustomAudition/CreateCustomAudition';
import CustomAudition from './CustomAudition/CustomAudition';

const Stack = createStackNavigator();

const JobsStack = ({navigation}) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.greenDark : colors.greenLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Past Auditions');
              }}>
              Past
            </HeaderButton>
          ),
          title: 'Current Auditions',
        }}
      />
      <Stack.Screen name="Top Excerpts" component={TopExcerpts} />
      <Stack.Screen
        name="Job Detail"
        component={JobDetail}
        options={({route}) => ({
          title: route.params.orchestra,
        })}
      />
      <Stack.Screen
        name="Jobs Excerpt Detail"
        component={ExcerptDetail}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen name="Past Auditions" component={PastJobs} />
      <Stack.Screen
        name="Create Custom Audition"
        component={CreateCustomAudition}
      />
      <Stack.Screen name="Custom Audition" component={CustomAudition} />
    </Stack.Navigator>
  );
};

export default JobsStack;
