// Copyright (C) 2016 Goom Inc. All rights reserved.

'use strict';

exports.__esModule = true;
exports['default'] = configureStore;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var authActions = _interopRequireWildcard(_auth);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var orderActions = _interopRequireWildcard(_order);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var errorActions = _interopRequireWildcard(_error);

var _ = require('lodash');

exports.authActions = authActions;
exports.orderActions = orderActions;

function configureStore(customReducers, initialState) {
  var middlewares = [_redux.applyMiddleware(_reduxThunk2['default'])];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(_redux.applyMiddleware(_reduxLogger2['default']()));
  }

  var finalCreateStore = _redux.compose.apply(undefined, middlewares)(_redux.createStore);

  var rootReducer = _redux.combineReducers(_.defaults({}, customReducers, {
    auth: _auth2['default'],
    order: _order2['default'],
    error: _error2['default']
  }));

  var reducer = function reducer(state, action) {
    if (state === undefined) state = {};

    if (action.type === 'RESET') {
      return rootReducer({}, action);
    }
    return rootReducer(state, action);
  };

  var store = finalCreateStore(reducer, initialState);

  return store;
}