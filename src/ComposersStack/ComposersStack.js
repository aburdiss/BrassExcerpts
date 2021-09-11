import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { colors } from '../Model/Model';
import { useDarkMode } from '../utils/CustomHooks/useDarkMode/useDarkMode';
import Composers from './Composers/Composers';
import ComposerDetail from './ComposerDetail/ComposerDetail';
import ExcerptDetail from '../ExcerptsStack/ExcerptDetail/ExcerptDetail';

const Stack = createStackNavigator();

/**
 * @function ComposersStack
 * @description A react component that holds all of the different screens to
 * display on the composers' stack, and provides them context and proper
 * navigation
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.0.0
 * @component
 * @example
 * ```jsx
 * <ComposersStack />
 * ```
 */
const ComposersStack = () => {
  const darkMode = useDarkMode();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: darkMode ? colors.greenDark : colors.greenLight,
        headerTitleStyle: {
          color: darkMode ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: darkMode ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: darkMode
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
          shadowColor: 'transparent',
        },
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="Composers" component={Composers} />
      <Stack.Screen
        name="Composer Detail"
        component={ComposerDetail}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen
        name="Composer Excerpt Detail"
        component={ExcerptDetail}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default ComposersStack;
