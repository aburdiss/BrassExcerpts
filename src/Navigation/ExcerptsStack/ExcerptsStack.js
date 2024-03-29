import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { PreferencesContext } from '../../Model/Preferences';
import { useColors } from '../../utils/customHooks/useColors/useColors';

import Excerpts from '../../Pages/Excerpts/Excerpts';
import ExcerptDetail from '../../Pages/ExcerptDetail/ExcerptDetail';
import RandomExcerpt from '../../Pages/RandomExcerpt/RandomExcerpt';
import HeaderButton from '../../Components/HeaderButton/HeaderButton';
import TopExcerpts from '../../Pages/TopExcerpts/TopExcerpts';

const Stack = createStackNavigator();

/**
 * @function ExcerptsStack
 * @component
 * @description A Stack Navigator that handles all of the screens on the
 * Excerpts stack.
 * Created 4/2/21
 * @param {Object} props The JSX props passed to this React Component
 * @param {Object} props.navigation The navigation object passed directly to
 * this screen from the Tab Navigator in App.js
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
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
      <Stack.Screen name="Top Excerpts" component={TopExcerpts} />
    </Stack.Navigator>
  );
}
