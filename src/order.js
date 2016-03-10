// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { orderApi } from 'goommerce-api-client';

const _ = require('lodash');

export default function order(state = {}, action) {
  if (action.error) {
    return state;
  }
  if (action.type === 'BRAND_ORDER_STATS' ||
      action.type === 'BRAND_ORDERS') {
    return _.assign({}, state, { [action.key]: action.payload });
  }
  return state;
}

export function loadBrandOrderStats(brandId) {
  return createFetchAction({
    type: 'BRAND_ORDER_STATS',
    api: orderApi.loadBrandOrderStats,
    params: { brandId },
    key: `brands.${brandId}.orderStats`,
  });
}

export function loadBrandOrders(brandId, date) {
  return createFetchAction({
    type: 'BRAND_ORDERS',
    api: orderApi.loadBrandOrders,
    params: { brandId, start: date, end: date },
    key: `brands.${brandId}.orders.${date}`,
  });
}
