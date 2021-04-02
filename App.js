import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from './src/Model/Model';

import {PreferencesProvider} from './src/Model/Preferences';

import ExcerptsStack from './src/Navigation/ExcerptsStack';
import ComposersStack from './src/Navigation/ComposersStack';
import JobsStack from './src/Navigation/JobsStack';
import MoreStack from './src/Navigation/MoreStack';

const Tab = createBottomTabNavigator();

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
