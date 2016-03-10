// Copyright (C) 2016 Goom Inc. All rights reserved.

"use strict";

exports.__esModule = true;
exports.createFetchAction = createFetchAction;

function createFetchAction(options) {
  var type = options.type;
  var api = options.api;
  var params = options.params;
  var transform = options.transform;
  var key = options.key;

  var action = function action(dispatch, getState) {
    var state = getState();
    return api(state.auth, params).then(function (data) {
      dispatch({
        type: type,
        key: key,
        payload: transform ? transform({ data: data, state: state }) : data
      });
      return data;
    }, function (error) {
      dispatch({
        type: type,
        key: key,
        error: error
      });
    });
  };
  action.key = key;
  return action;
}