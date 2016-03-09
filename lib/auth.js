// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = auth;
exports.login = login;
exports.logout = logout;
exports.signup = signup;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

function auth(state, action) {
  if (state === undefined) state = {};

  if (action.error) {
    return state;
  }
  if (action.type === 'LOGOUT') {
    return {};
  }
  if (['LOGIN', 'SIGNUP', 'RESET_PASSWORD'].indexOf(action.type) !== -1) {
    return _.merge({}, state, action.payload);
  }
  return state;
}

function login(email, password) {
  return _util.createFetchAction({
    type: 'LOGIN',
    api: _goommerceApiClient.authApi.login,
    params: {
      email: email,
      password: password
    }
  });
}

function logout() {
  return _util.createFetchAction({
    type: 'LOGOUT',
    api: _goommerceApiClient.authApi.logout
  });
}

function signup(params) {
  return _util.createFetchAction({
    type: 'SIGNUP',
    api: _goommerceApiClient.authApi.signup,
    params: params
  });
}

function forgotPassword(params) {
  return _util.createFetchAction({
    type: 'FORGOT_PASSWORD',
    api: _goommerceApiClient.authApi.forgotPassword,
    params: params
  });
}

function resetPassword(params) {
  return _util.createFetchAction({
    type: 'RESET_PASSWORD',
    api: _goommerceApiClient.authApi.resetPassword,
    params: params
  });
}