import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/core';

import MetaLabel from '../../../Components/MetaLabel/MetaLabel';

import { colors } from '../../../Model/Model';
import { getDaysUntilDate } from '../../../utils/getDaysUntilDate/getDaysUntilDate';
import { getDateFromString } from '../../../utils/getDateFromString/getDateFromString';

/**
 * @function MetaContainer
 * @description The Meta Container pulled out into a separate conainer so that
 * it only needs updated once when props change, because it is rendered in
 * two different modes.
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.1.0
 * @component
 * @example
 * <MetaContainer />
 */
export default function MetaContainer() {
  const route = useRoute();

  return (
    <View>
      <MetaLabel label="Country" data={route.params.country} />
      <MetaLabel
        label="Closing Date"
        labelColor={colors.orangeLight}
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
          labelColor={colors.redLight}
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
          labelColor={colors.redLight}
          data={'unknown'}
        />
      )}
    </View>
  );
}
