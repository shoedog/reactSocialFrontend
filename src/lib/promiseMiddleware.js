/*
  Helper for asynchronous actions( dispatcher middleware to transform actions ):
    Keeps actions simple
    Keeps action creators synchronous
    uses promises
 */

/*
 we just define a promise key on our actions and have them automatically resolved and rejected.
 We can also optionally listen in the reducers for auto-generated <TYPE>_REQUEST and <TYPE>_FAILURE
 if we care about mutating state along the way.
 */
function promiseMiddleware() {
  return next => (action) => {
    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type;
    const REQUEST = `${type}_REQUEST`;
    const FAILURE = `${type}_FAILURE`;

    next({ ...rest, type: REQUEST });

    return promise
      .then((res) => {
        next({ ...rest, res, type: SUCCESS });

        return true;
      })
      .catch((error) => {
        next({ ...rest, error, type: FAILURE });

        // Another benefit is being able to log all failures here
        console.log(error);
        return false;
      });
  };
}

export default promiseMiddleware;
