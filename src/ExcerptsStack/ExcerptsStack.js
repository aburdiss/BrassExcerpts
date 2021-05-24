import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDarkMode} from 'react-native-dynamic';

import HeaderButton from '../Components/HeaderButton/HeaderButton';
import {colors} from '../Model/Model';
import Excerpts from './Excerpts/Excerpts';
import ExcerptDetail from './ExcerptDetail/ExcerptDetail';
import RandomExcerpt from './RandomExcerpt/RandomExcerpt';
import {PreferencesContext} from '../Model/Preferences';
import {Alert} from 'react-native';

const Stack = createStackNavigator();

/**
 * @function ExcerptsStack
 * @description A Stack Navigator that handles all of the screens on the
 * Excerpts stack.
 * @param props The JSX props passed to this React Component
 * @param {Object} props.navigation The navigation object passed directly to
 * this screen from the Tab Navigator in App.js
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.0.0
 */
const ExcerptsStack = ({navigation}) => {
  const DARKMODE = useDarkMode();
  const {state} = useContext(PreferencesContext);

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
                if (state.randomFavorites == 0 && state.favorites.length == 0) {
                  Alert.alert('No Favorites Selected!');
                } else {
                  navigation.navigate('Random Excerpt');
                }
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

export default ExcerptsStack;
