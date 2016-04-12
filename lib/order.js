// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = order;
exports.loadBrandOrderStats = loadBrandOrderStats;
exports.loadBrandOrder = loadBrandOrder;
exports.loadBrandOrders = loadBrandOrders;
exports.updateBrandOrderStatus = updateBrandOrderStatus;

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
  if (type === 'ORDER_PAGINATION') {
    var _payload$pagination = payload.pagination;
    var pagination = _payload$pagination === undefined ? {} : _payload$pagination;
    var orders = payload.orders;

    pagination.hasMore = (pagination.offset || 0) + orders.length < pagination.total;
    if (pagination.offset && state[key]) {
      var _$assign2;

      // TODO: check the current offset + limit equals the new offset.
      var list = _.unionBy(state[key].list, orders, 'id');
      return _.assign({}, state, (_$assign2 = {}, _$assign2[key] = { list: list, pagination: pagination }, _$assign2));
    } else {
      var _$assign3;

      return _.assign({}, state, (_$assign3 = {}, _$assign3[key] = { list: orders, pagination: pagination }, _$assign3));
    }
  }
  if (type === 'ORDER_LOAD') {
    var _$assign4;

    return _.assign({}, state, (_$assign4 = {}, _$assign4[key] = payload, _$assign4));
  }
  if (type === 'ORDER_UPDATE') {
    var idx = state[key].list.findIndex(function (o) {
      return o.id === payload.id;
    });
    console.log(key, idx);
    if (idx !== -1) {
      var _$assign5;

      var list = state[key].list.slice(0);
      list[idx] = _.merge({}, list[idx], payload);
      console.log(list[idx]);
      return _.assign({}, state, (_$assign5 = {}, _$assign5[key] = _.assign({}, state[key], { list: list }), _$assign5));
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

function loadBrandOrder(brandId, orderId) {
  return _util.createFetchAction({
    type: 'ORDER_LOAD',
    api: _goommerceApiClient.orderApi.loadBrandOrder,
    params: { brandId: brandId, orderId: orderId },
    key: 'brands.' + brandId + '.' + orderId
  });
}

function loadBrandOrders(brandId, offset, limit) {
  return _util.createFetchAction({
    type: 'ORDER_PAGINATION',
    api: _goommerceApiClient.orderApi.loadBrandOrders,
    params: { brandId: brandId, offset: offset, limit: limit },
    key: 'brands.' + brandId + '.orders'
  });
}

function updateBrandOrderStatus(brandId, orderId, from, to, key) {
  return _util.createFetchAction({
    type: 'ORDER_UPDATE',
    api: _goommerceApiClient.orderApi.updateBrandOrderStatus,
    params: { brandId: brandId, orderId: orderId, from: from, to: to },
    key: key
  });
}