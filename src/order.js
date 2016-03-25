// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { orderApi } from 'goommerce-api-client';

const _ = require('lodash');

export default function order(state = {}, action) {
  const { error, key, payload, type } = action;
  if (error) {
    return state;
  }
  if (type === 'ORDER_LIST') {
    return _.assign({}, state, { [key]: payload });
  }
  if (type === 'ORDER_UPDATE') {
    const idx = state[key].findIndex((o) => o.id === payload.id);
    if (idx !== -1) {
      const list = state[key].slice(0);
      list[idx] = payload;
      return _.assign({}, state, { [key]: list });
    }
  }
  return state;
}

export function loadBrandOrderStats(brandId) {
  return createFetchAction({
    type: 'ORDER_LIST',
    api: orderApi.loadBrandOrderStats,
    params: { brandId },
    key: `brands.${brandId}.orderStats`,
  });
}

export function loadBrandOrders(brandId, date) {
  return createFetchAction({
    type: 'ORDER_LIST',
    api: orderApi.loadBrandOrders,
    params: { brandId, start: date, end: date },
    key: `brands.${brandId}.orders.${date}`,
  });
}

export function loadBrandPendingOrders(brandId) {
  return createFetchAction({
    type: 'ORDER_LIST',
    api: orderApi.loadBrandPendingOrders,
    params: { brandId },
    key: `brands.${brandId}.pendingOrders`,
  });
}

export function updateStock(orderProductId, count, key) {
  return createFetchAction({
    type: 'ORDER_UPDATE',
    api: orderApi.updateStock,
    params: { orderProductId, count },
    key,
  });
}
