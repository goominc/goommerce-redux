// Copyright (C) 2016 Goom Inc. All rights reserved.

export function createFetchAction(options) {
  const { type, api, params, transform, key } = options;
  const action = (dispatch, getState) => {
    const state = getState();
    return api(state.auth, params).then((data) => {
      dispatch({
        type,
        key,
        payload: transform ? transform({ data, state }) : data,
      });
      return data;
    }, (error) => {
      dispatch({
        type,
        key,
        error,
      });
    });
  };
  action.key = key;
  return action;
}
