/**
 * @function shuffle
 * @description Shuffles an array of anything that is passed in.
 * Created 2/10/22
 * @param {*[]} input An array of any type that will be shuffled
 * @returns {*[]} A shuffled version of the inputted array
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export function shuffle<Type>(input: Type[]): Type {
  const array = [...input];
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
