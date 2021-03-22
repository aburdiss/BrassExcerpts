import React, {useContext} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {colors} from '../../Model/Model';
import {PreferencesContext} from '../../Model/Preferences';

/**
 * @todo Style this component.
 *
 * @description The header for the Excerpts list view.
 * @author Alexander Burdiss
 * @since 3/7/21
 * @version 1.0.0
 *
 * @component
 * @example
 * ```jsx
 * <ExcerptListHeader />
 * ```
 */
const ExcerptListHeader = () => {
  const navigation = useNavigation();
  const {state} = useContext(PreferencesContext);

  return (
    <View style={styles.container}>
      <Pressable>
        {state.horn && <Text style={styles.instrumentText}>Horn</Text>}
        {state.trumpet && <Text style={styles.instrumentText}>Trumpet</Text>}
        {state.trombone && <Text style={styles.instrumentText}>Trombone</Text>}
        {state.tuba && <Text style={styles.instrumentText}>Tuba</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.systemGray2Light,
  },
  instrumentText: {
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
  },
  topButton: {
    backgroundColor: colors.greenDark,
    padding: 10,
    borderRadius: 8,
  },
  topText: {
    fontSize: 16,
  },
});

export default ExcerptListHeader;
