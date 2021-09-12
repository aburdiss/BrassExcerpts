import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useColors } from './src/utils/CustomHooks/useColors/useColors';

import { PreferencesProvider } from './src/Model/Preferences';

import ExcerptsStack from './src/ExcerptsStack/ExcerptsStack';
import ComposersStack from './src/ComposersStack/ComposersStack';
import JobsStack from './src/JobsStack/JobsStack';
import MoreStack from './src/MoreStack/MoreStack';

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

function AppInside() {
  const colors = useColors();

  return (
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
        activeTintColor: colors.green,
        inactiveTintColor: colors.systemGray,
        style: {
          backgroundColor: colors.background2,
          borderTopColor: colors.systemGray5,
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
  );
}

export default App;
