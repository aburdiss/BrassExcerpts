/**
 * @function extractNameFromGithubUrl
 * @description Takes a url to a gitHub repository and returns the username of
 * the author of the software.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Created 12/17/20
 * @param {string} url The GitHub url of a piece of software.
 * @returns {string} The GitHub username
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.1.0
 */
export function extractNameFromGithubUrl(url: string) {
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
