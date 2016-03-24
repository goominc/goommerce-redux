// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { orderApi } from 'goommerce-api-client';

const _ = require('lodash');

export default function order(state = {}, action) {
  if (action.error) {
    return state;
  }
  if (action.type === 'BRAND_ORDER_STATS' ||
      action.type === 'BRAND_ORDERS' ||
      action.type === 'BRAND_PENDING_ORDERS') {
    return _.assign({}, state, { [action.key]: action.payload });
  }
  if (action.type === 'REMOVE_BRAND_PENDING_ORDER') {
    const { brandId, orderProductId } = action.payload;
    const key = `brands.${brandId}.pendingOrders`;
    const list = _.filter(state[key], (o) => o.id !== orderProductId);
    return _.assign({}, state, { [key]: list });
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

export function loadBrandPendingOrders(brandId) {
  return createFetchAction({
    type: 'BRAND_PENDING_ORDERS',
    api: orderApi.loadBrandPendingOrders,
    params: { brandId },
    key: `brands.${brandId}.pendingOrders`,
  });
}

export function removeBrandPendingOrder(brandId, orderProductId) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_BRAND_PENDING_ORDER',
      payload: { brandId, orderProductId },
    });
  };
}

export function updateStock(orderProductId, count) {
  return createFetchAction({
    type: 'UPDATE_STOCK',
    api: orderApi.updateStock,
    params: { orderProductId, count },
  });
}
