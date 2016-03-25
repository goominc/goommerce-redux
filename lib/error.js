// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = error;
exports.resetError = resetError;

function error(state, action) {
  if (state === undefined) state = {};

  if (action.type === 'RESET_ERROR') {
    return {};
  }
  return action.error ? action.error : state;
}

function resetError() {
  return function (dispatch) {
    return dispatch({ type: 'RESET_ERROR' });
  };
}