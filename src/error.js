// Copyright (C) 2016 Goom Inc. All rights reserved.

export default function error(state = {}, action) {
  if (action.type === 'RESET_ERROR') {
    return {};
  }
  return action.error ? action.error : state;
}

export function resetError() {
  (dispatch) => {
    type: 'RESET_ERROR';
  };
}
