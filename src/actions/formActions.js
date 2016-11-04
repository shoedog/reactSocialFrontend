export const FORM_UPDATE_VALUE = 'FORM_UPDATE_VALUE';
export const FORM_RESET = 'FORM_RESET';

export function update(name, value) {
  return dispatch => dispatch({
    type: FORM_UPDATE_VALUE,
    name, value
  });
}

export function reset() {
  return dispatch => dispatch({
    type: FORM_RESET
  });
}