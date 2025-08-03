/**
 * @function right
 * @description The right side of the either monad. Generally affiliated with
 * a successful action.
 * Created 10/22/21
 * @param {*} x
 * @see https://codepen.io/drboolean/pen/xgoeWR
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export const right = (x: any) => ({
  chain: (f: any) => f(x),
  map: (f: any) => right(f(x)),
  fold: (f: any, g: any) => g(x),
  toString: () => `right(${x})`,
  logMap: (f: any) => right(f(logit(x))),
});

/**
 * @funciton left
 * @description The left side of the either monad. Generally affiliated with
 * an unsuccessful action.
 * Created 10/22/21
 * @param {*} x
 * @see https://codepen.io/drboolean/pen/xgoeWR
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export const left = (x: any) => ({
  chain: (_: any) => left(x),
  map: (_: any) => left(x),
  fold: (f: any, _: any) => f(x),
  toString: () => `Left(${x})`,
  logMap: (_: any) => left(logit(x)),
});

/**
 * @function fromNullable
 * @description A function that gracefully handles a value that could
 * potentially be null. Returns a right wrapping the value if it is not null,
 * and a left wrapping null if it is.
 * Created 10/22/21
 * @param {*} x
 * @returns {right|left}
 * @see https://codepen.io/drboolean/pen/xgoeWR
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export const fromNullable = (x: any) => (x != null ? right(x) : left(null));

/**
 * @function tryCatch
 * @description A wrapper for the try catch statement that returns an either
 * monad (a right wrapping the return of the function if the function was
 * successful, and a left wrapping the error if not).
 * Created 10/22/21
 * @param {Function} f A funciton that may throw an error
 * @returns {right|left}
 * @see https://codepen.io/drboolean/pen/xgoeWR
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export const tryCatch = (f: any) => {
  try {
    return right(f());
  } catch (e) {
    return left(e);
  }
};

/**
 * @function logit
 * @description passes the value through and logs it.
 * Created 10/22/21
 * @param {*} x
 * @returns {*} x The same value passed in.
 * @see https://codepen.io/drboolean/pen/xgoeWR
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 7/9/23
 * @version 1.0.0
 */
export const logit = (x: any) => {
  console.log(x);
  return x;
};
