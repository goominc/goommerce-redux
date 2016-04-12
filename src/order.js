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
  if (type === 'ORDER_PAGINATION') {
    const { pagination = {}, orders } = payload;
    pagination.hasMore = (pagination.offset || 0) + orders.length < pagination.total;
    if (pagination.offset && state[key]) {
      // TODO: check the current offset + limit equals the new offset.
      const list = _.unionBy(state[key].list, orders, 'id');
      return _.assign({}, state, { [key]: { list, pagination } })
    } else {
      return _.assign({}, state, { [key]: { list: orders, pagination } })
    }
  }
  if (type === 'ORDER_LOAD') {
    return _.assign({}, state, { [key]: payload });
  }
  if (type === 'ORDER_UPDATE') {
    const idx = state[key].list.findIndex((o) => o.id === payload.id);
    console.log(key, idx);
    if (idx !== -1) {
      const list = state[key].list.slice(0);
      list[idx] = _.merge({}, list[idx], payload);
      console.log(list[idx])
      return _.assign({}, state, { [key]: _.assign({}, state[key], { list }) });
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

export function loadBrandOrder(brandId, orderId) {
  return createFetchAction({
    type: 'ORDER_LOAD',
    api: orderApi.loadBrandOrder,
    params: { brandId, orderId },
    key: `brands.${brandId}.${orderId}`,
  });
}

export function loadBrandOrders(brandId, offset, limit) {
  return createFetchAction({
    type: 'ORDER_PAGINATION',
    api: orderApi.loadBrandOrders,
    params: { brandId, offset, limit },
    key: `brands.${brandId}.orders`,
  });
}

export function updateBrandOrderStatus(brandId, orderId, from, to, key) {
  return createFetchAction({
    type: 'ORDER_UPDATE',
    api: orderApi.updateBrandOrderStatus,
    params: { brandId, orderId, from, to },
    key,
  });
}
