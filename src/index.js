// Copyright (C) 2016 Goom Inc. All rights reserved.

import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import auth, * as authActions from './auth';
import error, * as errorActions from './error';
import order, * as orderActions from './order';
import product, * as productActions from './product';

const _ = require('lodash');

export {
  authActions,
  errorActions,
  orderActions,
  productActions,
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
    error,
    order,
    product,
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
