// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { authApi } from 'goommerce-api-client';

export default function auth(state = {}, action) {
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

export function login(email, password) {
  return createFetchAction({
    type: 'LOGIN',
    api: authApi.login,
    params: {
      email,
      password,
    },
  });
}

export function logout() {
  return createFetchAction({
    type: 'LOGOUT',
    api: authApi.logout,
  });
}

export function signup(params) {
  return createFetchAction({
    type: 'SIGNUP',
    api: authApi.signup,
    params,
  });
}

export function forgotPassword(params) {
  return createFetchAction({
    type: 'FORGOT_PASSWORD',
    api: authApi.forgotPassword,
    params,
  });
}

export function resetPassword(params) {
  return createFetchAction({
    type: 'RESET_PASSWORD',
    api: authApi.resetPassword,
    params,
  });
}
