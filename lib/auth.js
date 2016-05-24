// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = auth;
exports.login = login;
exports.whoami = whoami;
exports.logout = logout;
exports.signup = signup;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.updateAgreements = updateAgreements;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function auth(state, action) {
  if (state === undefined) state = {};

  if (action.error) {
    return state;
  }
  if (action.type === 'LOGOUT') {
    return {};
  }
  if (['LOGIN', 'WHOAMI', 'SIGNUP', 'RESET_PASSWORD', 'UPDATE_AGREEMENTS'].indexOf(action.type) !== -1) {
    return _lodash2['default'].merge({}, state, action.payload);
  }
  return state;
}

function login(email, password, onesignal) {
  return _util.createFetchAction({
    type: 'LOGIN',
    api: _goommerceApiClient.authApi.login,
    params: {
      email: email,
      password: password,
      onesignal: onesignal
    }
  });
}

function whoami() {
  return _util.createFetchAction({
    type: 'WHOAMI',
    api: _goommerceApiClient.authApi.whoami
  });
}

function logout(onesignal) {
  return _util.createFetchAction({
    type: 'LOGOUT',
    api: _goommerceApiClient.authApi.logout,
    params: { onesignal: onesignal }
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

function updateAgreements(_ref) {
  var buyer = _ref.buyer;
  var seller = _ref.seller;
  var personalInfomation = _ref.personalInfomation;

  return _util.createFetchAction({
    type: 'UPDATE_AGREEMENTS',
    api: _goommerceApiClient.authApi.updateAgreements,
    params: { buyer: buyer, seller: seller, personalInfomation: personalInfomation }
  });
}