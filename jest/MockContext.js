import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider, QueryClient } from 'react-query';
import { PreferencesContext } from '../src/Model/Preferences';

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
    randomFavorites: 1,
    randomHorn: true,
    randomTrumpet: true,
    randomTrombone: true,
    randomTuba: true,
    alwaysCollapse: false,
    keepScreenOn: false,
    theme: 'default',
    renderedTheme: 'light',
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

export default MockContext;
