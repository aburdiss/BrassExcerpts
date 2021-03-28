import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderButton from './src/Components/HeaderButton';
import {colors} from './src/Model/Model';
import Composers from './src/Composers/Composers';
import ComposerDetail from './src/Composers/ComposerDetail';
import Excerpts from './src/Excerpts/Excerpts';
import ExcerptDetail from './src/Excerpts/ExcerptDetail';
import RandomExcerpt from './src/Excerpts/RandomExcerpt';
import Jobs from './src/Jobs/Jobs';
import More from './src/More/More';
import TopExcerpts from './src/Jobs/TopExcerpts';
import Licenses from './src/More/Licenses';
import Acknowledgements from './src/More/Acknowledgements';

import {PreferencesContext, PreferencesProvider} from './src/Model/Preferences';
import PastJobs from './src/Jobs/PastJobs';
import JobDetail from './src/Jobs/JobDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ExcerptsStack = ({navigation}) => {
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
        name="Excerpts"
        component={Excerpts}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                navigation.navigate('Random Excerpt');
              }}>
              Random
            </HeaderButton>
          ),
          title: 'BrassXcerpts',
        }}
      />
      <Stack.Screen
        name="Excerpt Detail"
        component={ExcerptDetail}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen name="Random Excerpt" component={RandomExcerpt} />
    </Stack.Navigator>
  );
};

const ComposersStack = ({navigation}) => {
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
      <Stack.Screen name="Composers" component={Composers} />
      <Stack.Screen
        name="Composer Detail"
        component={ComposerDetail}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen
        name="Composer Excerpt Detail"
        component={ExcerptDetail}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
};

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
    </Stack.Navigator>
  );
};

const MoreStack = ({navigation}) => {
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
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Licenses" component={Licenses} />
      <Stack.Screen name="Acknowledgements" component={Acknowledgements} />
    </Stack.Navigator>
  );
};

const App = () => {
  const DARKMODE = useDarkMode();
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({color, size}) => {
                let iconName;
                if (route.name === 'Excerpts') {
                  iconName = 'musical-notes';
                } else if (route.name === 'Composers') {
                  iconName = 'people-outline';
                } else if (route.name === 'Jobs') {
                  iconName = 'briefcase';
                } else if (route.name === 'More') {
                  iconName = 'options';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: DARKMODE ? colors.greenDark : colors.greenLight,
              inactiveTintColor: colors.systemGray,
              style: {
                backgroundColor: DARKMODE
                  ? colors.systemGray6Dark
                  : colors.white,
                borderTopColor: DARKMODE
                  ? colors.systemGray5Dark
                  : colors.systemGray5Light,
              },
            }}>
            <Tab.Screen
              name="Excerpts"
              component={ExcerptsStack}
              options={{title: 'Excerpts'}}
            />
            <Tab.Screen
              name="Composers"
              component={ComposersStack}
              options={{title: 'Composers'}}
            />
            <Tab.Screen
              name="Jobs"
              component={JobsStack}
              options={{title: 'Jobs'}}
            />
            <Tab.Screen
              name="More"
              component={MoreStack}
              options={{title: 'More'}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
};

export default App;
