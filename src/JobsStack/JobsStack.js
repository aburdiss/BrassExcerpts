import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../Model/Model';
import { useDarkMode } from '../utils/CustomHooks/useDarkMode/useDarkMode';

import HeaderButton from '../Components/HeaderButton/HeaderButton';
import ExcerptDetail from '../ExcerptsStack/ExcerptDetail/ExcerptDetail';
import Jobs from './Jobs/Jobs';
import TopExcerpts from './TopExcerpts/TopExcerpts';
import PastJobs from './PastJobs/PastJobs';
import JobDetail from './JobDetail/JobDetail';
import CreateCustomAudition from './CreateCustomAudition/CreateCustomAudition';
import CustomAudition from './CustomAudition/CustomAudition';

const Stack = createStackNavigator();

/**
 * @function JobsStack
 * @description The stack of all of the screens on the Job stack of the app.
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.0.0
 * @param props The JSX props passed to this React Component
 * @param {Object} props.navigation The navigation object passed to this stack
 * from the Tab Navigator.
 * @component
 * @example
 * ```jsx
 * <JobsStack />
 * ```
 */
const JobsStack = ({ navigation }) => {
  const darkMode = useDarkMode();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: darkMode ? colors.greenDark : colors.greenLight,
        headerTitleStyle: {
          color: darkMode ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: darkMode ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: darkMode
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Past Auditions');
              }}
            >
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
        options={({ route }) => ({
          title: route.params.orchestra,
        })}
      />
      <Stack.Screen
        name="Jobs Excerpt Detail"
        component={ExcerptDetail}
        options={({ route }) => ({
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
