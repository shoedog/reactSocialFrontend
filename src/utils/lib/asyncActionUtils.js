/**
 * These are generic start, success, and failure actions that are folded into a generic async
 * action handler so that they can be reused as helpers for different async requests.
 */


/**
 * action creator to dispatch initial action
 * @param type : The action type
 * meta: done = false : This notifies that we are starting an async action
 */
export const startAction = (type) => () => ({
  type,
  meta: {
    done: false,
  },
});

/**
 * On req.success dispatch success action
 * @param type : the action type
 * Returns a payload from the response that has any data
 * Returns meta: done = true : This notifies that the action completed
 */
export const successAction = (type, route) => (payload) => ({
  type,
  payload,
  meta: {
    done: true,
  },
});

/**
 * On req.failure, dispatch failure action
 * @param type : the action type
 * Returns a payload from the response that has the error
 * Returns meta: done = true : This notifies that the action completed
 */
export const failureAction = (type, route) => (error) => ({
  type,
  payload: error,
  error: true,
  meta: {
    done: true,
  },
});

/**
 * Asnyc helper action creator: returned func is picked up by redux-thunk and called with dispatch( opt to add getState)
 * Before req, dispatch start to notify app that req is about to begin
 * @param func : function called with ...args, returns a promise with then/catch handlers to dispatch correct action
 * @param start : action Creator for starting action
 * @param success : action Creator for action req success
 * @param failure : action Creator for action req failure
 */
export const asyncAction = ({ func, start, success, failure }) => (
  (...args) => (dispatch) => {
    dispatch(start());
    return func(...args)
      .then((data) => dispatch(success(data)))
      .catch((error) => dispatch(failure(error)));
  });