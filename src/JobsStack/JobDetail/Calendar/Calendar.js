import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import { useRoute } from '@react-navigation/core';

import { colors } from '../../../Model/Model';
import { getDateFromString } from '../../../utils/getDateFromString/getDateFromString';
import { useDarkMode } from '../../../utils/CustomHooks/useDarkMode/useDarkMode';

/**
 * @function Calendar
 * @description The calendar from the display, removed from the display so
 * that props only need to be updated once when the component is rendered
 * in two different modes.
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.1.0
 * @component
 * @example
 * <Calendar />
 */
export default function Calendar() {
  const route = useRoute();
  const darkMode = useDarkMode();

  return (
    <CalendarStrip
      shouldAllowFontScaling={false}
      calendarHeaderStyle={{ color: darkMode ? colors.white : colors.black }}
      dateNumberStyle={{ color: darkMode ? colors.white : colors.black }}
      dateNameStyle={{ color: darkMode ? colors.white : colors.black }}
      highlightDateNumberStyle={{
        color: darkMode ? colors.white : colors.black,
      }}
      highlightDateNameStyle={{
        color: darkMode ? colors.white : colors.black,
      }}
      rightSelector={
        <Ionicons
          name="chevron-forward"
          color={darkMode ? colors.white : colors.black}
          size={24}
        />
      }
      leftSelector={
        <Ionicons
          name="chevron-back"
          color={darkMode ? colors.white : colors.black}
          size={24}
        />
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
      markedDates={[
        {
          date: new Date(),
          lines: [
            {
              color: darkMode ? colors.greenDark : colors.greenLight,
            },
          ],
        },
        {
          date: getDateFromString(route.params.closingDate),
          lines: [
            {
              color: darkMode ? colors.orangeDark : colors.orangeLight,
            },
          ],
        },
        {
          date: getDateFromString(route.params.auditionDate),
          lines: [
            {
              color: darkMode ? colors.redDark : colors.redLight,
            },
          ],
        },
      ]}
    />
  );
}
