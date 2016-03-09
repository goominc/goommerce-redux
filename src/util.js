const _ = require('lodash');

export function createFetchAction(options) {
  const {
    type,
    api,
    params,
    transform,
  } = options;
  const { request, success = {}, failure = {} } = options;
  return (dispatch, getState) => {
    const state = getState();
    function resolve(obj) {
      return typeof obj === 'function' ? obj(state) : obj;
    }

    if (request) dispatch({ type, ...request });

    return api(state.auth, params).then((data) => {
      dispatch(_.merge({
        type,
        payload: transform ? transform({ data, state }) : data,
      }, resolve(success)));
      return data;
    }, (error) => {
      dispatch(_.merge({
        type,
        error,
      }, resolve(failure)));
    });
  };
}
