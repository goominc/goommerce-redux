// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = uncle;
exports.loadUncleOrders = loadUncleOrders;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _goommerceApiClient = require('goommerce-api-client');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function uncle(state, action) {
  if (state === undefined) state = {};
  var error = action.error;
  var key = action.key;
  var payload = action.payload;
  var type = action.type;

  if (error) {
    return state;
  }
  if (type === 'UNCLE_ORDERS') {
    var _$assign;

    return _lodash2['default'].assign({}, state, (_$assign = {}, _$assign[key] = payload, _$assign));
  }
  return state;
}

function loadUncleOrders(date) {
  return _util.createFetchAction({
    type: 'UNCLE_ORDERS',
    api: _goommerceApiClient.uncleApi.loadUncleOrders,
    params: { date: date },
    key: '' + date
  });
}