import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { PreferencesContext } from '../Model/Preferences';
import { useColors } from '../utils/CustomHooks/useColors/useColors';

import Excerpts from './Excerpts/Excerpts';
import ExcerptDetail from './ExcerptDetail/ExcerptDetail';
import RandomExcerpt from './RandomExcerpt/RandomExcerpt';
import HeaderButton from '../Components/HeaderButton/HeaderButton';

const Stack = createStackNavigator();

/**
 * @namespace ExcerptsStack
 * @function ExcerptsStack
 * @description A Stack Navigator that handles all of the screens on the
 * Excerpts stack.
 * @param props The JSX props passed to this React Component
 * @param {Object} props.navigation The navigation object passed directly to
 * this screen from the Tab Navigator in App.js
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.2.0
 */
export default function ExcerptsStack({ navigation }) {
  const colors = useColors();
  const { state } = useContext(PreferencesContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.green,
        headerTitleStyle: {
          color: colors.text,
        },
        headerStyle: {
          backgroundColor: colors.background2,
          borderBottomWidth: 1,
          borderBottomColor: colors.systemGray5,
          shadowColor: 'transparent',
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="Excerpts"
        component={Excerpts}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={() => {
                if (state.randomFavorites == 0 && state.favorites.length == 0) {
                  Alert.alert('No Favorites Selected!');
                } else {
                  navigation.navigate('Random Excerpt');
                }
              }}
            >
              Random
            </HeaderButton>
          ),
          title: 'BrassXcerpts',
        }}
      />
      <Stack.Screen
        name="Excerpt Detail"
        component={ExcerptDetail}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen name="Random Excerpt" component={RandomExcerpt} />
    </Stack.Navigator>
  );
}
