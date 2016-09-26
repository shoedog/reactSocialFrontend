/*
 function which promises to gather all the data and dispatch it
 for state rehydration with Async
 */

export default function fetchComponentData(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {
    return (current.needs || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.needs : []) || [])
      .concat(prev);
  }, []);

  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}