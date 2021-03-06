// Copyright (C) 2016 Goom Inc. All rights reserved.

import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import auth, * as authActions from './auth';
import brand, * as brandActions from './brand';
import error, * as errorActions from './error';
import order, * as orderActions from './order';
import product, * as productActions from './product';
import uncle, * as uncleActions from './uncle';

const _ = require('lodash');

export {
  authActions,
  brandActions,
  errorActions,
  orderActions,
  productActions,
  uncleActions,
};

export default function configureStore(customReducers, initialState) {
  const middlewares = [
    applyMiddleware(thunk),
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(applyMiddleware(createLogger()));
  }

  const finalCreateStore = compose(...middlewares)(createStore);

  const rootReducer = combineReducers(_.defaults({}, customReducers, {
    auth,
    brand,
    error,
    order,
    product,
    uncle,
  }));

  const reducer = (state = {}, action) => {
    if (action.type === 'RESET') {
      return rootReducer({}, action);
    }
    return rootReducer(state, action);
  };

  const store = finalCreateStore(reducer, initialState);

  return store;
}
