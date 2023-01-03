import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
/**
 * @description Mocks the React Navigation v5 navigation, so that components
 * will not crash when running Jest tests
 * @param props The JSX props passed to this React component
 * @param props.children The React Component that need access to a navigation
 * object
 * @param props.params Initial params to pass to the navigation screen. These
 * will be accessible from the navigation.params.
 * @author Alexander Burdiss
 * @since 5/7/21
 * @version 1.0.0
 */
const MockNavigator = ({ children, params = {} }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MockedScreen" initialParams={params}>
          {() => children}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MockNavigator;
