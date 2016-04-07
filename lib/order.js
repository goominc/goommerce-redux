// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = order;
exports.loadBrandOrderStats = loadBrandOrderStats;
exports.loadBrandOrder = loadBrandOrder;
exports.loadBrandOrders = loadBrandOrders;
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
    var idx = state[key].findIndex(function (o) {
      return o.id === payload.id;
    });
    if (idx !== -1) {
      var _$assign5;

      var list = state[key].slice(0);
      list[idx] = payload;
      return _.assign({}, state, (_$assign5 = {}, _$assign5[key] = list, _$assign5));
    }
  }
  if (type === 'ORDER_PRODUCT_UPDATE') {
    var orderProducts = state[key].orderProducts;

    var idx = orderProducts.findIndex(function (o) {
      return o.id === payload.id;
    });
    if (idx !== -1) {
      var _$assign6;

      var _order = _.assign({}, state[key], { orderProducts: orderProducts.slice(0) });
      _order.orderProducts[idx] = payload;
      return _.assign({}, state, (_$assign6 = {}, _$assign6[key] = _order, _$assign6));
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

function updateStock(orderProductId, count, key) {
  return _util.createFetchAction({
    type: 'ORDER_PRODUCT_UPDATE',
    api: _goommerceApiClient.orderApi.updateStock,
    params: { orderProductId: orderProductId, count: count },
    key: key
  });
}