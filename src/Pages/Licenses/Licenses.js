/*



*/

import React from 'react';
import { capitalize } from '../../utils/captiatlize/capitalize';
import { SafeAreaView } from 'react-native-safe-area-context';

import Data from './licenses.json';

import LicensesList from './LicensesList/LicensesList';
import { useColors } from '../../utils/customHooks/useColors/useColors';

import { extractNameFromGithubUrl } from '../../utils/extractNameFromGithubUrl/extractNameFromGithubUrl';

/**
 * @namespace Licenses
 */

/**
 * @todo Refactor this functionality so it does not modify the passed in array
 * @function sortDataByKey
 * @memberof Licences
 * @description Sorts the licenses data by key.
 * Created 12/17/20
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.1
 * @param {Object[]} data The list of licenses.
 * @param {string|number} key An object key inside each member of data.
 * @returns {Object[]} A sorted version of the data array that is passed in.
 */
function sortDataByKey(data, key) {
  data.sort(function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

let allLicenses = Object.keys(Data).map((key) => {
  let { licenses, ...license } = Data[key];

  let name, version;
  if (key[0] == '@') {
    [, name, version] = key.split('@');
  } else {
    [name, version] = key.split('@');
  }

  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalize(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(allLicenses, 'username');

/**
 * @function Licenses
 * @memberof Licenses
 * @component
 * @description A wrapper for the LicensesList component that processes the
 * data and passes it in.
 * Created 12/17/20
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 *
 * Download this lib: https://www.npmjs.com/package/npm-license-crawler
 * I did it globally: `npm i npm-license-crawler -g`
 *
 * Run this command to update the data.
 * `npm-license-crawler --onlyDirectDependencies --json src/MoreStack/Licenses/licenses.json`
 *
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.1.0
 *
 * @example
 * <Licenses />
 */
export default function Licenses() {
  const colors = useColors();
  return (
    <SafeAreaView
      edges={['left', 'right']}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <LicensesList licenses={allLicenses} />
    </SafeAreaView>
  );
}
