// Copyright (C) 2016 Goom Inc. All rights reserved.

import { createFetchAction } from './util';
import { productApi } from 'goommerce-api-client';
import _ from 'lodash';

// TODO: create a separate reducer for LIST, PAGINATION, UPDATE action.
export default function product(state = {}, action) {
  const { error, key, payload, type } = action;
  if (error) {
    return state;
  }
  if (type === 'PRODUCT_LIST') {
    return _.assign({}, state, { [key]: payload });
  }
  if (type === 'PRODUCT_PAGINATION') {
    const { pagination = {}, products } = payload;
    pagination.hasMore = (pagination.offset || 0) + products.length < pagination.total;
    if (pagination.offset && state[key]) {
      // TODO: check the current offset + limit equals the new offset.
      const list = _.unionBy(state[key].list, products, 'id');
      return _.assign({}, state, { [key]: { list, pagination } })
    } else {
      return _.assign({}, state, { [key]: { list: products, pagination } })
    }
  }
  if (type === 'PRODUCT_UPDATE') {
    const idx = state[key].findIndex((o) => o.id === payload.id);
    if (idx !== -1) {
      const list = state[key].slice(0);
      list[idx] = payload;
      return _.assign({}, state, { [key]: list });
    }
  }
  if (type === 'PRODUCT_LOAD') {
    return _.assign({}, state, { [key]: payload });
  }
  return state;
}

export function loadProduct(productId) {
  return createFetchAction({
    type: 'PRODUCT_LOAD',
    api: productApi.loadProduct,
    params: { productId },
    key: `${productId}`,
  });
}

export function loadBrandProducts(brandId, offset, limit) {
  return createFetchAction({
    type: 'PRODUCT_PAGINATION',
    api: productApi.loadBrandProducts,
    params: { brandId, offset, limit },
    key: `brands.${brandId}.products`,
  });
}
