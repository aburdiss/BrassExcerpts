import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useColors } from './src/utils/customHooks/useColors/useColors';

import { PreferencesProvider } from './src/Model/Preferences';

import ExcerptsStack from './src/Navigation/ExcerptsStack/ExcerptsStack';
import ComposersStack from './src/Navigation/ComposersStack/ComposersStack';
import JobsStack from './src/Navigation/JobsStack/JobsStack';
import MoreStack from './src/Navigation/MoreStack/MoreStack';
import { useTheme } from './src/utils/customHooks/useTheme/useTheme';
import { StatusBar } from 'react-native';
import { getDarkOrLightThemeInverse } from './src/utils/getDarkOrLightThemeInverse/getDarkOrLightThemeInverse';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PreferencesProvider>
          <NavigationContainer>
            <AppInside />
          </NavigationContainer>
        </PreferencesProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

function getTabBarIcon({
  color,
  size,
  route,
}: {
  color: string;
  size: number;
  route: { name: string };
}) {
  let iconName = '';
  if (route.name === 'ExcerptsStack') {
    iconName = 'musical-notes';
  } else if (route.name === 'ComposersStack') {
    iconName = 'people-outline';
  } else if (route.name === 'JobsStack') {
    iconName = 'briefcase';
  } else if (route.name === 'MoreStack') {
    iconName = 'options';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
}

function AppInside() {
  const colors = useColors();
  const theme = useTheme();

  return (
    <>
      <StatusBar barStyle={`${getDarkOrLightThemeInverse(theme)}-content`} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon({ color, size, route }),
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.systemGray,
          tabBarStyle: {
            backgroundColor: colors.background2,
            borderTopColor: colors.systemGray5,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="ExcerptsStack"
          component={ExcerptsStack}
          options={{ title: 'Excerpts' }}
        />
        <Tab.Screen
          name="ComposersStack"
          component={ComposersStack}
          options={{ title: 'Composers' }}
        />
        <Tab.Screen
          name="JobsStack"
          component={JobsStack}
          options={{ title: 'Jobs' }}
        />
        <Tab.Screen
          name="MoreStack"
          component={MoreStack}
          options={{ title: 'More' }}
        />
      </Tab.Navigator>
    </>
  );
}

export default App;
