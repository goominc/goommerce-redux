// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = order;
exports.loadBrandOrderStats = loadBrandOrderStats;
exports.loadBrandOrders = loadBrandOrders;
exports.loadBrandPendingOrders = loadBrandPendingOrders;
exports.updateStock = updateStock;

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _ = require('lodash');

function order(state, action) {
  if (state === undefined) state = {};
  var error = action.error;
  var key = action.key;
  var payload = action.payload;
  var type = action.type;

  if (error) {
    return state;
  }
  if (type === 'ORDER_LIST') {
    var _$assign;

    return _.assign({}, state, (_$assign = {}, _$assign[key] = payload, _$assign));
  }
  if (type === 'ORDER_UPDATE') {
    var idx = state[key].findIndex(function (o) {
      return o.id === payload.id;
    });
    if (idx !== -1) {
      var _$assign2;

      var list = state[key].slice(0);
      list[idx] = payload;
      return _.assign({}, state, (_$assign2 = {}, _$assign2[key] = list, _$assign2));
    }
  }
  return state;
}

function loadBrandOrderStats(brandId) {
  return _util.createFetchAction({
    type: 'ORDER_LIST',
    api: _goommerceApiClient.orderApi.loadBrandOrderStats,
    params: { brandId: brandId },
    key: 'brands.' + brandId + '.orderStats'
  });
}

function loadBrandOrders(brandId, date) {
  return _util.createFetchAction({
    type: 'ORDER_LIST',
    api: _goommerceApiClient.orderApi.loadBrandOrders,
    params: { brandId: brandId, start: date, end: date },
    key: 'brands.' + brandId + '.orders.' + date
  });
}

function loadBrandPendingOrders(brandId) {
  return _util.createFetchAction({
    type: 'ORDER_LIST',
    api: _goommerceApiClient.orderApi.loadBrandPendingOrders,
    params: { brandId: brandId },
    key: 'brands.' + brandId + '.pendingOrders'
  });
}

function updateStock(orderProductId, count, key) {
  return _util.createFetchAction({
    type: 'ORDER_UPDATE',
    api: _goommerceApiClient.orderApi.updateStock,
    params: { orderProductId: orderProductId, count: count },
    key: key
  });
}