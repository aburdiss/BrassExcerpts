import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Appearance } from 'react-native';

/**
 * @namespace Preferences
 * @description The Preferences logic that handles storing things in local
 * storage
 */

/**
 * @function load
 * @memberof Preferences
 * @description Loads Data from Local Storage
 * Created 12/11/20
 * @param {string} type Type of data to load.
 * @returns {JSON|null} The stored value or null, depending on if the data is
 * successfully retrieved.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.2
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
 * @memberof Preferences
 * @description Stores Data in Local Storage
 * Created 12/11/20
 * @param {string} type Type of data to store.
 * @param {Object} data Data to be stored in local storage
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.1
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
 * @memberof Preferences
 * @description Handles changing the random selected instruments based on which
 * favorites the user has selected when they change the randomFavorites setting
 * Created 5/24/21
 * @param {Object} state The state currently stored in the reducer
 * @param {Object} action The action the user has selected.
 * @returns {Object} The new state to store in the reducer, and save to storage.
 * @see preferencesReducer
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.0
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
 * @memberof Preferences
 * @description Handles changing the random selected instruments based on which
 * favorites the user has selected.
 * Created 5/24/21
 * @param {Object} state The state currently stored in the reducer
 * @param {Object} action The action the user has selected
 * @returns {Object} The new state to store in the reducer, and save to storage.
 * @see preferencesReducer
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.0.0
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
 * @memberof Preferences
 * @description A reducer that handles updating the state stored in context,
 * and updates the same state in local storage on the device.
 * Created 12/14/20
 * @param {Object} state The currently existing state
 * @param {Object} action The action object that the reducer was called with
 * @returns {Object} The New State after all logic has been handled in the
 * reducer
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.1
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
  renderedTheme: Appearance.getColorScheme(),
};

/**
 * @function PreferencesProvider
 * @memberof Preferences
 * @component
 * @description Provides the user preferences throughout the app.
 * Created 12/14/20
 * @param {Object} props JSX props passed to this React component
 * @param {*} props.children React children to render inside this component
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/7/23
 * @version 1.1.1
 *
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
        let tempData = { ...data, favorites: [...data.favorites] };
        // Ensure that newer portions of data exist
        if (!data.renderedTheme) {
          // If there exists a theme in the settings that is not 'default',
          // use that for the rendered theme.
          if (data.theme && data.theme != 'default') {
            tempData.renderedTheme = data.theme;
          } else {
            // Otherwise, use the system defaults
            tempData.renderedTheme = Appearance.getColorScheme();
          }
        }
        if (!data.theme) {
          tempData.theme = 'default';
        }
        dispatch({ type: 'SET_ALL_PREFERENCES', payload: tempData });
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
