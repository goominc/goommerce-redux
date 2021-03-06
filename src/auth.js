// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { authApi } from 'goommerce-api-client';
import _ from 'lodash';

export default function auth(state = {}, action) {
  if (action.error) {
    return state;
  }
  if (action.type === 'LOGOUT') {
    return {};
  }
  if (['LOGIN', 'WHOAMI', 'SIGNUP', 'RESET_PASSWORD', 'UPDATE_AGREEMENTS'].indexOf(action.type) !== -1) {
    return _.merge({}, state, action.payload);
  }
  return state;
}

export function login(email, password, onesignal) {
  return createFetchAction({
    type: 'LOGIN',
    api: authApi.login,
    params: {
      email,
      password,
      onesignal,
    },
  });
}

export function whoami() {
  return createFetchAction({
    type: 'WHOAMI',
    api: authApi.whoami,
  });
}

export function logout(onesignal) {
  return createFetchAction({
    type: 'LOGOUT',
    api: authApi.logout,
    params: { onesignal },
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

export function updateAgreements({ buyer, seller, personalInfomation }) {
  return createFetchAction({
    type: 'UPDATE_AGREEMENTS',
    api: authApi.updateAgreements,
    params: { buyer, seller, personalInfomation },
  });
}
