import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import { useRoute } from '@react-navigation/core';

import { getDateFromString } from '../../../utils/getDateFromString/getDateFromString';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace Calendar
 * @function Calendar
 * @description The calendar from the display, removed from the display so
 * that props only need to be updated once when the component is rendered
 * in two different modes.
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.2.0
 * @component
 * @example
 * <Calendar />
 */
export default function Calendar() {
  const colors = useColors();
  const route = useRoute();

  return (
    <CalendarStrip
      shouldAllowFontScaling={false}
      calendarHeaderStyle={{ color: colors.text }}
      dateNumberStyle={{ color: colors.text }}
      dateNameStyle={{ color: colors.text }}
      highlightDateNumberStyle={{ color: colors.text }}
      highlightDateNameStyle={{ color: colors.text }}
      rightSelector={
        <Ionicons name="chevron-forward" color={colors.text} size={24} />
      }
      leftSelector={
        <Ionicons name="chevron-back" color={colors.text} size={24} />
      }
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: 80,
        paddingVertical: 5,
      }}
      minDate={new Date()}
      maxDate={
        route.params.auditionDate
          ? getDateFromString(route.params.auditionDate)
          : getDateFromString(route.params.closingDate)
      }
      // markedDates={[
      //   {
      //     date: new Date(),
      //     lines: [{ color: colors?.green ?? 'rgb(255, 255, 255)' }],
      //   },
      //   {
      //     date: getDateFromString(route.params.closingDate),
      //     lines: [
      //       {
      //         color:
      //           typeof colors.orange == 'string'
      //             ? colors.orange
      //             : 'rgb(255, 255, 255)',
      //       },
      //     ],
      //   },
      //   {
      //     date: getDateFromString(route.params.auditionDate),
      //     lines: [{ color: colors?.red ?? 'rgb(255, 255, 255)' }],
      //   },
      // ]}
    />
  );
}
