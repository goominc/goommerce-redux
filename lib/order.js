// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = order;
exports.loadBrandOrderStats = loadBrandOrderStats;
exports.loadBrandOrder = loadBrandOrder;
exports.loadBrandOrders = loadBrandOrders;
exports.updateBrandOrderStatus = updateBrandOrderStatus;
exports.createOrderProductLog = createOrderProductLog;
exports.updateOrderProductStock = updateOrderProductStock;

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
    if (idx !== -1) {
      var _$assign5;

      var list = state[key].list.slice(0);
      list[idx] = _.merge({}, list[idx], payload);
      return _.assign({}, state, (_$assign5 = {}, _$assign5[key] = _.assign({}, state[key], { list: list }), _$assign5));
    }
  }
  if (type === 'ORDER_PRODUCT_UPDATE') {
    var idx = state[key].orderProdcts.findIndex(function (o) {
      return o.id === payload.id;
    });
    if (idx !== -1) {
      var _$assign6;

      var orderProdcts = state[key].orderProdcts.slice(0);
      orderProdcts[idx] = _.merge({}, orderProdcts[idx], payload);
      return _.assign({}, state, (_$assign6 = {}, _$assign6[key] = _.assign({}, state[key], { orderProdcts: orderProdcts }), _$assign6));
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

function updateBrandOrderStatus(brandId, orderId, key, from, to) {
  return _util.createFetchAction({
    type: 'ORDER_UPDATE',
    api: _goommerceApiClient.orderApi.updateBrandOrderStatus,
    params: { brandId: brandId, orderId: orderId, from: from, to: to },
    key: key
  });
}

function createOrderProductLog(orderProductId, key, params) {
  return _util.createFetchAction({
    type: 'CREATE_ORDER_PRODUCT_LOG',
    api: _goommerceApiClient.orderApi.createOrderProductLog,
    params: _extends({ orderProductId: orderProductId }, params),
    key: key
  });
}

function updateOrderProductStock(orderProductId, key, quantity) {
  return _util.createFetchAction({
    type: 'ORDER_PRODUCT_UPDATE',
    api: _goommerceApiClient.orderApi.updateOrderProductStock,
    params: { orderProductId: orderProductId, quantity: quantity },
    key: key
  });
}