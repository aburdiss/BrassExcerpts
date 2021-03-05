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
import More from './src/More/More';

const translate = (text) => text;

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
        headerBackTitle: translate('Back'),
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
          title: translate('Custom Routines'),
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
        headerBackTitle: translate('Back'),
      }}>
      <Stack.Screen name="Composers" component={Composers} />
      <Stack.Screen
        name="Composer Detail"
        component={ComposerDetail}
        options={({route}) => ({
          title: route.params.item,
        })}
      />
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
        headerBackTitle: translate('Back'),
      }}>
      <Stack.Screen name="More" component={More} />
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
            name="More"
            component={MoreStack}
            options={{title: translate('More')}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
