import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PreferencesContext} from '../src/Model/Preferences';

const MockContext = ({children}) => {
  let state = {
    horn: true,
    trumpet: true,
    trombone: true,
    tuba: true,
    favorites: [],
    jobsIndex: 0,
  };
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
