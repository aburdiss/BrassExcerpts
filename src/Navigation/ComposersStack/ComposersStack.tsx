import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Composers from '../../Pages/Composers/Composers';
import ComposerDetail from '../../Pages/ComposerDetail/ComposerDetail';
import ExcerptDetail from '../../Pages/ExcerptDetail/ExcerptDetail';
import { useColors } from '../../utils/customHooks/useColors/useColors';
import { RootStackParamList } from '../../Types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * @function ComposersStack
 * @component
 * @description A react component that holds all of the different screens to
 * display on the composers' stack, and provides them context and proper
 * navigation
 * Created 4/2/21
 * @returns {JSX.Element} JSX Render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.1
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
