import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import More from './More/More';
import Licenses from './Licenses/Licenses';
import Acknowledgements from './Acknowledgements/Acknowledgements';
import { useColors } from '../utils/CustomHooks/useColors/useColors';

const Stack = createStackNavigator();

/**
 * @namespace MoreStack
 * @function MoreStack
 * @description All of the screens on the More Tab of the app, collected into
 * a stack to be used by React Navigation
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.2.0
 * @component
 * @example
 * <MoreStack />
 */
export default function MoreStack() {
  const colors = useColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.green,
        headerTitleStyle: { color: colors.text },
        headerStyle: {
          backgroundColor: colors.background2,
          borderBottomWidth: 1,
          borderBottomColor: colors.systemGray5,
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
}
