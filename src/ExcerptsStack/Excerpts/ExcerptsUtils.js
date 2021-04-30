/**
 * @function processListData
 * @description Processes the list data to remove duplicates from the array,
 * and sort it alphabetically by composer and composition.
 * @author Alexander Burdiss
 * @since 4/30/21
 * @version 1.0.0
 * @param {Object[]} initialData The unsorted array of all data to display on
 * the Excerpt screen.
 * @returns {Object[]} A sorted version of the initial array with duplicates
 * removed.
 */
export function processListData(initialData) {
  let tempData = [];
  initialData.forEach((excerpt) => {
    let exists = tempData.find(
      (item) =>
        item.composerLast + item.name == excerpt.composerLast + excerpt.name,
    );
    if (!exists) {
      tempData.push(excerpt);
    }
  });

  tempData.sort(function (a, b) {
    var textA = a.composerLast.toUpperCase() + a.name.toUpperCase();
    var textB = b.composerLast.toUpperCase() + b.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return tempData;
}
