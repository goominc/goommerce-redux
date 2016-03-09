import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import auth, * as authActions from './auth';

const _ = require('lodash');

export {
  authActions,
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
