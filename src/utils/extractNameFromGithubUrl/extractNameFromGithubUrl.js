/**
 * @function extractNameFromGithubUrl
 * @description Takes a url to a gitHub repository and returns the username of
 * the author of the software.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @version 1.1.0
 * @since 12/17/20
 * @param {String} url The GitHub url of a piece of software.
 * @returns {String} The GitHub username
 */
export function extractNameFromGithubUrl(url) {
  if (!url) {
    return null;
  }

  const reg =
    /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_-]{1,30})(\/([-a-z]{1,40}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}
