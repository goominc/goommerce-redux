// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createFetchAction = createFetchAction;
var _ = require('lodash');

function createFetchAction(options) {
  var type = options.type;
  var api = options.api;
  var params = options.params;
  var transform = options.transform;
  var request = options.request;
  var _options$success = options.success;
  var success = _options$success === undefined ? {} : _options$success;
  var _options$failure = options.failure;
  var failure = _options$failure === undefined ? {} : _options$failure;

  return function (dispatch, getState) {
    var state = getState();
    function resolve(obj) {
      return typeof obj === 'function' ? obj(state) : obj;
    }

    if (request) dispatch(_extends({ type: type }, request));

    return api(state.auth, params).then(function (data) {
      dispatch(_.merge({
        type: type,
        payload: transform ? transform({ data: data, state: state }) : data
      }, resolve(success)));
      return data;
    }, function (error) {
      dispatch(_.merge({
        type: type,
        error: error
      }, resolve(failure)));
    });
  };
}