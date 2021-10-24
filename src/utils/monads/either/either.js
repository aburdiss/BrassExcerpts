/**
 * @function right
 * @description The right side of the either monad. Generally affiliated with
 * a successful action.
 * @param {*} x
 * @see https://codepen.io/drboolean/pen/xgoeWR
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 * @returns
 */
export const right = (x) => ({
  chain: (f) => f(x),
  map: (f) => right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `right(${x})`,
  logMap: (f) => right(f(logit(x))),
});

/**
 * @funciton left
 * @description The left side of the either monad. Generally affiliated with
 * an unsuccessful action.
 * @param {*} x
 * @see https://codepen.io/drboolean/pen/xgoeWR
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 * @returns
 */
export const left = (x) => ({
  chain: (f) => left(x),
  map: (f) => left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
  logMap: (f) => left(logit(x)),
});

/**
 * @function fromNullable
 * @description A function that gracefully handles a value that could
 * potentially be null. Returns a right wrapping the value if it is not null,
 * and a left wrapping null if it is.
 * @param {*} x
 * @returns {right|left}
 * @see https://codepen.io/drboolean/pen/xgoeWR
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 */
export const fromNullable = (x) => (x != null ? right(x) : left(null));

/**
 * @function tryCatch
 * @description A wrapper for the try catch statement that returns an either
 * monad (a right wrapping the return of the function if the function was
 * successful, and a left wrapping the error if not).
 * @param {Function} f A funciton that may throw an error
 * @returns {right|left}
 * @see https://codepen.io/drboolean/pen/xgoeWR
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 */
export const tryCatch = (f) => {
  try {
    return right(f());
  } catch (e) {
    return left(e);
  }
};

/**
 * @function logit
 * @description passes the value through and logs it.
 * @param {*} x
 * @returns {*} x The same value passed in.
 * @see https://codepen.io/drboolean/pen/xgoeWR
 * @author Alexander Burdiss
 * @since 10/22/21
 * @version 1.0.0
 */
export const logit = (x) => {
  console.log(x);
  return x;
};
