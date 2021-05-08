import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PreferencesContext} from '../src/Model/Preferences';

/**
 * @description Mocks the Safe Area Provider and Preferences Context so that
 * screens in the app can be tested when they contain these elements.
 * @param props The JSX props passed to this React component
 * @param props.children The React component that needs tested.
 * @author Alexander Burdiss
 * @since 4/3/21
 */
const MockContext = ({children}) => {
  let state = {
    horn: true,
    trumpet: true,
    trombone: true,
    tuba: true,
    favorites: [],
    jobsIndex: 0,
  };
  // eslint-disable-next-line no-undef
  let dispatch = jest.fn();

  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider value={{state, dispatch}}>
        {children}
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
};

export default MockContext;
