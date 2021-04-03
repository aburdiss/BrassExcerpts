import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import More from './More/More';
import Licenses from './Licenses/Licenses';
import Acknowledgements from './Acknowledgements/Acknowledgements';

const Stack = createStackNavigator();

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
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Licenses" component={Licenses} />
      <Stack.Screen name="Acknowledgements" component={Acknowledgements} />
    </Stack.Navigator>
  );
};

export default MoreStack;
