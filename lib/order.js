// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = order;
exports.loadBrandOrder = loadBrandOrder;
exports.loadBrandOrders = loadBrandOrders;
exports.updateBrandOrderStatus = updateBrandOrderStatus;
exports.brandOrderReadyToPickUp = brandOrderReadyToPickUp;
exports.createOrderProductLog = createOrderProductLog;
exports.updateOrderProductStock = updateOrderProductStock;
exports.deleteOrderProductStock = deleteOrderProductStock;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

    return _lodash2['default'].assign({}, state, (_$assign = {}, _$assign[key] = payload, _$assign));
  }
  if (type === 'ORDER_PAGINATION') {
    var _payload$pagination = payload.pagination;
    var pagination = _payload$pagination === undefined ? {} : _payload$pagination;
    var orders = payload.orders;

    pagination.hasMore = (pagination.offset || 0) + orders.length < pagination.total;
    if (pagination.offset && state[key]) {
      var _$assign2;

      // TODO: check the current offset + limit equals the new offset.
      var list = _lodash2['default'].unionBy(state[key].list, orders, 'id');
      return _lodash2['default'].assign({}, state, (_$assign2 = {}, _$assign2[key] = { list: list, pagination: pagination }, _$assign2));
    } else {
      var _$assign3;

      return _lodash2['default'].assign({}, state, (_$assign3 = {}, _$assign3[key] = { list: orders, pagination: pagination }, _$assign3));
    }
  }
  if (type === 'ORDER_LOAD') {
    var _$assign4;

    return _lodash2['default'].assign({}, state, (_$assign4 = {}, _$assign4[key] = payload, _$assign4));
  }
  if (type === 'ORDER_UPDATE' && key) {
    var _$assign6;

    if (_lodash2['default'].isArray(state[key].list)) {
      var idx = state[key].list.findIndex(function (o) {
        return o.id === payload.id;
      });
      if (idx !== -1) {
        var _$assign5;

        var list = state[key].list.slice(0);
        list[idx] = _lodash2['default'].merge({}, list[idx], payload);
        return _lodash2['default'].assign({}, state, (_$assign5 = {}, _$assign5[key] = _lodash2['default'].assign({}, state[key], { list: list }), _$assign5));
      }
    }
    return _lodash2['default'].assign({}, state, (_$assign6 = {}, _$assign6[key] = _lodash2['default'].merge({}, state[key], payload), _$assign6));
  }
  if (type === 'ORDER_PRODUCT_UPDATE' && key) {
    var idx = state[key].orderProducts.findIndex(function (o) {
      return o.id === payload.id;
    });
    if (idx !== -1) {
      var _$assign7;

      var orderProducts = state[key].orderProducts.slice(0);
      orderProducts[idx] = _lodash2['default'].merge({}, orderProducts[idx], payload);
      return _lodash2['default'].assign({}, state, (_$assign7 = {}, _$assign7[key] = _lodash2['default'].assign({}, state[key], { orderProducts: orderProducts }), _$assign7));
    }
  }
  return state;
}

function loadBrandOrder(brandId, orderId) {
  return _util.createFetchAction({
    type: 'ORDER_LOAD',
    api: _goommerceApiClient.orderApi.loadBrandOrder,
    params: { brandId: brandId, orderId: orderId },
    key: 'brands.' + brandId + '.' + orderId
  });
}

function loadBrandOrders(brandId, status, offset, limit) {
  return _util.createFetchAction({
    type: 'ORDER_PAGINATION',
    api: _goommerceApiClient.orderApi.loadBrandOrders,
    params: { brandId: brandId, status: status, offset: offset, limit: limit },
    key: 'brands.' + brandId + '.orders.' + status
  });
}

function updateBrandOrderStatus(brandId, orderId, from, to) {
  return _util.createFetchAction({
    type: 'ORDER_UPDATE',
    api: _goommerceApiClient.orderApi.updateBrandOrderStatus,
    params: { brandId: brandId, orderId: orderId, from: from, to: to }
  });
}

function brandOrderReadyToPickUp(brandId, orderId, key, orderProducts) {
  return _util.createFetchAction({
    type: 'ORDER_UPDATE',
    api: _goommerceApiClient.orderApi.brandOrderReadyToPickUp,
    params: { brandId: brandId, orderId: orderId, orderProducts: orderProducts },
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

function updateOrderProductStock(orderProductId, key, quantity, reason, data) {
  return _util.createFetchAction({
    type: 'ORDER_PRODUCT_UPDATE',
    api: _goommerceApiClient.orderApi.updateOrderProductStock,
    params: { orderProductId: orderProductId, quantity: quantity, reason: reason, data: data },
    key: key
  });
}

function deleteOrderProductStock(orderProductId, key) {
  return _util.createFetchAction({
    type: 'ORDER_PRODUCT_UPDATE',
    api: _goommerceApiClient.orderApi.deleteOrderProductStock,
    params: { orderProductId: orderProductId },
    key: key
  });
}