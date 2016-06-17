// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { uncleApi } from 'goommerce-api-client';
import _ from 'lodash';

export default function uncle(state = {}, action) {
  const { error, key, payload, type } = action;
  if (error) {
    return state;
  }
  if (type === 'UNCLE_ORDERS') {
    return _.assign({}, state, { [key]: payload });
  }
  return state;
}

export function loadUncleOrders(date) {
  return createFetchAction({
    type: 'UNCLE_ORDERS',
    api: uncleApi.loadUncleOrders,
    params: { date },
    key: `${date}`,
  });
}

export function unclePickUp(brandId, orderId, orderProducts) {
  return createFetchAction({
    type: 'UNCLE_PICK_UP',
    api: uncleApi.unclePickUp,
    params: { brandId, orderId, orderProducts },
  });
}

export function uncleCancelPickUp(brandId, orderId, orderProducts) {
  return createFetchAction({
    type: 'UNCLE_CANCEL_PICK_UP',
    api: uncleApi.uncleCancelPickUp,
    params: { brandId, orderId, orderProducts },
  });
}
