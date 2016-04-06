// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = product;
exports.loadBrandProducts = loadBrandProducts;

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _ = require('lodash');

// TODO: create a separate reducer for LIST, PAGINATION, UPDATE action.

function product(state, action) {
  if (state === undefined) state = {};
  var error = action.error;
  var key = action.key;
  var payload = action.payload;
  var type = action.type;

  if (error) {
    return state;
  }
  if (type === 'PRODUCT_LIST') {
    var _$assign;

    return _.assign({}, state, (_$assign = {}, _$assign[key] = payload, _$assign));
  }
  if (type === 'PRODUCT_PAGINATION') {
    var _payload$pagination = payload.pagination;
    var pagination = _payload$pagination === undefined ? {} : _payload$pagination;
    var products = payload.products;

    pagination.hasMore = (pagination.offset || 0) + products.length < pagination.total;
    if (pagination.offset && state[key]) {
      var _$assign2;

      // TODO: check the current offset + limit equals the new offset.
      var list = _.unionBy(state[key].list, products, 'id');
      return _.assign({}, state, (_$assign2 = {}, _$assign2[key] = { list: list, pagination: pagination }, _$assign2));
    } else {
      var _$assign3;

      return _.assign({}, state, (_$assign3 = {}, _$assign3[key] = { list: products, pagination: pagination }, _$assign3));
    }
  }
  if (type === 'PRODUCT_UPDATE') {
    var idx = state[key].findIndex(function (o) {
      return o.id === payload.id;
    });
    if (idx !== -1) {
      var _$assign4;

      var list = state[key].slice(0);
      list[idx] = payload;
      return _.assign({}, state, (_$assign4 = {}, _$assign4[key] = list, _$assign4));
    }
  }
  return state;
}

function loadBrandProducts(brandId, offset, limit) {
  return _util.createFetchAction({
    type: 'PRODUCT_PAGINATION',
    api: _goommerceApiClient.productApi.loadBrandProducts,
    params: { brandId: brandId, offset: offset, limit: limit },
    key: 'brands.' + brandId + '.products'
  });
}