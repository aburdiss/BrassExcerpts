import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/core';

import MetaLabel from '../../../Components/MetaLabel/MetaLabel';

import { getDaysUntilDate } from '../../../utils/getDaysUntilDate/getDaysUntilDate';
import { getDateFromString } from '../../../utils/getDateFromString/getDateFromString';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace MetaContainer
 * @function MetaContainer
 * @description The Meta Container pulled out into a separate conainer so that
 * it only needs updated once when props change, because it is rendered in
 * two different modes.
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.2.0
 * @component
 * @example
 * <MetaContainer />
 */
export default function MetaContainer() {
  const colors = useColors();
  const route = useRoute();

  return (
    <View>
      <MetaLabel label="Country" data={route.params.country} />
      <MetaLabel
        label="Closing Date"
        labelColor={colors.orange}
        data={
          route.params.closingDate +
          (getDateFromString(route.params.closingDate) > new Date()
            ? ` (${getDaysUntilDate(route.params.closingDate)} days from today)`
            : '')
        }
      />
      {route.params.auditionDate ? (
        <MetaLabel
          label="Audition Date"
          labelColor={colors.red}
          data={
            route.params.auditionDate +
            (getDateFromString(route.params.auditionDate) > new Date()
              ? ` (${getDaysUntilDate(
                  route.params.auditionDate,
                )} days from today)`
              : '')
          }
        />
      ) : (
        <MetaLabel
          label="Audition Date"
          labelColor={colors.red}
          data={'unknown'}
        />
      )}
    </View>
  );
}
