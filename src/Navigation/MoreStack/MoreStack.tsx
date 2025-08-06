import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import More from '../../Pages/More/More';
import Licenses from '../../Pages/Licenses/Licenses';
import Acknowledgements from '../../Pages/Acknowledgements/Acknowledgements';
import { useColors } from '../../utils/customHooks/useColors/useColors';
import { RootStackParamList } from '../../Types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * @function MoreStack
 * @component
 * @description All of the screens on the More Tab of the app, collected into
 * a stack to be used by React Navigation
 * Created 4/2/21
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.2.0
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
