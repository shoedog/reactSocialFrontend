##Feed Access in Client as async example
* utils/api.js -> defines fetch request and response handling
* actions/streamActions.js -> defines async actions
* reducers/streamReducers.js -> defines state modification from async actions
* lib/selectors.js -> small helper
* components/StreamList/stream.js -> Access stream props and actions in component

##Server Proxy
* server/routes/feedItemsApi.js -> fetch from API, process and pass back to client
