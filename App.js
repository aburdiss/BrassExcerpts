import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from 'react-query';

import { colors } from './src/Model/Model';
import { useDarkMode } from './src/utils/CustomHooks/useDarkMode/useDarkMode';

import { PreferencesProvider } from './src/Model/Preferences';

import ExcerptsStack from './src/ExcerptsStack/ExcerptsStack';
import ComposersStack from './src/ComposersStack/ComposersStack';
import JobsStack from './src/JobsStack/JobsStack';
import MoreStack from './src/MoreStack/MoreStack';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const App = () => {
  const darkMode = useDarkMode();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PreferencesProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
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
                activeTintColor: darkMode
                  ? colors.greenDark
                  : colors.greenLight,
                inactiveTintColor: colors.systemGray,
                style: {
                  backgroundColor: darkMode
                    ? colors.systemGray6Dark
                    : colors.white,
                  borderTopColor: darkMode
                    ? colors.systemGray5Dark
                    : colors.systemGray5Light,
                },
              }}
            >
              <Tab.Screen
                name="Excerpts"
                component={ExcerptsStack}
                options={{ title: 'Excerpts' }}
              />
              <Tab.Screen
                name="Composers"
                component={ComposersStack}
                options={{ title: 'Composers' }}
              />
              <Tab.Screen
                name="Jobs"
                component={JobsStack}
                options={{ title: 'Jobs' }}
              />
              <Tab.Screen
                name="More"
                component={MoreStack}
                options={{ title: 'More' }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PreferencesProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
