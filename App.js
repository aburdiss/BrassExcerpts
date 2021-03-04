import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDarkMode} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Composers from './src/Composers/Composers';
import Excerpts from './src/Excerpts/Excerpts';
import Settings from './src/Settings/Settings';
import {colors} from './src/Model/Model';

const translate = (text) => text;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ExcerptsStack = () => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Excerpts" component={Excerpts} />
    </Stack.Navigator>
  );
};

const ComposersStack = () => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Composers" component={Composers} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const App = () => {
  const DARKMODE = useDarkMode();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName;
              if (route.name === 'Excerpts') {
                iconName = 'book';
              } else if (route.name === 'Composers') {
                iconName = 'list';
              } else if (route.name === 'Settings') {
                iconName = 'options';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: DARKMODE ? colors.orangeDark : colors.orangeLight,
            inactiveTintColor: colors.systemGray,
            style: {
              backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
              borderTopColor: DARKMODE
                ? colors.systemGray5Dark
                : colors.systemGray5Light,
            },
          }}>
          <Tab.Screen
            name="Excerpts"
            component={ExcerptsStack}
            options={{title: translate('Excerpts')}}
          />
          <Tab.Screen
            name="Composers"
            component={ComposersStack}
            options={{title: translate('Composers')}}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStack}
            options={{title: translate('Settings')}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
