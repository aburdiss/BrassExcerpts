import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Composers from './Composers/Composers';
import ComposerDetail from './ComposerDetail/ComposerDetail';
import ExcerptDetail from '../ExcerptsStack/ExcerptDetail/ExcerptDetail';
import { useColors } from '../utils/customHooks/useColors/useColors';

const Stack = createStackNavigator();

/**
 * @namespace ComposersStack
 * @function ComposersStack
 * @description A react component that holds all of the different screens to
 * display on the composers' stack, and provides them context and proper
 * navigation
 * @author Alexander Burdiss
 * @since 4/2/21
 * @version 1.0.1
 * @component
 * @example
 * <ComposersStack />
 */
export default function ComposersStack() {
  const colors = useColors();

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
}
