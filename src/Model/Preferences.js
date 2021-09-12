import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

/**
 * @function load
 * @description Loads Data from Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0.2
 * @param {String} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 */
export async function load() {
  try {
    const jsonValue = await AsyncStorage.getItem('preferences');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

/**
 * @function save
 * @description Stores Data in Local Storage
 * @author Alexander Burdiss
 * @since 12/11/20
 * @version 1.0.1
 * @param {String} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 */
export async function save(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('preferences', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

const PreferencesContext = createContext();

/**
 * @function handleRandomFavoritesInstruments
 * @description Handles changing the random selected instruments based on which
 * favorites the user has selected when they change the randomFavorites setting
 * @author Alexander Burdiss
 * @since 5/24/21
 * @version 1.0.0
 * @param {Object} state The state currently stored in the reducer
 * @param {Object} action The action the user has selected.
 * @returns {Object} The new state to store in the reducer, and save to storage.
 * @see preferencesReducer
 */
function handleRandomFavoritesInstruments(state, action) {
  if (action.payload.randomFavorites == 0) {
    // Favorites Only
    if (state.favorites.length == 0) {
      // No Favorites
      Alert.alert('No favorites selected');
      return {
        ...state,
        ...action.payload,
        randomHorn: false,
        randomTrumpet: false,
        randomTrombone: false,
        randomTuba: false,
      };
    } else {
      // Has Favorites
      let hasHorn = false;
      let hasTrumpet = false;
      let hasTrombone = false;
      let hasTuba = false;

      for (let excerpt of state.favorites) {
        if (excerpt.startsWith('horn')) {
          hasHorn = true;
        } else if (excerpt.startsWith('trumpet')) {
          hasTrumpet = true;
        } else if (excerpt.startsWith('trombone')) {
          hasTrombone = true;
        } else if (excerpt.startsWith('tuba')) {
          hasTuba = true;
        }
      }

      return {
        ...state,
        ...action.payload,
        randomHorn: hasHorn,
        randomTrumpet: hasTrumpet,
        randomTrombone: hasTrombone,
        randomTuba: hasTuba,
      };
    }
  } else {
    // All Excerpts
    return {
      ...state,
      ...action.payload,
      randomHorn: true,
      randomTrumpet: true,
      randomTrombone: true,
      randomTuba: true,
    };
  }
}

/**
 * @function handleFavoritesUpdateInstruments
 * @description Handles changing the random selected instruments based on which
 * favorites the user has selected.
 * @author Alexander Burdiss
 * @since 5/24/21
 * @version 1.0.0
 * @param {Object} state The state currently stored in the reducer
 * @param {Object} action The action the user has selected
 * @returns {Object} The new state to store in the reducer, and save to storage.
 * @see preferencesReducer
 */
function handleFavoritesUpdateInstruments(state, action) {
  let hasHorn = false;
  let hasTrumpet = false;
  let hasTrombone = false;
  let hasTuba = false;

  for (let excerpt of action.payload) {
    if (excerpt.startsWith('horn')) {
      hasHorn = true;
    } else if (excerpt.startsWith('trumpet')) {
      hasTrumpet = true;
    } else if (excerpt.startsWith('trombone')) {
      hasTrombone = true;
    } else if (excerpt.startsWith('tuba')) {
      hasTuba = true;
    }
  }

  return {
    ...state,
    favorites: action.payload,
    randomHorn: hasHorn,
    randomTrumpet: hasTrumpet,
    randomTrombone: hasTrombone,
    randomTuba: hasTuba,
  };
}

/**
 * @function preferencesReducer
 * @description A reducer that handles updating the state stored in context,
 * and updates the same state in local storage on the device.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.1.1
 * @param {*} state
 * @param {*} action
 */
const preferencesReducer = (state, action) => {
  // Deal with Random Favorites Instruments
  if (
    action.type == 'SET_SETTING' &&
    Object.keys(action.payload)[0] == 'randomFavorites'
  ) {
    const newState = handleRandomFavoritesInstruments(state, action);
    save(newState);
    return newState;
  }

  // Handle updating random instruments when favorites update
  if (
    state?.randomFavorites == 0 &&
    (action.type == 'ADD_TO_FAVORITES' ||
      action.type == 'REMOVE_FROM_FAVORITES')
  ) {
    const newState = handleFavoritesUpdateInstruments(state, action);
    save(newState);
    return newState;
  }

  let newState;
  switch (action.type) {
    case 'SET_ALL_PREFERENCES':
      newState = { ...action.payload };
      break;
    case 'SET_SETTING':
      newState = { ...state, ...action.payload };
      break;
    case 'ADD_TO_FAVORITES':
      newState = { ...state, favorites: action.payload };
      break;
    case 'REMOVE_FROM_FAVORITES':
      newState = { ...state, favorites: action.payload };
      break;
    case 'RESET_FAVORITES':
      newState = { ...state, favorites: [] };
      break;
    case 'RESET_PREFERENCES':
      newState = initialPreferencesState;
      break;
    default:
      throw new Error(`Unknown Action: ${action.type}`);
  }
  save(newState);
  return newState;
};

const initialPreferencesState = {
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
};

/**
 * @description Provides the user preferences throughout the app.
 * @author Alexander Burdiss
 * @since 12/14/20
 * @version 1.0.0
 * @param {*} props
 *
 * @component
 * @example
 *   <PreferencesProvider>
 *     {..}
 *   </PreferencesProvider>
 */
const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer);

  useEffect(() => {
    load().then((data) => {
      if (data !== null) {
        dispatch({ type: 'SET_ALL_PREFERENCES', payload: data });
      } else {
        dispatch({
          type: 'SET_ALL_PREFERENCES',
          payload: initialPreferencesState,
        });
      }
    });
  }, []);

  return (
    <PreferencesContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export { PreferencesContext, PreferencesProvider };
