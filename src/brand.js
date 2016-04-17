// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { brandApi } from 'goommerce-api-client';
import _ from 'lodash';

// TODO: create a separate reducer for LIST, PAGINATION, UPDATE action.
export default function product(state = {}, action) {
  const { error, key, payload, type } = action;
  if (error) {
    return state;
  }
  if (type === 'BRAND_LOAD') {
    return _.assign({}, state, { [key]: payload });
  }
  return state;
}

export function loadBrand(brandId) {
  return createFetchAction({
    type: 'BRAND_LOAD',
    api: brandApi.loadBrand,
    params: { brandId },
    key: `${brandId}`,
  });
}
