import React from 'react';
import {
  Text,
  Pressable,
  View,
  Linking,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Link from './Link/Link';
import { useColors } from '../../../utils/CustomHooks/useColors/useColors';

/**
 * @namespace LicensesListItem
 * @function LicensesListItem
 * @description A styled list item that contains links to the authors of the
 * various softwares used throughout the app, and the users who contributed
 * to them.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @date 12/17/20
 * @version 1.3.0
 * @param {String} props.image The url of the image to display.
 * @param {String} props.userUrl The url of the author of this software.
 * @param {String} props.username The username of the author of the software
 * using this license.
 * @param {String} props.name The name of the author of the software using this
 * license.
 * @param {String} props.version The version number of the software using this
 * license.
 * @param {String} props.licenses The text to render inside the main section
 * of this license link.
 * @param {String} props.repository The url of the Github repository to link
 * to.
 * @param {String} props.licenseUrl The url to the currently referenced
 * license.
 * @component
 * @example
 * <LicensesListItem {...item} />
 */
export default function LicensesListItem({
  image,
  userUrl,
  username,
  name,
  version,
  licenses,
  repository,
  licenseUrl,
}) {
  const colors = useColors();
  const styles = StyleSheet.create({
    arrow: { alignSelf: 'center' },
    card: {
      overflow: 'hidden',
      flexDirection: 'row',
      backgroundColor: colors.background2,

      alignItems: 'center',
      paddingLeft: 12,
    },
    item: {
      paddingVertical: 12,
      paddingRight: 12,
      marginLeft: 12,
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      maxWidth: '100%',
      flexWrap: 'wrap',
      borderBottomColor: colors.systemGray5,
      borderBottomWidth: 1,
    },
    licenseText: { maxWidth: '88%' },
    name: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 16,
    },
    image: {
      aspectRatio: 1,
      width: 58,
      borderRadius: 29,
      backgroundColor: 'white',
    },

    text: {
      color: colors.systemGray,
      marginTop: 3,
    },
  });

  let title = name;
  if (username) {
    if (title.toLowerCase() != username.toLowerCase()) {
      title += ` by ${username}`;
    }
  }

  return (
    <View>
      <View style={styles.cardShadow}>
        <View style={styles.card}>
          {image && (
            <Pressable
              accessibilityRole="link"
              accessibilityHint={'Opens github account for ' + title}
              accessibilityLabel={title}
              onPress={() => Linking.openURL(userUrl)}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
          )}
          <Pressable
            onPress={() => Linking.openURL(repository)}
            android_ripple={{
              color: colors.green,
            }}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              ...styles.item,
            })}
          >
            <View style={styles.licenseText}>
              <Text accessibilityRole="text" style={styles.name}>
                {title}
              </Text>
              <Link style={styles.text} url={licenseUrl}>
                {licenses}
              </Link>
              <Link style={styles.text}>{version}</Link>
            </View>
            <Ionicons
              style={styles.arrow}
              color={colors.green}
              size={25}
              name={'chevron-forward-outline'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
