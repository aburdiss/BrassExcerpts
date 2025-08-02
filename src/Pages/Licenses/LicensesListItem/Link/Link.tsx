// @ts-check
import React from 'react';
import { Text, Linking } from 'react-native';

/**
 * @function Link
 * @memberof Licenses
 * @component
 * @description One link item that opens the main software link in the
 * LicensesListItem component. Text is limited to one line.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Created 12/17/20
 *
 * @param {Object} props The JSX props passed to this React component
 * @param {string} props.url The url to open when the element is tapped.
 * @param {Object} props.style Style to be applied to the element
 * @param {string} props.children Text to be rendered inside this element.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.2
 * @example
 * <Link style={styles.text} url={licenseUrl}>
 *   {licenses}
 * </Link>
 */
export default function Link({
  url,
  style,
  children,
}: {
  url: string;
  style: Object;
  children: string;
}) {
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
