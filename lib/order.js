// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = order;
exports.loadBrandOrderStats = loadBrandOrderStats;
exports.loadBrandOrders = loadBrandOrders;
exports.loadBrandPendingOrders = loadBrandPendingOrders;

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _ = require('lodash');

function order(state, action) {
  if (state === undefined) state = {};

  if (action.error) {
    return state;
  }
  if (action.type === 'BRAND_ORDER_STATS' || action.type === 'BRAND_ORDERS' || action.type === 'BRAND_PENDING_ORDERS') {
    var _$assign;

    return _.assign({}, state, (_$assign = {}, _$assign[action.key] = action.payload, _$assign));
  }
  return state;
}

function loadBrandOrderStats(brandId) {
  return _util.createFetchAction({
    type: 'BRAND_ORDER_STATS',
    api: _goommerceApiClient.orderApi.loadBrandOrderStats,
    params: { brandId: brandId },
    key: 'brands.' + brandId + '.orderStats'
  });
}

function loadBrandOrders(brandId, date) {
  return _util.createFetchAction({
    type: 'BRAND_ORDERS',
    api: _goommerceApiClient.orderApi.loadBrandOrders,
    params: { brandId: brandId, start: date, end: date },
    key: 'brands.' + brandId + '.orders.' + date
  });
}

function loadBrandPendingOrders(brandId) {
  return _util.createFetchAction({
    type: 'BRAND_PENDING_ORDERS',
    api: _goommerceApiClient.orderApi.loadBrandPendingOrders,
    params: { brandId: brandId },
    key: 'brands.' + brandId + '.pendingOrders'
  });
}