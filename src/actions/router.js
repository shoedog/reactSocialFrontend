export const ROUTER_STATE_CHANGE = 'ROUTER_STATE_CHANGE';

export function routerStateChange(state) {
  return {
    type: ROUTER_STATE_CHANGE,
    state
  };
}
