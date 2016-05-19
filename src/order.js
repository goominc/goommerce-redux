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
    if (_.isArray(state[key].list)) {
      const idx = state[key].list.findIndex((o) => o.id === payload.id);
      if (idx !== -1) {
        const list = state[key].list.slice(0);
        list[idx] = _.merge({}, list[idx], payload);
        return _.assign({}, state, { [key]: _.assign({}, state[key], { list }) });
      }
    }
    return _.assign({}, state, { [key]: _.merge({}, state[key], payload) });
  }
  if (type === 'ORDER_PRODUCT_UPDATE') {
    const idx = state[key].orderProducts.findIndex((o) => o.id === payload.id);
    if (idx !== -1) {
      const orderProducts = state[key].orderProducts.slice(0);
      orderProducts[idx] = _.merge({}, orderProducts[idx], payload);
      return _.assign({}, state, { [key]: _.assign({}, state[key], { orderProducts }) });
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

export function loadBrandOrders(brandId, status, offset, limit) {
  return createFetchAction({
    type: 'ORDER_PAGINATION',
    api: orderApi.loadBrandOrders,
    params: { brandId, status, offset, limit },
    key: `brands.${brandId}.orders.${status}`,
  });
}

export function updateBrandOrderStatus(brandId, orderId, key, from, to) {
  return createFetchAction({
    type: 'ORDER_UPDATE',
    api: orderApi.updateBrandOrderStatus,
    params: { brandId, orderId, from, to },
    key,
  });
}

export function brandOrderReadyToPickUp(brandId, orderId, key, orderProducts) {
  return createFetchAction({
    type: 'ORDER_UPDATE',
    api: orderApi.brandOrderReadyToPickUp,
    params: { brandId, orderId, orderProducts },
    key,
  });
}

export function createOrderProductLog(orderProductId, key, params) {
  return createFetchAction({
    type: 'CREATE_ORDER_PRODUCT_LOG',
    api: orderApi.createOrderProductLog,
    params: { orderProductId, ...params },
    key,
  });
}

export function updateOrderProductStock(orderProductId, key, quantity, reason) {
  return createFetchAction({
    type: 'ORDER_PRODUCT_UPDATE',
    api: orderApi.updateOrderProductStock,
    params: { orderProductId, quantity, reason },
    key,
  });
}

export function deleteOrderProductStock(orderProductId, key) {
  return createFetchAction({
    type: 'ORDER_PRODUCT_UPDATE',
    api: orderApi.deleteOrderProductStock,
    params: { orderProductId },
    key,
  });
}
