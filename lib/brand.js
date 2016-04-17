// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = product;
exports.loadBrand = loadBrand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
  if (type === 'BRAND_LOAD') {
    var _$assign;

    return _lodash2['default'].assign({}, state, (_$assign = {}, _$assign[key] = payload, _$assign));
  }
  return state;
}

function loadBrand(brandId) {
  return _util.createFetchAction({
    type: 'BRAND_LOAD',
    api: _goommerceApiClient.brandApi.loadBrand,
    params: { brandId: brandId },
    key: '' + brandId
  });
}