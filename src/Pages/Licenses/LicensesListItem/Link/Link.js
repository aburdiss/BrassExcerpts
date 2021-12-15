import React from 'react';
import { Text, Linking } from 'react-native';

/**
 * @namespace Link
 * @function Link
 * @description One link item that opens the main software link in the
 * LicensesListItem component. Text is limited to one line.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
 * @param {String} props.url The url to open when the element is tapped.
 * @param {Object} props.style Style to be applied to the element
 * @param {String} props.children Text to be rendered inside this element.
 *
 * @component
 * @example
 * <Link style={styles.text} url={licenseUrl}>
 *   {licenses}
 * </Link>
 */
export default function Link({ url, style, children }) {
  return (
    <Text
      style={style}
      numberOfLines={1}
      accessibilityRole="link"
      accessibilityLabel={children}
      accessibilityHint={'Opens in default browser'}
      onPress={() => url && Linking.openURL(url)}
    >
      {children}
    </Text>
  );
}
