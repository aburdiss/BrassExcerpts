import React from 'react';
import 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render } from 'customTestUtils';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { PreferencesContext } from '../src/Model/Preferences';

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

/**
 * @description Mocks the Safe Area Provider and Preferences Context so that
 * screens in the app can be tested when they contain these elements.
 * @param props The JSX props passed to this React component
 * @param props.children The React component that needs tested.
 * @author Alexander Burdiss
 * @since 4/3/21
 */
const MockContext = ({ children }) => {
  let state = {
    horn: true,
    trumpet: true,
    trombone: true,
    tuba: true,
    favorites: [],
    jobsIndex: 0,
    randomFavorites: true,
  };
  // eslint-disable-next-line no-undef
  let dispatch = jest.fn();

  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <PreferencesContext.Provider value={{ state, dispatch }}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
};

function AllTheProviders({ children }) {
  return (
    <MockNavigator>
      <MockContext>{children}</MockContext>
    </MockNavigator>
  );
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
