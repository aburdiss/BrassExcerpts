import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../Model/Model';
import { useDarkMode } from '../utils/CustomHooks/useDarkMode/useDarkMode';

import More from './More/More';
import Licenses from './Licenses/Licenses';
import Acknowledgements from './Acknowledgements/Acknowledgements';

const Stack = createStackNavigator();

/**
 * @namespace MoreStack
 * @function MoreStack
 * @description All of the screens on the More Tab of the app, collected into
 * a stack to be used by React Navigation
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.1.0
 * @component
 * @example
 * <MoreStack />
 */
const MoreStack = () => {
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
      }}
    >
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Licenses" component={Licenses} />
      <Stack.Screen name="Acknowledgements" component={Acknowledgements} />
    </Stack.Navigator>
  );
};

export default MoreStack;
