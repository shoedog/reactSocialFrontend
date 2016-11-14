module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/server/index.js */1);


/***/ },
/* 1 */
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _express = __webpack_require__(/*! express */ 2);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _httpProxy = __webpack_require__(/*! http-proxy */ 3);
	
	var _httpProxy2 = _interopRequireDefault(_httpProxy);
	
	var _httpProxyRules = __webpack_require__(/*! http-proxy-rules */ 4);
	
	var _httpProxyRules2 = _interopRequireDefault(_httpProxyRules);
	
	var _http = __webpack_require__(/*! http */ 5);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _handleRender = __webpack_require__(/*! ./routes/handleRender */ 7);
	
	var _handleRender2 = _interopRequireDefault(_handleRender);
	
	var _feedItemsApi = __webpack_require__(/*! ./routes/feedItemsApi */ 80);
	
	var _userRoutes = __webpack_require__(/*! ./routes/userRoutes */ 81);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import fetch from 'isomorphic-fetch';
	var app = (0, _express2.default)();
	var router = _express2.default.Router();
	var server = new _http2.default.Server(app);
	app.use(_express2.default.static('public/static/dist'));
	app.use('/static', _express2.default.static('/public/static'));
	
	// Transform routes to target routes for proxy service
	//const proxyRules = new HttpProxyRules({
	//  rules: {
	//    '.*/feedItems': `http://localhost:5000/social/feed`
	/*  },
	  default: `http://localhost:5000`
	});
	const proxy = httpProxy.createProxy();
	
	// Proxy error handling
	proxy.on('error', (error, req, res) => {
	  let json;
	  if (error.code !== 'ECONNRESET') {
	    console.error('proxy error', error);
	  }
	  if (!res.headersSent) {
	    res.writeHead(500, {'content-type': 'application/json'});
	  }
	
	  json = {error: 'proxy_error', reason: error.message};
	  res.end(JSON.stringify(json));
	});*/
	
	// Api Proxy Requests
	app.route('/feedItems').get(function (req, res) {
	  (0, _feedItemsApi.getFeed)(req, res);
	}).post(function (req, res) {
	  (0, _feedItemsApi.postFeedItem)(req, res);
	}).put(function (req, res) {
	  (0, _feedItemsApi.updateFeedItem)(req, res);
	}).delete(function (req, res) {
	  (0, _feedItemsApi.deleteFeedItem)(req, res);
	});
	
	app.route('/user/:username').get(function (req, res) {
	  var username = req.params.username;
	  (0, _userRoutes.getUser)(req, res, username);
	}).put(function (req, res) {
	  var username = req.params.username;
	  (0, _userRoutes.updateUser)(req, res, username);
	}).delete(function (req, res) {
	  var username = req.params.username;
	  (0, _userRoutes.deleteUser)(req, res, username);
	});
	
	app.route('/user').get(function (req, res) {
	  (0, _userRoutes.getUsers)(req, res);
	}).post(function (req, res) {
	  (0, _userRoutes.registerUser)(req, res);
	});
	
	app.post('/user/login', _userRoutes.loginUser);
	
	app.use('/feedItems', router);
	
	// Append view routes here i.e. routes from routes.js
	app.get(['/', '/login', '/about', '/stream'], _handleRender2.default);
	
	// 404 Page
	app.get('*', _handleRender2.default);
	
	var PORT = process.env.PORT || 3000;
	
	app.listen(3000, function (err) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  console.log('Server listening on: ' + PORT);
	});
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(app, 'app', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/index.js');
	
	  __REACT_HOT_LOADER__.register(router, 'router', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/index.js');
	
	  __REACT_HOT_LOADER__.register(server, 'server', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/index.js');
	
	  __REACT_HOT_LOADER__.register(PORT, 'PORT', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/index.js');
	}();

	;

/***/ },
/* 2 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/*!*****************************!*\
  !*** external "http-proxy" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 4 */
/*!***********************************!*\
  !*** external "http-proxy-rules" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("http-proxy-rules");

/***/ },
/* 5 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 6 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/*!*******************************************!*\
  !*** ./src/server/routes/handleRender.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 8);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _fs = __webpack_require__(/*! fs */ 9);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 10);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 11);
	
	var _MuiThemeProvider = __webpack_require__(/*! material-ui/styles/MuiThemeProvider */ 12);
	
	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
	
	var _configureStore = __webpack_require__(/*! ../../configureStore */ 13);
	
	var _configureStore2 = _interopRequireDefault(_configureStore);
	
	var _server = __webpack_require__(/*! react-dom/server */ 42);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _routes = __webpack_require__(/*! ../../routes */ 43);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _setMuiTheme = __webpack_require__(/*! ../setMuiTheme */ 78);
	
	var _setMuiTheme2 = _interopRequireDefault(_setMuiTheme);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function render(req, res, next) {
	  // See react-router docs: match() for documentation
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      return res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (!renderProps) {
	      return res.status(404).end('Not found.');
	    } else {
	      handleRender(req, res, renderProps);
	    }
	  });
	}
	//import getMuiTheme from 'material-ui/styles/getMuiTheme';
	
	
	function handleRender(req, res, renderProps) {
	  global.navigator = {
	    userAgent: req.headers['user-agent']
	    //console.log(`>>> navigator.userAgent: ${navigator.userAgent}`)
	  };
	
	  // For SSR we need to set the CSS/Theming of Components here
	  var muiTheme = (0, _setMuiTheme2.default)(req.headers['user-agent']);
	
	  // Async middleware applied same as in client except without initial State
	  var store = (0, _configureStore2.default)();
	
	  var html = _server2.default.renderToString(_react2.default.createElement(
	    _MuiThemeProvider2.default,
	    { muiTheme: muiTheme },
	    _react2.default.createElement(
	      _reactRedux.Provider,
	      { store: store },
	      _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	    )
	  ));
	
	  var initialState = store.getState();
	  var strState = (0, _stringify2.default)(initialState);
	
	  _fs2.default.readFile('./public/static/index.html', 'utf8', function (err, file) {
	    if (err) {
	      return console.log(err);
	    }
	    var document = file.replace(/<div id="root"><\/div>/, '<div id="root">' + html + '</div>');
	    document = document.replace(/<script text="initialState"><\/script>/, '<script>window.__INITIAL_STATE__ = ' + strState + '</script>');
	    if (process.env.NODE_ENV === 'development') {
	      document = document.replace(/<script type="application\/javascript" src="\/client.js" async><\/script>/, '<script type="application/javascript" src="http://localhost:8000/client.js" async></script>');
	    }
	    res.send(document);
	  });
	}
	
	var _default = render;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(render, 'render', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/handleRender.js');
	
	  __REACT_HOT_LOADER__.register(handleRender, 'handleRender', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/handleRender.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/handleRender.js');
	}();

	;

/***/ },
/* 8 */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 9 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 10 */
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 11 */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 12 */
/*!******************************************************!*\
  !*** external "material-ui/styles/MuiThemeProvider" ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 13 */
/*!*******************************!*\
  !*** ./src/configureStore.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 15);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _rootReducer = __webpack_require__(/*! ./reducers/rootReducer */ 16);
	
	var _rootReducer2 = _interopRequireDefault(_rootReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default
	// loggerMiddleware
	)(_redux.createStore);
	
	var configureStore = function configureStore(initialState) {
	  var store = (0, _redux.createStore)(_rootReducer2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	
	  /*if (module.hot) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', () => {
	      const nextRootReducer = require('./reducers');
	        store.replaceReducer(nextRootReducer);
	    });
	  }*/
	
	  return store;
	};
	
	var _default = configureStore;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(createStoreWithMiddleware, 'createStoreWithMiddleware', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/configureStore.js');
	
	  __REACT_HOT_LOADER__.register(configureStore, 'configureStore', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/configureStore.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/configureStore.js');
	}();

	;

/***/ },
/* 14 */
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 15 */
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 16 */
/*!*************************************!*\
  !*** ./src/reducers/rootReducer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _reduxForm = __webpack_require__(/*! redux-form */ 17);
	
	var _LaunchPageReducer = __webpack_require__(/*! ./LaunchPageReducer */ 18);
	
	var _LaunchPageReducer2 = _interopRequireDefault(_LaunchPageReducer);
	
	var _RouterReducer = __webpack_require__(/*! ./RouterReducer */ 20);
	
	var _RouterReducer2 = _interopRequireDefault(_RouterReducer);
	
	var _AuthReducer = __webpack_require__(/*! ./AuthReducer */ 22);
	
	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);
	
	var _streamReducers = __webpack_require__(/*! ./streamReducers */ 28);
	
	var _userReducer = __webpack_require__(/*! ./userReducer */ 39);
	
	var _userReducer2 = _interopRequireDefault(_userReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reducers = {
	  launchPage: _LaunchPageReducer2.default,
	  router: _RouterReducer2.default,
	  auth: _AuthReducer2.default,
	  byId: _streamReducers.byId,
	  ids: _streamReducers.ids,
	  openFeedItemId: _streamReducers.openFeedItemId,
	  form: _reduxForm.reducer
	};
	
	var rootReducer = (0, _redux.combineReducers)(reducers);
	
	var _default = rootReducer;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(reducers, 'reducers', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/rootReducer.js');
	
	  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/rootReducer.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/rootReducer.js');
	}();

	;

/***/ },
/* 17 */
/*!*****************************!*\
  !*** external "redux-form" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 18 */
/*!*******************************************!*\
  !*** ./src/reducers/LaunchPageReducer.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = LaunchPageReducer;
	
	var _immutable = __webpack_require__(/*! immutable */ 19);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = new _immutable2.default.List();
	
	function LaunchPageReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	
	  switch (action.type) {
	
	    case 'USER_LOGIN':
	      return new _immutable2.default.List(action.res.data);
	
	    default:
	      return state;
	  }
	}
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(defaultState, 'defaultState', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/LaunchPageReducer.js');
	
	  __REACT_HOT_LOADER__.register(LaunchPageReducer, 'LaunchPageReducer', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/LaunchPageReducer.js');
	}();

	;

/***/ },
/* 19 */
/*!****************************!*\
  !*** external "immutable" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 20 */
/*!***************************************!*\
  !*** ./src/reducers/RouterReducer.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _router = __webpack_require__(/*! ../actions/router */ 21);
	
	var _default = function _default() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _router.ROUTER_STATE_CHANGE:
	      return action.state;
	
	    default:
	      return state;
	  }
	};
	
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/RouterReducer.js');
	}();

	;

/***/ },
/* 21 */
/*!*******************************!*\
  !*** ./src/actions/router.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routerStateChange = routerStateChange;
	var ROUTER_STATE_CHANGE = exports.ROUTER_STATE_CHANGE = 'ROUTER_STATE_CHANGE';
	
	function routerStateChange(state) {
	  return {
	    type: ROUTER_STATE_CHANGE,
	    state: state
	  };
	}
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(ROUTER_STATE_CHANGE, 'ROUTER_STATE_CHANGE', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/router.js');
	
	  __REACT_HOT_LOADER__.register(routerStateChange, 'routerStateChange', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/router.js');
	}();

	;

/***/ },
/* 22 */
/*!*************************************!*\
  !*** ./src/reducers/AuthReducer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ 23);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _auth = __webpack_require__(/*! ../actions/auth */ 24);
	
	var _router = __webpack_require__(/*! ../actions/router */ 21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  error: null, // last occurred error
	  token: null,
	  profile: null
	};
	
	var _default = function _default() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _router.ROUTER_STATE_CHANGE:
	      return (0, _extends3.default)({}, state, {
	        error: null
	      });
	
	    case _auth.LOGIN_SUCCESS:
	      return (0, _extends3.default)({}, state, {
	        error: null,
	        token: action.token
	      });
	
	    case _auth.REGISTER_FAILURE:
	    case _auth.LOGIN_FAILURE:
	      return (0, _extends3.default)({}, state, {
	        error: action.error
	      });
	
	    case _auth.LOGOUT:
	      return (0, _extends3.default)({}, initialState);
	
	    //case SAVE_PROFILE:
	    //case SAVE_PROFILE_SUCCESS:
	    case _auth.FETCH_PROFILE_SUCCESS:
	      return (0, _extends3.default)({}, state, {
	        profile: (0, _extends3.default)({}, state.profile, action.user),
	        error: null
	      });
	
	    default:
	      return state;
	  }
	};
	
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(initialState, 'initialState', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/AuthReducer.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/AuthReducer.js');
	}();

	;

/***/ },
/* 23 */
/*!************************************************!*\
  !*** external "babel-runtime/helpers/extends" ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 24 */
/*!*****************************!*\
  !*** ./src/actions/auth.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logout = exports.fetchProfileError = exports.fetchProfileSuccess = exports.loginFailure = exports.loginSuccess = exports.loginRequest = exports.registerFailure = exports.registerSuccess = exports.registerRequest = exports.FETCH_PROFILE_ERROR = exports.FETCH_PROFILE_SUCCESS = exports.LOGOUT = exports.SAVE_AUTH_TOKEN = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = exports.REGISTER_FAILURE = exports.REGISTER_SUCCESS = exports.REGISTER_REQUEST = undefined;
	exports.requestUserRegister = requestUserRegister;
	exports.login = login;
	exports.fetchProfile = fetchProfile;
	
	var _axios = __webpack_require__(/*! axios */ 25);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	var _querystring = __webpack_require__(/*! querystring */ 26);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	var _stringifyLocation = __webpack_require__(/*! ../lib/stringifyLocation */ 27);
	
	var _stringifyLocation2 = _interopRequireDefault(_stringifyLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var REGISTER_REQUEST = exports.REGISTER_REQUEST = 'REGISTER_REQUEST';
	var REGISTER_SUCCESS = exports.REGISTER_SUCCESS = 'REGISTER_SUCCESS';
	var REGISTER_FAILURE = exports.REGISTER_FAILURE = 'REGISTER_FAILURE';
	var LOGIN_REQUEST = exports.LOGIN_REQUEST = 'LOGIN_REQUEST';
	var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
	var LOGIN_FAILURE = exports.LOGIN_FAILURE = 'LOGIN_FAILURE';
	var SAVE_AUTH_TOKEN = exports.SAVE_AUTH_TOKEN = 'SAVE_AUTH_TOKEN';
	var LOGOUT = exports.LOGOUT = 'LOGOUT';
	var FETCH_PROFILE_SUCCESS = exports.FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
	var FETCH_PROFILE_ERROR = exports.FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';
	
	var registerRequest = exports.registerRequest = function registerRequest() {
	  return {
	    type: REGISTER_REQUEST,
	    user: user
	  };
	};
	
	var registerSuccess = exports.registerSuccess = function registerSuccess() {
	  return {
	    type: REGISTER_SUCCESS
	  };
	};
	
	var registerFailure = exports.registerFailure = function registerFailure(error) {
	  return {
	    type: REGISTER_FAILURE,
	    errorMsg: error
	  };
	};
	
	var loginRequest = exports.loginRequest = function loginRequest() {
	  return {
	    type: LOGIN_REQUEST,
	    user: user
	  };
	};
	
	var loginSuccess = exports.loginSuccess = function loginSuccess(token) {
	  return {
	    type: LOGIN_SUCCESS,
	    token: token
	  };
	};
	
	var loginFailure = exports.loginFailure = function loginFailure(error) {
	  return {
	    type: LOGIN_FAILURE,
	    errorMsg: error
	  };
	};
	
	var fetchProfileSuccess = exports.fetchProfileSuccess = function fetchProfileSuccess(profile) {
	  return {
	    type: FETCH_PROFILE_SUCCESS,
	    profile: profile
	  };
	};
	
	var fetchProfileError = exports.fetchProfileError = function fetchProfileError(error) {
	  return {
	    type: FETCH_PROFILE_ERROR,
	    error: error
	  };
	};
	
	var logout = exports.logout = function logout(router, token) {
	  return function (dispatch) {
	    token = null;
	    dispatch({ type: LOGOUT });
	    router.transitionTo(['/login', { redirectTo: (0, _stringifyLocation2.default)(router.state.location) }]);
	  };
	};
	
	var saveAuthToken = function saveAuthToken(token) {
	  type: SAVE_AUTH_TOKEN;
	  token: token; //should we save in cookie or somewhere else?
	};
	
	function requestUserRegister(user) {
	  return function (dispatch) {
	    dispatch(registerRequest(user));
	
	    return _axios2.default.post('/register', _querystring2.default.stringify({
	      username: user.username,
	      email: user.email,
	      password: user.password,
	      registerDate: Date.now()
	    }), {
	      headers: {
	        "Content-Type": "application/x-www-form-urlencoded"
	      }
	    }).then(function (response) {
	      console.log(response.data);
	      var token = response.data.token;
	      var profile = response.data.profile;
	      saveAuthToken(token);
	      dispatch(loginConfirm(token));
	      dispatch(fetchProfileSuccess(profile));
	      dispatch(registerSuccess());
	    }).catch(function (err) {
	      console.log("error submitting");
	      console.log(err);
	      dispatch(registerFailure(err));
	    });
	  };
	}
	
	function login(email, password, router) {
	  return function (dispatch) {
	    dispatch(loginRequest(user));
	
	    return _axios2.default.post('/login', {
	      auth: {
	        email: email,
	        password: password
	      }
	    }).then(function (response) {
	      console.log(response);
	      var token = response.data;
	      var profile = response.data.profile;
	      saveAuthToken(token);
	      dispatch(loginSuccess(token));
	      dispatch(fetchProfileSuccess(profile));
	      var query = router.state.location.query;
	
	      var redirectTo = query && query.redirectTo ? query.redirectTo : '/';
	      router.transitionTo(redirectTo);
	    }).catch(function (err) {
	      console.log("error login");
	      console.log(err);
	      var error = err.status === 401 ? Error('Incorrect email or password') : Error('Unknown error occured. Please, try again later.');
	      dispatch(loginFailure(error));
	    });
	  };
	}
	
	function fetchProfile() {
	  return function (dispatch) {
	    dispatch(profileRequest);
	
	    var _getState = getState();
	
	    var token = _getState.auth.token;
	
	    if (!token) {
	      return;
	    }
	
	    return _axios2.default.get('/profile', {
	      headers: {
	        Authorization: 'Bearer ' + token
	      }
	    }).then(function (response) {
	      var userProfile = response.userProfile;
	      dispatch(fetchProfileSuccess(userProfile));
	    }).catch(function (err) {
	      dispatch(fetchProfileError(err));
	    });
	  };
	}
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(REGISTER_REQUEST, 'REGISTER_REQUEST', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(REGISTER_SUCCESS, 'REGISTER_SUCCESS', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(REGISTER_FAILURE, 'REGISTER_FAILURE', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(LOGIN_REQUEST, 'LOGIN_REQUEST', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(LOGIN_SUCCESS, 'LOGIN_SUCCESS', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(LOGIN_FAILURE, 'LOGIN_FAILURE', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(SAVE_AUTH_TOKEN, 'SAVE_AUTH_TOKEN', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(LOGOUT, 'LOGOUT', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(FETCH_PROFILE_SUCCESS, 'FETCH_PROFILE_SUCCESS', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(FETCH_PROFILE_ERROR, 'FETCH_PROFILE_ERROR', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(registerRequest, 'registerRequest', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(registerSuccess, 'registerSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(registerFailure, 'registerFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(loginRequest, 'loginRequest', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(loginSuccess, 'loginSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(loginFailure, 'loginFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(fetchProfileSuccess, 'fetchProfileSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(fetchProfileError, 'fetchProfileError', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(logout, 'logout', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(saveAuthToken, 'saveAuthToken', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(requestUserRegister, 'requestUserRegister', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(login, 'login', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	
	  __REACT_HOT_LOADER__.register(fetchProfile, 'fetchProfile', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/auth.js');
	}();

	;

/***/ },
/* 25 */
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 26 */
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 27 */
/*!**************************************!*\
  !*** ./src/lib/stringifyLocation.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stringifyLocation;
	
	var _reactRouter = __webpack_require__(/*! react-router */ 11);
	
	function stringifyLocation(location) {
	  var query = (0, _reactRouter.stringifyQuery)(location.query);
	
	  return '' + location.pathname + (query && '?' + query);
	}
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(stringifyLocation, 'stringifyLocation', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/lib/stringifyLocation.js');
	}();

	;

/***/ },
/* 28 */
/*!****************************************!*\
  !*** ./src/reducers/streamReducers.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.openFeedItemId = exports.ids = exports.byId = undefined;
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 29);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _ramda = __webpack_require__(/*! ramda */ 30);
	
	var _streamActions = __webpack_require__(/*! ../actions/streamActions */ 31);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * See lib/selectors.js for functions to sort/select items using byId, ids, openFeedItemId
	 * Reducers use parts of ramda library ( like lodash but pure functional lib )
	 */
	
	// Reducer for a feed item Object (byId) in state
	var byId = exports.byId = function byId() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _ref = arguments[1];
	  var type = _ref.type;
	  var payload = _ref.payload;
	  var meta = _ref.meta;
	  var error = _ref.error;
	
	  switch (type) {
	    case 'fetchFeedItems':
	      if (meta.done && !error) {
	        return payload.feedItems;
	      }
	      return state;
	    case 'addFeedItem':
	      if (meta.done && !error) {
	        return (0, _ramda.merge)(state, (0, _defineProperty3.default)({}, payload.id, payload));
	      }
	      return state;
	    case _streamActions.UPDATE_FEED_ITEM:
	      return (0, _ramda.merge)(state, (0, _defineProperty3.default)({}, payload.id, payload));
	    case 'updateFeedItemServer':
	      if (meta.done && !error) {
	        return (0, _ramda.merge)(state, (0, _defineProperty3.default)({}, payload.id, payload));
	      }
	      return state;
	    case 'removeFeedItem':
	      if (meta.done && !error) {
	        return (0, _ramda.dissoc)(payload.id, state);
	      }
	      return state;
	    default:
	      return state;
	  }
	};
	
	// Reducer for feed items ids Array in state
	var ids = exports.ids = function ids() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var _ref2 = arguments[1];
	  var type = _ref2.type;
	  var payload = _ref2.payload;
	  var meta = _ref2.meta;
	  var error = _ref2.error;
	
	  switch (type) {
	    case 'fetchFeedItems':
	      if (meta.done && !error) {
	        return payload.feedItemIds;
	      }
	      return state;
	    case 'addFeedItem':
	      if (meta.done && !error) {
	        return (0, _ramda.prepend)(payload.id, state);
	      }
	      return state;
	    case 'removeFeedItem':
	      if (meta.done && !error) {
	        return (0, _ramda.without)(payload.id, state);
	      }
	      return state;
	    default:
	      return state;
	  }
	};
	
	// Reducer for the id of the currently open feed item in state
	var openFeedItemId = exports.openFeedItemId = function openFeedItemId() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var _ref3 = arguments[1];
	  var type = _ref3.type;
	  var payload = _ref3.payload;
	  var meta = _ref3.meta;
	  var error = _ref3.error;
	
	  switch (type) {
	    case 'addFeedItem':
	      if (meta.done && !error) {
	        return payload.id;
	      }
	      return state;
	    case _streamActions.OPEN_FEED_ITEM:
	      return payload.id;
	    case _streamActions.CLOSE_FEED_ITEM:
	      return null;
	    case 'removeFeedItem':
	      if (meta.done && !error) {
	        return null;
	      }
	      return state;
	    default:
	      return state;
	  }
	};
	
	var _default = {
	  byId: byId,
	  ids: ids,
	  openFeedItemId: openFeedItemId
	};
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(byId, 'byId', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/streamReducers.js');
	
	  __REACT_HOT_LOADER__.register(ids, 'ids', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/streamReducers.js');
	
	  __REACT_HOT_LOADER__.register(openFeedItemId, 'openFeedItemId', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/streamReducers.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/streamReducers.js');
	}();

	;

/***/ },
/* 29 */
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/defineProperty" ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 30 */
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 31 */
/*!**************************************!*\
  !*** ./src/actions/streamActions.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeFeedItem = exports.removeFeedItemFailure = exports.removeFeedItemSuccess = exports.removeFeedItemStart = exports.updateFeedItemServer = exports.updateFeedItemServerFailure = exports.updateFeedItemServerSuccess = exports.updateFeedItemServerStart = exports.addFeedItem = exports.addFeedItemFailure = exports.addFeedItemSuccess = exports.addFeedItemStart = exports.fetchFeedItems = exports.fetchFeedItemsFailure = exports.fetchFeedItemsSuccess = exports.fetchFeedItemsStart = exports.updateFeedItem = exports.closeFeedItem = exports.openFeedItem = exports.UPDATE_FEED_ITEM = exports.CLOSE_FEED_ITEM = exports.OPEN_FEED_ITEM = undefined;
	
	var _api = __webpack_require__(/*! ../utils/api */ 32);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _asyncActionUtils = __webpack_require__(/*! ./asyncActionUtils */ 37);
	
	var _uuid = __webpack_require__(/*! uuid */ 38);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//create a unique uuid
	
	var OPEN_FEED_ITEM = exports.OPEN_FEED_ITEM = 'OPEN_FEED_ITEM';
	var CLOSE_FEED_ITEM = exports.CLOSE_FEED_ITEM = 'CLOSE_FEED_ITEM';
	var UPDATE_FEED_ITEM = exports.UPDATE_FEED_ITEM = 'UPDATE_FEED_ITEM';
	
	// Synchronous local action: opens a specific item
	var openFeedItem = exports.openFeedItem = function openFeedItem(id) {
	  return {
	    type: OPEN_FEED_ITEM,
	    payload: { id: id }
	  };
	};
	
	// Synchronous local action: closes a specific item
	var closeFeedItem = exports.closeFeedItem = function closeFeedItem() {
	  return {
	    type: CLOSE_FEED_ITEM
	  };
	};
	
	// Synchronous local action: updates an item locally
	var updateFeedItem = exports.updateFeedItem = function updateFeedItem(content, id) {
	  return {
	    type: UPDATE_FEED_ITEM,
	    payload: {
	      id: id,
	      content: content
	    }
	  };
	};
	
	/**
	 * Fetch Feed Items from server: GET
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var fetchFeedItemsType = 'fetchFeedItems';
	var fetchFeedItemsStart = exports.fetchFeedItemsStart = (0, _asyncActionUtils.startAction)(fetchFeedItemsType);
	var fetchFeedItemsSuccess = exports.fetchFeedItemsSuccess = (0, _asyncActionUtils.successAction)(fetchFeedItemsType);
	var fetchFeedItemsFailure = exports.fetchFeedItemsFailure = (0, _asyncActionUtils.failureAction)(fetchFeedItemsType);
	var fetchFeedItems = exports.fetchFeedItems = (0, _asyncActionUtils.asyncAction)({
	  func: function func() {
	    return _api2.default.feedItems.fetchFeed();
	  },
	  start: fetchFeedItemsStart,
	  success: fetchFeedItemsSuccess,
	  failure: fetchFeedItemsFailure
	});
	
	/**
	 * Add feedItem to server: POST
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var addFeedItemType = 'addFeedItem';
	var addFeedItemStart = exports.addFeedItemStart = (0, _asyncActionUtils.startAction)(addFeedItemType);
	var addFeedItemSuccess = exports.addFeedItemSuccess = (0, _asyncActionUtils.successAction)(addFeedItemType);
	var addFeedItemFailure = exports.addFeedItemFailure = (0, _asyncActionUtils.failureAction)(addFeedItemType);
	var addFeedItem = exports.addFeedItem = (0, _asyncActionUtils.asyncAction)({
	  func: function func(content) {
	    return _api2.default.feedItems.add();
	  },
	  start: addFeedItemStart,
	  success: addFeedItemSuccess,
	  failure: addFeedItemFailure
	});
	
	/**
	 * Update feedItem on server: PUT
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var updateFeedItemServerType = 'updateFeedItemServer';
	var updateFeedItemServerStart = exports.updateFeedItemServerStart = (0, _asyncActionUtils.startAction)(updateFeedItemServerType);
	var updateFeedItemServerSuccess = exports.updateFeedItemServerSuccess = (0, _asyncActionUtils.successAction)(updateFeedItemServerType);
	var updateFeedItemServerFailure = exports.updateFeedItemServerFailure = (0, _asyncActionUtils.failureAction)(updateFeedItemServerType);
	var updateFeedItemServer = exports.updateFeedItemServer = (0, _asyncActionUtils.asyncAction)({
	  func: function func(id, content) {
	    return _api2.default.feedItems.update(id, content);
	  },
	  start: updateFeedItemServerStart,
	  success: updateFeedItemServerSuccess,
	  failure: updateFeedItemServerFailure
	});
	
	/**
	 * Remove feedItem from server: DELETE
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var removeFeedItemType = 'removeFeedItem';
	var removeFeedItemStart = exports.removeFeedItemStart = (0, _asyncActionUtils.startAction)(removeFeedItemType);
	var removeFeedItemSuccess = exports.removeFeedItemSuccess = (0, _asyncActionUtils.successAction)(removeFeedItemType);
	var removeFeedItemFailure = exports.removeFeedItemFailure = (0, _asyncActionUtils.failureAction)(removeFeedItemType);
	var removeFeedItem = exports.removeFeedItem = (0, _asyncActionUtils.asyncAction)({
	  func: function func(id) {
	    return _api2.default.feedItems.delete(id).then(function () {
	      return { id: id };
	    });
	  },
	  start: removeFeedItemStart,
	  success: removeFeedItemSuccess,
	  failure: removeFeedItemFailure
	});
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(OPEN_FEED_ITEM, 'OPEN_FEED_ITEM', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(CLOSE_FEED_ITEM, 'CLOSE_FEED_ITEM', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(UPDATE_FEED_ITEM, 'UPDATE_FEED_ITEM', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(openFeedItem, 'openFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(closeFeedItem, 'closeFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItem, 'updateFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchFeedItemsType, 'fetchFeedItemsType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchFeedItemsStart, 'fetchFeedItemsStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchFeedItemsSuccess, 'fetchFeedItemsSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchFeedItemsFailure, 'fetchFeedItemsFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchFeedItems, 'fetchFeedItems', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(addFeedItemType, 'addFeedItemType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(addFeedItemStart, 'addFeedItemStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(addFeedItemSuccess, 'addFeedItemSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(addFeedItemFailure, 'addFeedItemFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(addFeedItem, 'addFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItemServerType, 'updateFeedItemServerType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItemServerStart, 'updateFeedItemServerStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItemServerSuccess, 'updateFeedItemServerSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItemServerFailure, 'updateFeedItemServerFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItemServer, 'updateFeedItemServer', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(removeFeedItemType, 'removeFeedItemType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(removeFeedItemStart, 'removeFeedItemStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(removeFeedItemSuccess, 'removeFeedItemSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(removeFeedItemFailure, 'removeFeedItemFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	
	  __REACT_HOT_LOADER__.register(removeFeedItem, 'removeFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/streamActions.js');
	}();

	;

/***/ },
/* 32 */
/*!**************************!*\
  !*** ./src/utils/api.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.returnFeedItemsAndIds = exports.normalizeFeedItems = exports.objConvert = undefined;
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 8);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _normalizr = __webpack_require__(/*! normalizr */ 33);
	
	var _apiUtils = __webpack_require__(/*! ./apiUtils */ 34);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Create  schema for normalizr
	var feedItems = new _normalizr.Schema('feedItems');
	
	// Modify response for props
	// We can do it here or on server
	var objConvert = exports.objConvert = function objConvert(data) {
	  return data.map(function (json) {
	    var rObj = {};
	    var obj = JSON.parse(json);
	    rObj['id'] = obj.id_str;
	    rObj['content'] = obj.text;
	    return rObj;
	  });
	};
	
	// Process data from fetch:
	var normalizeFeedItems = exports.normalizeFeedItems = function normalizeFeedItems(data) {
	  return (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(feedItems));
	};
	
	// Process object returned from normalizeSongList into feedItems and feedItemIds
	var returnFeedItemsAndIds = exports.returnFeedItemsAndIds = function returnFeedItemsAndIds(_ref) {
	  var feedItems = _ref.entities.feedItems;
	  var feedItemIds = _ref.result;
	  return {
	    feedItems: feedItems,
	    feedItemIds: feedItemIds
	  };
	};
	
	var _default = {
	  feedItems: {
	    fetchFeed: function fetchFeed() {
	      console.log('fetch');
	      return (0, _apiUtils.fetchJson)('/feedItems')
	      //.then(objConvert)
	      .then(normalizeFeedItems).then(returnFeedItemsAndIds);
	    },
	    add: function add(content) {
	      return (0, _apiUtils.fetchJson)('/feedItems', {
	        method: 'POST',
	        body: (0, _stringify2.default)({ content: content })
	      });
	    },
	    update: function update(id, content) {
	      return (0, _apiUtils.fetchJson)('/feedItems/' + id, {
	        method: 'PUT',
	        body: (0, _stringify2.default)({ content: content })
	      });
	    },
	    delete: function _delete(id) {
	      return fetch('/feedItems/' + id, {
	        method: 'DELETE'
	      }).then(_apiUtils.checkStatus).then(function (res) {
	        return res.text();
	      });
	    }
	  }
	};
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(feedItems, 'feedItems', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/api.js');
	
	  __REACT_HOT_LOADER__.register(objConvert, 'objConvert', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/api.js');
	
	  __REACT_HOT_LOADER__.register(normalizeFeedItems, 'normalizeFeedItems', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/api.js');
	
	  __REACT_HOT_LOADER__.register(returnFeedItemsAndIds, 'returnFeedItemsAndIds', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/api.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/api.js');
	}();

	;

/***/ },
/* 33 */
/*!****************************!*\
  !*** external "normalizr" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("normalizr");

/***/ },
/* 34 */
/*!*******************************!*\
  !*** ./src/utils/apiUtils.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchJson = exports.checkStatus = exports.toJson = undefined;
	
	var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ 23);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 35);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	__webpack_require__(/*! isomorphic-fetch */ 36);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Utility to convert response stream from fetch to JSON
	var toJson = exports.toJson = function toJson(res) {
	  return res.json();
	};
	
	// Utility for bad status code for fetch
	// ( fetch promises by default are only rejected if connection fails )
	var checkStatus = exports.checkStatus = function checkStatus(res) {
	  var status = res.status;
	
	  if (status >= 200 && status < 300) {
	    return res;
	  }
	
	  return _promise2.default.reject(new Error(res.statusText || res.status));
	};
	
	// Wrapper for fetch to call checkStatus() and toJson()
	var fetchJson = exports.fetchJson = function fetchJson(url) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return fetch(url, (0, _extends3.default)({}, options, {
	    headers: (0, _extends3.default)({}, options.headers, {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    })
	  })).then(checkStatus).then(toJson);
	};
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(toJson, 'toJson', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/apiUtils.js');
	
	  __REACT_HOT_LOADER__.register(checkStatus, 'checkStatus', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/apiUtils.js');
	
	  __REACT_HOT_LOADER__.register(fetchJson, 'fetchJson', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/apiUtils.js');
	}();

	;

/***/ },
/* 35 */
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 36 */
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 37 */
/*!*****************************************!*\
  !*** ./src/actions/asyncActionUtils.js ***!
  \*****************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * These are generic start, success, and failure actions that are folded into a generic async
	 * action handler so that they can be reused as helpers for different async requests.
	 */
	
	/**
	 * action creator to dispatch initial action
	 * @param type : The action type
	 * meta: done = false : This notifies that we are starting an async action
	 */
	var startAction = exports.startAction = function startAction(type) {
	  return function () {
	    return {
	      type: type,
	      meta: {
	        done: false
	      }
	    };
	  };
	};
	
	/**
	 * On req.success dispatch success action
	 * @param type : the action type
	 * Returns a payload from the response that has any data
	 * Returns meta: done = true : This notifies that the action completed
	 */
	var successAction = exports.successAction = function successAction(type) {
	  return function (payload) {
	    return {
	      type: type,
	      payload: payload,
	      meta: {
	        done: true
	      }
	    };
	  };
	};
	
	/**
	 * On req.failure, dispatch failure action
	 * @param type : the action type
	 * Returns a payload from the response that has the error
	 * Returns meta: done = true : This notifies that the action completed
	 */
	var failureAction = exports.failureAction = function failureAction(type) {
	  return function (error) {
	    return {
	      type: type,
	      payload: error,
	      error: true,
	      meta: {
	        done: true
	      }
	    };
	  };
	};
	
	/**
	 * Asnyc helper action creator: returned func is picked up by redux-thunk and called with dispatch( opt to add getState)
	 * Before req, dispatch start to notify app that req is about to begin
	 * @param func : function called with ...args, returns a promise with then/catch handlers to dispatch correct action
	 * @param start : action Creator for starting action
	 * @param success : action Creator for action req success
	 * @param failure : action Creator for action req failure
	 */
	var asyncAction = exports.asyncAction = function asyncAction(_ref) {
	  var func = _ref.func;
	  var start = _ref.start;
	  var success = _ref.success;
	  var failure = _ref.failure;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return function (dispatch) {
	      dispatch(start());
	      return func.apply(undefined, args).then(function (data) {
	        return dispatch(success(data));
	      }).catch(function (error) {
	        return dispatch(failure(error));
	      });
	    };
	  };
	};
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(startAction, "startAction", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/asyncActionUtils.js");
	
	  __REACT_HOT_LOADER__.register(successAction, "successAction", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/asyncActionUtils.js");
	
	  __REACT_HOT_LOADER__.register(failureAction, "failureAction", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/asyncActionUtils.js");
	
	  __REACT_HOT_LOADER__.register(asyncAction, "asyncAction", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/asyncActionUtils.js");
	}();

	;

/***/ },
/* 38 */
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("uuid");

/***/ },
/* 39 */
/*!*************************************!*\
  !*** ./src/reducers/userReducer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 29);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ 23);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _userActions = __webpack_require__(/*! ../actions/userActions */ 40);
	
	var _ramda = __webpack_require__(/*! ramda */ 30);
	
	var _router = __webpack_require__(/*! ../actions/router */ 21);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = {
	  error: null, // last occurred error
	  token: null,
	  user: null
	};
	
	var _default = function _default() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _router.ROUTER_STATE_CHANGE:
	      return (0, _extends3.default)({}, state, {
	        error: null
	      });
	
	    // saves the token into the state
	    case 'registerUserServer':
	    case 'loginUser':
	      if (meta.done && !error) {
	        return (0, _ramda.merge)(state, (0, _defineProperty3.default)({}, payload.token, token));
	      }
	      return state;
	
	    // discards the current token & profile (logout)
	    case _userActions.LOGOUT:
	      return (0, _extends3.default)({}, initialState);
	
	    // saves the current user
	    case _userActions.UPDATE_USER:
	      return (0, _ramda.merge)(state, (0, _defineProperty3.default)({}, payload.user, user));
	    case 'updateUserServer':
	    case 'fetchUserProfile':
	      if (meta.done && !error) {
	        return (0, _ramda.merge)(state, (0, _defineProperty3.default)({}, payload.user, user));
	      }
	      return state;
	
	    // as always, on default do nothing
	    default:
	      return state;
	  }
	};
	
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(initialState, 'initialState', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/userReducer.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/reducers/userReducer.js');
	}();

	;

/***/ },
/* 40 */
/*!************************************!*\
  !*** ./src/actions/userActions.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteUser = exports.deleteUserFailure = exports.deleteUserSuccess = exports.deleteUserStart = exports.updateUserServer = exports.updateUserServerFailure = exports.updateUserServerSuccess = exports.updateUserServerStart = exports.loginUser = exports.loginUserFailure = exports.loginUserSuccess = exports.loginUserStart = exports.registerUserServer = exports.registerUserServerFailure = exports.registerUserServerSuccess = exports.registerUserServerStart = exports.fetchUserProfile = exports.fetchUserProfileFailure = exports.fetchUserProfileSuccess = exports.fetchUserProfileStart = exports.setToken = exports.loginSuccess = exports.logout = exports.registerUser = exports.updateUser = exports.closeProfile = exports.openProfile = exports.LOGIN_SUCCESS = exports.DISCARD_TOKEN = exports.SET_TOKEN = exports.LOGOUT = exports.REGISTER_USER = exports.UPDATE_USER = exports.CLOSE_PROFILE = exports.OPEN_PROFILE = undefined;
	
	var _userApi = __webpack_require__(/*! ../utils/userApi */ 41);
	
	var _userApi2 = _interopRequireDefault(_userApi);
	
	var _asyncActionUtils = __webpack_require__(/*! ./asyncActionUtils */ 37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var OPEN_PROFILE = exports.OPEN_PROFILE = 'OPEN_PROFILE';
	var CLOSE_PROFILE = exports.CLOSE_PROFILE = 'CLOSE_PROFILE';
	var UPDATE_USER = exports.UPDATE_USER = 'UPDATE_PROFILE';
	var REGISTER_USER = exports.REGISTER_USER = 'REGISTER_USER';
	var LOGOUT = exports.LOGOUT = 'LOGOUT';
	var SET_TOKEN = exports.SET_TOKEN = 'SET_TOKEN';
	var DISCARD_TOKEN = exports.DISCARD_TOKEN = 'DISCARD_TOKEN';
	var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
	
	// Synchronous local action: opens a specific item
	var openProfile = exports.openProfile = function openProfile(id) {
	  return {
	    type: OPEN_PROFILE,
	    payload: { id: id }
	  };
	};
	
	// Synchronous local action: closes a specific item
	var closeProfile = exports.closeProfile = function closeProfile() {
	  return {
	    type: CLOSE_PROFILE
	  };
	};
	
	// Synchronous local action: updates an item locally
	var updateUser = exports.updateUser = function updateUser(profile, id) {
	  return {
	    type: UPDATE_USER,
	    payload: {
	      id: id,
	      profile: profile
	    }
	  };
	};
	
	// Synchronous local action: updates an item locally
	var registerUser = exports.registerUser = function registerUser(email, password) {
	  return {
	    type: REGISTER_USER,
	    payload: {
	      email: email,
	      password: password
	    }
	  };
	};
	
	var logout = exports.logout = function logout(router) {
	  return function (dispatch) {
	    dispatch({ type: LOGOUT });
	    router.transitionTo(['/login', { redirectTo: stringifyLocation(router.state.location) }]);
	  };
	};
	
	var loginSuccess = exports.loginSuccess = function loginSuccess(router) {
	  return function (dispatch) {
	    dispatch({ type: LOGIN_SUCCESS });
	    router.transitionTo(['/stream', { redirectTo: stringifyLocation(router.state.location) }]);
	  };
	};
	
	var setToken = exports.setToken = function setToken(token) {
	  return {
	    type: SET_TOKEN,
	    token: token
	  };
	};
	
	/**
	 * Fetch Feed Items from server: GET
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var fetchUserProfileType = 'fetchUserProfile';
	var fetchUserProfileStart = exports.fetchUserProfileStart = (0, _asyncActionUtils.startAction)(fetchUserProfileType);
	var fetchUserProfileSuccess = exports.fetchUserProfileSuccess = (0, _asyncActionUtils.successAction)(fetchUserProfileType);
	var fetchUserProfileFailure = exports.fetchUserProfileFailure = (0, _asyncActionUtils.failureAction)(fetchUserProfileType);
	var fetchUserProfile = exports.fetchUserProfile = (0, _asyncActionUtils.asyncAction)({
	  func: function func(id) {
	    return _userApi2.default.USER.fetch(id);
	  },
	  start: fetchUserProfileStart,
	  success: fetchUserProfileSuccess,
	  failure: fetchUserProfileFailure
	});
	
	/**
	 * Register User: POST
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var registerUserServerType = 'registerUserServer';
	var registerUserServerStart = exports.registerUserServerStart = (0, _asyncActionUtils.startAction)(registerUserServerType);
	var registerUserServerSuccess = exports.registerUserServerSuccess = (0, _asyncActionUtils.successAction)(registerUserServerType);
	var registerUserServerFailure = exports.registerUserServerFailure = (0, _asyncActionUtils.failureAction)(registerUserServerType);
	var registerUserServer = exports.registerUserServer = (0, _asyncActionUtils.asyncAction)({
	  func: function func(username, email, password) {
	    return _userApi2.default.USER.register(username, email, password);
	  },
	  start: registerUserServerStart,
	  success: registerUserServerSuccess,
	  failure: registerUserServerFailure
	});
	
	/**
	 * Login : POST
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var loginUserType = 'loginUser';
	var loginUserStart = exports.loginUserStart = (0, _asyncActionUtils.startAction)(loginUserType);
	var loginUserSuccess = exports.loginUserSuccess = (0, _asyncActionUtils.successAction)(loginUserType);
	var loginUserFailure = exports.loginUserFailure = (0, _asyncActionUtils.failureAction)(loginUserType);
	var loginUser = exports.loginUser = (0, _asyncActionUtils.asyncAction)({
	  func: function func(username, password) {
	    return _userApi2.default.USER.login(username, password);
	  },
	  start: loginUserStart,
	  success: loginUserSuccess,
	  failure: loginUserFailure
	});
	
	/**
	 * Update User Profile on server: PUT
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var updateUserServerType = 'updateUserServer';
	var updateUserServerStart = exports.updateUserServerStart = (0, _asyncActionUtils.startAction)(updateUserServerType);
	var updateUserServerSuccess = exports.updateUserServerSuccess = (0, _asyncActionUtils.successAction)(updateUserServerType);
	var updateUserServerFailure = exports.updateUserServerFailure = (0, _asyncActionUtils.failureAction)(updateUserServerType);
	var updateUserServer = exports.updateUserServer = (0, _asyncActionUtils.asyncAction)({
	  func: function func(id, userData) {
	    return _userApi2.default.USER.updateUser(id, userData);
	  },
	  start: updateUserServerStart,
	  success: updateUserServerSuccess,
	  failure: updateUserServerFailure
	});
	
	/**
	 * Login : POST
	 * Action Type, start, success, failure, and async actions
	 * using helpers from asyncActionUtils.js
	 */
	var deleteUserType = 'deleteUser';
	var deleteUserStart = exports.deleteUserStart = (0, _asyncActionUtils.startAction)(deleteUserType);
	var deleteUserSuccess = exports.deleteUserSuccess = (0, _asyncActionUtils.successAction)(deleteUserType);
	var deleteUserFailure = exports.deleteUserFailure = (0, _asyncActionUtils.failureAction)(deleteUserType);
	var deleteUser = exports.deleteUser = (0, _asyncActionUtils.asyncAction)({
	  func: function func(id) {
	    return _userApi2.default.USER.delete();
	  },
	  start: deleteUserStart,
	  success: deleteUserSuccess,
	  failure: deleteUserFailure
	});
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(OPEN_PROFILE, 'OPEN_PROFILE', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(CLOSE_PROFILE, 'CLOSE_PROFILE', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(UPDATE_USER, 'UPDATE_USER', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(REGISTER_USER, 'REGISTER_USER', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(LOGOUT, 'LOGOUT', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(SET_TOKEN, 'SET_TOKEN', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(DISCARD_TOKEN, 'DISCARD_TOKEN', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(LOGIN_SUCCESS, 'LOGIN_SUCCESS', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(openProfile, 'openProfile', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(closeProfile, 'closeProfile', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(updateUser, 'updateUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(registerUser, 'registerUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(logout, 'logout', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(loginSuccess, 'loginSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(setToken, 'setToken', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchUserProfileType, 'fetchUserProfileType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchUserProfileStart, 'fetchUserProfileStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchUserProfileSuccess, 'fetchUserProfileSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchUserProfileFailure, 'fetchUserProfileFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(fetchUserProfile, 'fetchUserProfile', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(registerUserServerType, 'registerUserServerType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(registerUserServerStart, 'registerUserServerStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(registerUserServerSuccess, 'registerUserServerSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(registerUserServerFailure, 'registerUserServerFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(registerUserServer, 'registerUserServer', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(loginUserType, 'loginUserType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(loginUserStart, 'loginUserStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(loginUserSuccess, 'loginUserSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(loginUserFailure, 'loginUserFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(loginUser, 'loginUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(updateUserServerType, 'updateUserServerType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(updateUserServerStart, 'updateUserServerStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(updateUserServerSuccess, 'updateUserServerSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(updateUserServerFailure, 'updateUserServerFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(updateUserServer, 'updateUserServer', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(deleteUserType, 'deleteUserType', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(deleteUserStart, 'deleteUserStart', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(deleteUserSuccess, 'deleteUserSuccess', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(deleteUserFailure, 'deleteUserFailure', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	
	  __REACT_HOT_LOADER__.register(deleteUser, 'deleteUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/userActions.js');
	}();

	;

/***/ },
/* 41 */
/*!******************************!*\
  !*** ./src/utils/userApi.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.returnUserData = exports.normalizeUserData = exports.objConvert = undefined;
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 8);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	__webpack_require__(/*! isomorphic-fetch */ 36);
	
	var _normalizr = __webpack_require__(/*! normalizr */ 33);
	
	var _apiUtils = __webpack_require__(/*! ./apiUtils */ 34);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Create  schema for normalizr
	var userProfileData = new _normalizr.Schema('userProfileData');
	
	// Modify response for props
	// We can do it here or on server
	var objConvert = exports.objConvert = function objConvert(data) {
	  return data.map(function (json) {
	    var rObj = {};
	    var obj = JSON.parse(json);
	    rObj['id'] = obj.id_str;
	    rObj['content'] = obj.text;
	    return rObj;
	  });
	};
	
	// Process data from fetch:
	var normalizeUserData = exports.normalizeUserData = function normalizeUserData(data) {
	  return (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(userData));
	};
	
	// Process object returned from normalizeUserData into userData and userDataIds
	var returnUserData = exports.returnUserData = function returnUserData(_ref) {
	  var userData = _ref.entities.userData;
	  var userDataIds = _ref.result;
	  return {
	    userData: userData,
	    userDataIds: userDataIds
	  };
	};
	
	var _default = {
	  USER: {
	    register: function register(username, email, password) {
	      console.log("req sent");
	      return (0, _apiUtils.fetchJson)('http://54.212.196.159:5000/user', {
	        method: 'POST',
	        body: (0, _stringify2.default)({ username: username, email: email, password: password })
	      });
	    },
	    login: function login(username, password) {
	      return (0, _apiUtils.fetchJson)('http://54.212.196.159:5000/user/login', {
	        method: 'POST',
	        body: (0, _stringify2.default)({ username: username, password: password })
	      });
	    },
	    fetch: function fetch(username) {
	      return (0, _apiUtils.fetchJson)('http://54.212.196.159:5000/user/' + username)
	      //.then(objConvert)
	      .then(normalizeUserData).then(returnUserData);
	    },
	    updateUser: function updateUser(username, userData) {
	      return (0, _apiUtils.fetchJson)('http://54.212.196.159:5000/user/' + username, {
	        method: 'PUT',
	        body: (0, _stringify2.default)({ userData: userData })
	      });
	    },
	    delete: function _delete(username) {
	      return fetch('http://54.212.196.159:5000/user/' + username, {
	        method: 'DELETE'
	      }).then(_apiUtils.checkStatus).then(function (res) {
	        return res.text();
	      });
	    }
	  }
	};
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(userProfileData, 'userProfileData', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/userApi.js');
	
	  __REACT_HOT_LOADER__.register(objConvert, 'objConvert', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/userApi.js');
	
	  __REACT_HOT_LOADER__.register(normalizeUserData, 'normalizeUserData', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/userApi.js');
	
	  __REACT_HOT_LOADER__.register(returnUserData, 'returnUserData', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/userApi.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/utils/userApi.js');
	}();

	;

/***/ },
/* 42 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 43 */
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 11);
	
	var _Home = __webpack_require__(/*! ./components/Home/Home */ 44);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _about = __webpack_require__(/*! ./components/About/about */ 60);
	
	var _about2 = _interopRequireDefault(_about);
	
	var _stream = __webpack_require__(/*! ./components/StreamList/stream */ 62);
	
	var _stream2 = _interopRequireDefault(_stream);
	
	var _Page = __webpack_require__(/*! ./components/Page404/Page404 */ 69);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	var _App = __webpack_require__(/*! ./Containers/App/App */ 71);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _NewUserSetup = __webpack_require__(/*! ./components/NewUserSetup/NewUserSetup */ 75);
	
	var _NewUserSetup2 = _interopRequireDefault(_NewUserSetup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _default = _react2.default.createElement(
		_reactRouter.Route,
		{ name: 'app', path: '/', component: _App2.default },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'login', path: 'login', component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'about', path: 'about', component: _about2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'stream', path: 'stream', component: _stream2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'NewUserSetup', path: 'NewUserSetup', component: _NewUserSetup2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: '404', path: '*', component: _Page2.default })
	);
	
	exports.default = _default;
	;

	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}

		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/routes.js');
	}();

	;

/***/ },
/* 44 */
/*!*************************************!*\
  !*** ./src/components/Home/Home.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 8);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 35);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 50);
	
	var _MaterialUiLogin = __webpack_require__(/*! ../HomeForms/Material-ui-Login */ 51);
	
	var _MaterialUiLogin2 = _interopRequireDefault(_MaterialUiLogin);
	
	var _MaterialUiRegister = __webpack_require__(/*! ../HomeForms/Material-ui-Register */ 55);
	
	var _MaterialUiRegister2 = _interopRequireDefault(_MaterialUiRegister);
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _LaunchPageActions = __webpack_require__(/*! ../../actions/LaunchPageActions */ 56);
	
	var LaunchPageActions = _interopRequireWildcard(_LaunchPageActions);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 10);
	
	var _Paper = __webpack_require__(/*! material-ui/Paper */ 57);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _Home = __webpack_require__(/*! ./Home.css */ 58);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _materialUi = __webpack_require__(/*! material-ui */ 59);
	
	var _userActions = __webpack_require__(/*! ../../actions/userActions */ 40);
	
	var actionCreators = _interopRequireWildcard(_userActions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var showResults = function showResults(values) {
	  return new _promise2.default(function (resolve, reject) {
	    setTimeout(function () {
	      // simulate server latency
	      resolve(values);
	    }, 500);
	  });
	};
	//require("!style!css!./Home.css");
	
	
	var simAsync = function simAsync(values) {
	  showResults(values).then(function (result) {
	    console.log(result);
	    window.alert('You submitted:\n\n' + (0, _stringify2.default)(result, null, 2));
	  });
	};
	
	function mapStateToProps(state) {
	  return {
	    userData: state.userData,
	    userDataIds: state.userDataIds
	  };
	}
	
	var Home = function (_Component) {
	  (0, _inherits3.default)(Home, _Component);
	
	  function Home(props) {
	    (0, _classCallCheck3.default)(this, Home);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));
	
	    _this.handleToggle = function (e) {
	      _this.setState({ value: _this.state.value });
	    };
	
	    _this.state = {
	      value: 'a'
	    };
	    return _this;
	  }
	
	  (0, _createClass3.default)(Home, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var loginUser = _props.loginUser;
	      var registerUserServer = _props.registerUserServer;
	
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _Paper2.default,
	          { className: _Home2.default.paperBlock },
	          _react2.default.createElement(
	            _materialUi.Tabs,
	            null,
	            _react2.default.createElement(
	              _materialUi.Tab,
	              { label: 'Sign In', value: 'a' },
	              _react2.default.createElement(_MaterialUiLogin2.default, { loginUser: loginUser })
	            ),
	            _react2.default.createElement(
	              _materialUi.Tab,
	              { label: 'Register', value: 'b' },
	              _react2.default.createElement(_MaterialUiRegister2.default, { registerUser: registerUserServer })
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return Home;
	}(_react.Component);
	
	var _default = (0, _reactRedux.connect)(mapStateToProps, actionCreators)(Home);
	
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(showResults, 'showResults', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Home/Home.js');
	
	  __REACT_HOT_LOADER__.register(simAsync, 'simAsync', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Home/Home.js');
	
	  __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Home/Home.js');
	
	  __REACT_HOT_LOADER__.register(Home, 'Home', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Home/Home.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Home/Home.js');
	}();

	;

/***/ },
/* 45 */
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-prototype-of" ***!
  \****************************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 46 */
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 47 */
/*!****************************************************!*\
  !*** external "babel-runtime/helpers/createClass" ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 48 */
/*!******************************************************************!*\
  !*** external "babel-runtime/helpers/possibleConstructorReturn" ***!
  \******************************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 49 */
/*!*************************************************!*\
  !*** external "babel-runtime/helpers/inherits" ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 50 */
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 51 */
/*!*******************************************************!*\
  !*** ./src/components/HomeForms/Material-ui-Login.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 52);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 29);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RaisedButton = __webpack_require__(/*! material-ui/RaisedButton */ 53);
	
	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
	
	var _TextField = __webpack_require__(/*! material-ui/TextField */ 54);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function validate(values) {
	  var errors = {};
	
	  // Check Required Fields have been submitted
	  var requiredFields = ['username', 'password'];
	  requiredFields.forEach(function (field) {
	    if (!values[field]) {
	      errors[field] = 'Required';
	    }
	  });
	  return errors;
	}
	
	var LoginForm = function (_React$Component) {
	  (0, _inherits3.default)(LoginForm, _React$Component);
	
	  function LoginForm(props) {
	    (0, _classCallCheck3.default)(this, LoginForm);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (LoginForm.__proto__ || (0, _getPrototypeOf2.default)(LoginForm)).call(this, props));
	
	    _this.state = {
	      username: '',
	      password: '',
	      errors: {}
	    };
	    _this.handleChange = _this.handleChange.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	
	    return _this;
	  }
	
	  (0, _createClass3.default)(LoginForm, [{
	    key: 'handleChange',
	    value: function handleChange(e) {
	      this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      e.preventDefault();
	      var form = {
	        username: this.state.username,
	        password: this.state.password
	      };
	      var errors = validate(form);
	      this.setState({
	        errors: errors
	      });
	      console.log(errors);
	      if ((0, _keys2.default)(errors).length === 0) {
	        alert('Email: ' + this.state.username + ' \nPassword: ' + this.state.password);
	        this.props.loginUser(form.username, form.password);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { style: { "align": "center", "textAlign": "center" } },
	        _react2.default.createElement(
	          'form',
	          { onSubmit: this.handleSubmit },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_TextField2.default, {
	              id: 'username', type: 'text',
	              hintText: 'Username',
	              floatingLabelText: 'Username',
	              value: this.state.username,
	              onChange: this.handleChange,
	              errorText: this.state.errors.username
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(_TextField2.default, {
	              id: 'password', type: 'password',
	              hintText: 'Password',
	              floatingLabelText: 'Password',
	              value: this.state.password,
	              onChange: this.handleChange,
	              errorText: this.state.errors.password
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(_RaisedButton2.default, { label: 'Submit', primary: true, type: 'submit', disabled: this.props.submitting })
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return LoginForm;
	}(_react2.default.Component);
	
	var _default = LoginForm;
	exports.default = _default;
	
	
	function validateEmail(email) {
	  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  //re.test(email) ? this.state.errorText = "Invalid Email" : this.state.errorText = '';
	  console.log(re.test(email));
	  //console.log(this.state.errorText);
	};
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(validate, 'validate', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Login.js');
	
	  __REACT_HOT_LOADER__.register(LoginForm, 'LoginForm', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Login.js');
	
	  __REACT_HOT_LOADER__.register(validateEmail, 'validateEmail', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Login.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Login.js');
	}();

	;

/***/ },
/* 52 */
/*!****************************************************!*\
  !*** external "babel-runtime/core-js/object/keys" ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 53 */
/*!*******************************************!*\
  !*** external "material-ui/RaisedButton" ***!
  \*******************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/RaisedButton");

/***/ },
/* 54 */
/*!****************************************!*\
  !*** external "material-ui/TextField" ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/TextField");

/***/ },
/* 55 */
/*!**********************************************************!*\
  !*** ./src/components/HomeForms/Material-ui-Register.js ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _keys = __webpack_require__(/*! babel-runtime/core-js/object/keys */ 52);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 29);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RaisedButton = __webpack_require__(/*! material-ui/RaisedButton */ 53);
	
	var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
	
	var _TextField = __webpack_require__(/*! material-ui/TextField */ 54);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*  Validate Form input   */
	var validate = function validate(values) {
	  var errors = {};
	
	  // Check Required Fields have been submitted
	  var requiredFields = ['username', 'email', 'password1', 'password2'];
	  requiredFields.forEach(function (field) {
	    if (!values[field]) {
	      errors[field] = 'Required';
	    }
	  });
	  // Validate Email
	  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	    errors.email = 'Invalid email address';
	  }
	  // Validate Passwords Match
	  if (values.password1 !== values.password2) {
	    errors.password2 = 'Passwords Must Match!';
	  }
	  return errors;
	};
	
	/*  Material UI Form  */
	
	var RegisterForm = function (_React$Component) {
	  (0, _inherits3.default)(RegisterForm, _React$Component);
	
	  function RegisterForm(props) {
	    (0, _classCallCheck3.default)(this, RegisterForm);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (RegisterForm.__proto__ || (0, _getPrototypeOf2.default)(RegisterForm)).call(this, props));
	
	    _this.state = {
	      username: '',
	      email: '',
	      password1: '',
	      password2: '',
	      errors: {}
	    };
	    _this.handleChange = _this.handleChange.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    _this.mixins = [_reactRouter.Navigation];
	    return _this;
	  }
	
	  (0, _createClass3.default)(RegisterForm, [{
	    key: 'handleChange',
	    value: function handleChange(e) {
	      this.setState((0, _defineProperty3.default)({}, e.target.id, e.target.value));
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      e.preventDefault();
	      var form = {
	        username: this.state.username,
	        email: this.state.email,
	        password1: this.state.password1,
	        password2: this.state.password2
	      };
	      var errors = validate(form);
	      this.setState({
	        errors: errors
	      });
	      //console.log(errors);
	      if ((0, _keys2.default)(errors).length === 0) {
	        var res = confirm('Username: ' + this.state.username + ' \nEmail: ' + this.state.email + ' \nPassword: ' + this.state.password1);
	        this.props.registerUser(form.username, form.email, form.password1);
	        if (res) {
	          window.location.href = "/newusersetup";
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { style: { "align": "center", "textAlign": "center" } },
	        _react2.default.createElement(
	          'form',
	          { onSubmit: this.handleSubmit },
	          _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_TextField2.default, {
	              id: 'username', type: 'text',
	              hintText: 'Username',
	              floatingLabelText: 'Username',
	              value: this.state.username,
	              onChange: this.handleChange,
	              errorText: this.state.errors.username
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(_TextField2.default, {
	              id: 'email', type: 'email',
	              hintText: 'Email',
	              floatingLabelText: 'Email',
	              value: this.state.email,
	              onChange: this.handleChange,
	              errorText: this.state.errors.email
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(_TextField2.default, {
	              id: 'password1', type: 'password',
	              hintText: 'Password',
	              floatingLabelText: 'Password',
	              value: this.state.password1,
	              onChange: this.handleChange,
	              errorText: this.state.errors.password1
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(_TextField2.default, {
	              id: 'password2', type: 'password',
	              hintText: 'Password',
	              floatingLabelText: 'Password',
	              value: this.state.password2,
	              onChange: this.handleChange,
	              errorText: this.state.errors.password2
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(_RaisedButton2.default, { label: 'Submit', primary: true, type: 'submit', disabled: this.props.submitting })
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return RegisterForm;
	}(_react2.default.Component);
	
	var _default = RegisterForm;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(validate, 'validate', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Register.js');
	
	  __REACT_HOT_LOADER__.register(RegisterForm, 'RegisterForm', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Register.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/HomeForms/Material-ui-Register.js');
	}();

	;

/***/ },
/* 56 */
/*!******************************************!*\
  !*** ./src/actions/LaunchPageActions.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.userLogin = userLogin;
	
	var _axios = __webpack_require__(/*! axios */ 25);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function userLogin(email, password) {
	  return {
	    type: 'USER_LOGIN',
	    email: email,
	    password: password,
	    date: Date.now()
	  };
	}
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(userLogin, 'userLogin', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/actions/LaunchPageActions.js');
	}();

	;

/***/ },
/* 57 */
/*!************************************!*\
  !*** external "material-ui/Paper" ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/Paper");

/***/ },
/* 58 */
/*!**************************************!*\
  !*** ./src/components/Home/Home.css ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = {
		"paperBlock": "Home__paperBlock___1difl"
	};

/***/ },
/* 59 */
/*!******************************!*\
  !*** external "material-ui" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("material-ui");

/***/ },
/* 60 */
/*!***************************************!*\
  !*** ./src/components/About/about.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 10);
	
	var _Paper = __webpack_require__(/*! material-ui/Paper */ 57);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _about = __webpack_require__(/*! ./about.css */ 61);
	
	var _about2 = _interopRequireDefault(_about);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var About = function (_Component) {
		(0, _inherits3.default)(About, _Component);
	
		function About() {
			(0, _classCallCheck3.default)(this, About);
			return (0, _possibleConstructorReturn3.default)(this, (About.__proto__ || (0, _getPrototypeOf2.default)(About)).apply(this, arguments));
		}
	
		(0, _createClass3.default)(About, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: _about2.default.about },
					_react2.default.createElement(
						_Paper2.default,
						{ style: { "align": "center", "textAlign": "center", "margin": "50px", "padding": "20px" } },
						_react2.default.createElement(
							'h1',
							{ className: _about2.default.title },
							'About Our Project'
						),
						_react2.default.createElement(
							'div',
							{ className: _about2.default.content },
							'Moonwalk is a web based platform which integrates major social media networks. It allows users to seamlessly read, post, and share content across social media profiles. Moonwalk is capable of organizing content in a meaningful way by providing custom filter controls empowering users to curate their social media content. Our platform aggregates the user\u2019s social media feeds and displays relevant content in one unified user stream. Additionally, it allows users to post and share across social media networks with just a click. Moonwalk empowers users to manage their online presence like never before.'
						)
					)
				);
			}
		}]);
		return About;
	}(_react.Component);
	//require("!style!css!./about.css");
	
	
	var _default = About;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(About, 'About', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/About/about.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/About/about.js');
	}();

	;

/***/ },
/* 61 */
/*!****************************************!*\
  !*** ./src/components/About/about.css ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = {
		"about": "about__about___21__E",
		"title": "about__title___35tnn",
		"context": "about__context___3BroH"
	};

/***/ },
/* 62 */
/*!*********************************************!*\
  !*** ./src/components/StreamList/stream.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 10);
	
	var _streamActions = __webpack_require__(/*! ../../actions/streamActions */ 31);
	
	var actionCreators = _interopRequireWildcard(_streamActions);
	
	var _selectors = __webpack_require__(/*! ../../lib/selectors */ 63);
	
	var selectors = _interopRequireWildcard(_selectors);
	
	var _materialUi = __webpack_require__(/*! material-ui */ 59);
	
	var _Subheader = __webpack_require__(/*! material-ui/Subheader */ 64);
	
	var _Subheader2 = _interopRequireDefault(_Subheader);
	
	var _IconButton = __webpack_require__(/*! material-ui/IconButton */ 65);
	
	var _IconButton2 = _interopRequireDefault(_IconButton);
	
	var _Paper = __webpack_require__(/*! material-ui/Paper */ 57);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _starBorder = __webpack_require__(/*! material-ui/svg-icons/toggle/star-border */ 66);
	
	var _starBorder2 = _interopRequireDefault(_starBorder);
	
	var _StreamItem = __webpack_require__(/*! ../StreamItem/StreamItem */ 67);
	
	var _StreamItem2 = _interopRequireDefault(_StreamItem);
	
	var _stream = __webpack_require__(/*! ./stream.css */ 68);
	
	var _stream2 = _interopRequireDefault(_stream);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StreamList = function (_Component) {
		(0, _inherits3.default)(StreamList, _Component);
	
		function StreamList() {
			var _ref;
	
			var _temp, _this, _ret;
	
			(0, _classCallCheck3.default)(this, StreamList);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StreamList.__proto__ || (0, _getPrototypeOf2.default)(StreamList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
				isToggleOn: false
			}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}
	
		(0, _createClass3.default)(StreamList, [{
			key: 'handleToggle',
	
	
			//this.handleToggle = this.handleToggle.bind(this)
	
			value: function handleToggle() {
				this.setState(function (prevState) {
					return {
						isToggleOn: !prevState.isToggleOn
					};
				});
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.fetchFeedItems();
				// For easy console fun
				// console.log(this.props.fetchFeedItems());
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props;
				var feedItems = _props.feedItems;
				var openFeedItemId = _props.openFeedItemId;
				var addFeedItem = _props.addFeedItem;
				var openFeedItem = _props.openFeedItem;
	
	
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_Paper2.default,
						{ className: _stream2.default.paperBlock },
						_react2.default.createElement(
							'h1',
							{ className: _stream2.default.title },
							'User Stream'
						),
						_react2.default.createElement(
							'div',
							{ className: _stream2.default.StreamContent },
							_react2.default.createElement(
								'button',
								{ className: _stream2.default.addFeedItemButton, onClick: function onClick() {
										return addFeedItem();
									} },
								'Create Post'
							)
						),
						_react2.default.createElement('br', null),
						_react2.default.createElement(
							_materialUi.GridList,
							{ cellHeight: 180, className: _stream2.default.gridList, padding: 10 },
							feedItems.length === 0 ? _react2.default.createElement(
								'div',
								null,
								'No Content...'
							) : feedItems.map(function (tile) {
								return _react2.default.createElement(
									_materialUi.GridTile,
									{
										className: _stream2.default.gridTile,
										title: tile.id,
										actionIcon: _react2.default.createElement(
											_IconButton2.default,
											null,
											_react2.default.createElement(_starBorder2.default, { color: 'white' })
										)
									},
									tile.content
								);
							})
						)
					)
				);
			}
		}]);
		return StreamList;
	}(_react.Component);
	
	StreamList.propTypes = {
		feedItems: _react.PropTypes.arrayOf(_react.PropTypes.shape({
			content: _react.PropTypes.string.isRequired,
			id: _react.PropTypes.string.isRequired
		}).isRequired).isRequired,
		openFeedItem: _react.PropTypes.func.isRequired,
		addFeedItem: _react.PropTypes.func.isRequired,
		openFeedItemId: _react.PropTypes.string,
		fetchFeedItems: _react.PropTypes.func.isRequired
	};
	
	var selector = function selector(state) {
		return {
			feedItems: selectors.getFeedItems(state),
			openFeedItemId: selectors.getOpenFeedItemId(state)
		};
	};
	
	var _default = (0, _reactRedux.connect)(selector, actionCreators)(StreamList);
	
	exports.default = _default;
	;
	
	var _temp2 = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(StreamList, 'StreamList', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/StreamList/stream.js');
	
		__REACT_HOT_LOADER__.register(selector, 'selector', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/StreamList/stream.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/StreamList/stream.js');
	}();

	;

/***/ },
/* 63 */
/*!******************************!*\
  !*** ./src/lib/selectors.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * These are used in components to select items needed
	 * just import the selectors and attach to either an individual item or an item list
	 */
	
	/**
	 * This maps the feedItems to an array of ids
	 * Used for a list of items
	 */
	var getFeedItems = exports.getFeedItems = function getFeedItems(state) {
	  return state.ids.map(function (id) {
	    return state.byId[id];
	  });
	};
	
	/**
	 * Sets the open feedItem id in state
	 * used for an individual selected item in a list
	 */
	var getOpenFeedItemId = exports.getOpenFeedItemId = function getOpenFeedItemId(state) {
	  return state.openFeedItemId;
	};
	
	/**
	 * Gets the id of an item to get the item
	 * Used for individual items
	 */
	var getFeedItem = exports.getFeedItem = function getFeedItem(state, id) {
	  return state.byId[id] || null;
	};
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(getFeedItems, "getFeedItems", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/lib/selectors.js");
	
	  __REACT_HOT_LOADER__.register(getOpenFeedItemId, "getOpenFeedItemId", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/lib/selectors.js");
	
	  __REACT_HOT_LOADER__.register(getFeedItem, "getFeedItem", "C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/lib/selectors.js");
	}();

	;

/***/ },
/* 64 */
/*!****************************************!*\
  !*** external "material-ui/Subheader" ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/Subheader");

/***/ },
/* 65 */
/*!*****************************************!*\
  !*** external "material-ui/IconButton" ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/IconButton");

/***/ },
/* 66 */
/*!***********************************************************!*\
  !*** external "material-ui/svg-icons/toggle/star-border" ***!
  \***********************************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/svg-icons/toggle/star-border");

/***/ },
/* 67 */
/*!*************************************************!*\
  !*** ./src/components/StreamItem/StreamItem.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _stream = __webpack_require__(/*! ../StreamList/stream.css */ 68);
	
	var _stream2 = _interopRequireDefault(_stream);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StreamContent = function StreamContent(props) {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'h2',
				null,
				'This is the Stream Area'
			),
			_react2.default.createElement(
				'p',
				null,
				'Fill with input from social feed'
			)
		);
	};
	
	var _default = StreamContent;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(StreamContent, 'StreamContent', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/StreamItem/StreamItem.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/StreamItem/StreamItem.js');
	}();

	;

/***/ },
/* 68 */
/*!**********************************************!*\
  !*** ./src/components/StreamList/stream.css ***!
  \**********************************************/
/***/ function(module, exports) {

	module.exports = {
		"Stream": "stream__Stream___2_gM-",
		"paperBlock": "stream__paperBlock___1h__u",
		"title": "stream__title___3mvpX",
		"gridList": "stream__gridList___29KAP",
		"gridTile": "stream__gridTile___2cQvy"
	};

/***/ },
/* 69 */
/*!*******************************************!*\
  !*** ./src/components/Page404/Page404.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _redux = __webpack_require__(/*! redux */ 14);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 10);
	
	var _Page = __webpack_require__(/*! ./Page404.css */ 70);
	
	var _Page2 = _interopRequireDefault(_Page);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import { Button } from 'react-toolbox/lib/button';
	// <Button label="React-ToolBox Button" />
	
	var Page404 = function (_Component) {
		(0, _inherits3.default)(Page404, _Component);
	
		function Page404() {
			(0, _classCallCheck3.default)(this, Page404);
			return (0, _possibleConstructorReturn3.default)(this, (Page404.__proto__ || (0, _getPrototypeOf2.default)(Page404)).apply(this, arguments));
		}
	
		(0, _createClass3.default)(Page404, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'page404' },
					_react2.default.createElement(
						'h1',
						null,
						'404 - Page Not Found'
					)
				);
			}
		}]);
		return Page404;
	}(_react.Component);
	//require("!style!css!./Page404.css");
	
	
	var _default = Page404;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Page404, 'Page404', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Page404/Page404.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/Page404/Page404.js');
	}();

	;

/***/ },
/* 70 */
/*!********************************************!*\
  !*** ./src/components/Page404/Page404.css ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = {
		"page404": "Page404__page404___pyeXE"
	};

/***/ },
/* 71 */
/*!***********************************!*\
  !*** ./src/Containers/App/App.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _NavBar = __webpack_require__(/*! ../NavBar/NavBar */ 72);
	
	var _NavBar2 = _interopRequireDefault(_NavBar);
	
	var _App = __webpack_require__(/*! ./App.css */ 73);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactTapEventPlugin = __webpack_require__(/*! react-tap-event-plugin */ 74);
	
	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _reactTapEventPlugin2.default)();
	
	/*
	 * React-router's <Router> component renders <Route>'s
	 * and replaces `this.props.children` with the proper React Component.
	 *
	 * Please refer to `routes.jsx` for the route config.
	 *
	 * A better explanation of react-router is available here:
	 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
	 */
	var App = function App(_ref) {
	  var children = _ref.children;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_NavBar2.default, null),
	    children,
	    _react2.default.createElement(
	      'footer',
	      { className: _App2.default.footer },
	      _react2.default.createElement(
	        'p',
	        { className: _App2.default.footerLink, target: '_blank' },
	        'Copyright \xA9 2016 Team Moonwalk'
	      )
	    )
	  );
	};
	
	var _default = App;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(App, 'App', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/Containers/App/App.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/Containers/App/App.js');
	}();

	;

/***/ },
/* 72 */
/*!*****************************************!*\
  !*** ./src/Containers/NavBar/NavBar.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 11);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 10);
	
	var _materialUi = __webpack_require__(/*! material-ui */ 59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NavBar = function NavBar() {
	  return _react2.default.createElement(_materialUi.AppBar, {
	    title: _react2.default.createElement(_materialUi.FlatButton, { label: 'Moonwalk', href: '/' }),
	    iconElementRight: _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_materialUi.FlatButton, { label: 'About', href: '/about' }),
	      _react2.default.createElement(_materialUi.FlatButton, { label: 'Contact', href: '/contact' }),
	      _react2.default.createElement(_materialUi.FlatButton, { label: 'Stream', href: '/stream' }),
	      _react2.default.createElement(_materialUi.IconButton, { iconClassName: 'muidocs-icon-custom-github', href: 'https://github.com/andrew310/cs419-frontend', tooltip: 'Frontend' })
	    )
	  });
	};
	
	var _default = NavBar;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(NavBar, 'NavBar', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/Containers/NavBar/NavBar.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/Containers/NavBar/NavBar.js');
	}();

	;

/***/ },
/* 73 */
/*!************************************!*\
  !*** ./src/Containers/App/App.css ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = {
		"mtest": "App__mtest___3WhTC",
		"rootstyle": "App__rootstyle___3wF8j",
		"pageHeader": "App__pageHeader___1DwCg",
		"headerImage": "App__headerImage____V0qb",
		"title": "App__title___1u3On",
		"footer": "App__footer___1zgQJ",
		"footerLink": "App__footerLink___3xylX"
	};

/***/ },
/* 74 */
/*!*****************************************!*\
  !*** external "react-tap-event-plugin" ***!
  \*****************************************/
/***/ function(module, exports) {

	module.exports = require("react-tap-event-plugin");

/***/ },
/* 75 */
/*!*****************************************************!*\
  !*** ./src/components/NewUserSetup/NewUserSetup.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 45);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 46);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 47);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 48);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 49);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Paper = __webpack_require__(/*! material-ui/Paper */ 57);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	var _materialUi = __webpack_require__(/*! material-ui */ 59);
	
	var _Stepper = __webpack_require__(/*! material-ui/Stepper */ 76);
	
	var _NewUserSetup = __webpack_require__(/*! ./NewUserSetup.css */ 77);
	
	var _NewUserSetup2 = _interopRequireDefault(_NewUserSetup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NewUserSetup = function (_Component) {
	  (0, _inherits3.default)(NewUserSetup, _Component);
	
	  function NewUserSetup(props) {
	    (0, _classCallCheck3.default)(this, NewUserSetup);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (NewUserSetup.__proto__ || (0, _getPrototypeOf2.default)(NewUserSetup)).call(this, props));
	
	    _this.handleNext = function () {
	      var stepIndex = _this.state.stepIndex;
	
	      _this.setState({
	        stepIndex: stepIndex + 1,
	        finished: stepIndex >= 2
	      });
	    };
	
	    _this.handlePrev = function () {
	      var stepIndex = _this.state.stepIndex;
	
	      if (stepIndex > 0) {
	        _this.setState({ stepIndex: stepIndex - 1 });
	      }
	    };
	
	    _this.state = {
	      finished: false,
	      stepIndex: 0
	    };
	    return _this;
	  }
	
	  (0, _createClass3.default)(NewUserSetup, [{
	    key: 'getStepContent',
	    value: function getStepContent(stepIndex) {
	      switch (stepIndex) {
	        case 0:
	          return "Let's get started setting up your profile! This walkthrough will get your profile set up!";
	        case 1:
	          return _react2.default.createElement(
	            'div',
	            { className: _NewUserSetup2.default.buttonContainer },
	            _react2.default.createElement(
	              'p',
	              null,
	              'Moonwalk lets you interact with all your social media accounts in one place! Choose which Social Media platforms you\'d like to link'
	            ),
	            _react2.default.createElement(_materialUi.RaisedButton, {
	              label: 'Twitter',
	              icon: _react2.default.createElement('img', { style: { "height": "16px", "width": "16px" }, src: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Twitter_bird_logo_2012.svg' })
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(_materialUi.RaisedButton, {
	              label: 'Facebook',
	              icon: _react2.default.createElement('img', { style: { "height": "16px", "width": "16px" }, src: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg' })
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(_materialUi.RaisedButton, {
	              label: 'Instagram',
	              icon: _react2.default.createElement('img', { style: { "height": "16px", "width": "16px" }, src: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' })
	            }),
	            _react2.default.createElement('br', null)
	          );
	        default:
	          return "You're all done! Click Finish to begin connecting!";
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _state = this.state;
	      var finished = _state.finished;
	      var stepIndex = _state.stepIndex;
	
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _Paper2.default,
	          { className: _NewUserSetup2.default.paperBlock },
	          _react2.default.createElement(
	            'h1',
	            { className: _NewUserSetup2.default.title },
	            'New User Setup'
	          ),
	          _react2.default.createElement(
	            _Stepper.Stepper,
	            { activeStep: stepIndex },
	            _react2.default.createElement(
	              _Stepper.Step,
	              null,
	              _react2.default.createElement(
	                _Stepper.StepLabel,
	                null,
	                'Getting Started '
	              )
	            ),
	            _react2.default.createElement(
	              _Stepper.Step,
	              null,
	              _react2.default.createElement(
	                _Stepper.StepLabel,
	                null,
	                'Link Social Media'
	              )
	            ),
	            _react2.default.createElement(
	              _Stepper.Step,
	              null,
	              _react2.default.createElement(
	                _Stepper.StepLabel,
	                null,
	                'Finish'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            null,
	            finished ? _react2.default.createElement(
	              'p',
	              null,
	              _react2.default.createElement('a', { href: '#',
	                onClick: function onClick(event) {
	                  event.preventDefault();
	                  _this2.setState({ stepIndex: 0, finished: false });
	                }
	              }),
	              'COMPLETE!'
	            ) : _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(
	                'p',
	                null,
	                this.getStepContent(stepIndex)
	              ),
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_materialUi.FlatButton, {
	                  label: 'Back',
	                  disabled: stepIndex == 0,
	                  onTouchTap: this.handlePrev
	                }),
	                _react2.default.createElement(_materialUi.RaisedButton, {
	                  label: stepIndex === 2 ? 'Finish' : 'Next',
	                  primary: true,
	                  onTouchTap: this.handleNext
	                })
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return NewUserSetup;
	}(_react.Component);
	
	var _default = NewUserSetup;
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(NewUserSetup, 'NewUserSetup', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/NewUserSetup/NewUserSetup.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/components/NewUserSetup/NewUserSetup.js');
	}();

	;

/***/ },
/* 76 */
/*!**************************************!*\
  !*** external "material-ui/Stepper" ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/Stepper");

/***/ },
/* 77 */
/*!******************************************************!*\
  !*** ./src/components/NewUserSetup/NewUserSetup.css ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = {
		"paperBlock": "NewUserSetup__paperBlock___XOiU0",
		"title": "NewUserSetup__title___26x1l",
		"icon": "NewUserSetup__icon___25SJU"
	};

/***/ },
/* 78 */
/*!***********************************!*\
  !*** ./src/server/setMuiTheme.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = setMuiTheme;
	
	var _getMuiTheme = __webpack_require__(/*! material-ui/styles/getMuiTheme */ 79);
	
	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
	
	var _Paper = __webpack_require__(/*! material-ui/Paper */ 57);
	
	var _Paper2 = _interopRequireDefault(_Paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function setMuiTheme(userAgent) {
	  return (0, _getMuiTheme2.default)({
	    /*Paper: {
	      align: 'center',
	      textAlign: 'center',
	      padding: '20px',
	      margin: '100px'
	    },*/
	
	    userAgent: userAgent
	  });
	}
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(setMuiTheme, 'setMuiTheme', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/setMuiTheme.js');
	}();

	;

/***/ },
/* 79 */
/*!*************************************************!*\
  !*** external "material-ui/styles/getMuiTheme" ***!
  \*************************************************/
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ },
/* 80 */
/*!*******************************************!*\
  !*** ./src/server/routes/feedItemsApi.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteFeedItem = exports.updateFeedItem = exports.postFeedItem = exports.getFeed = undefined;
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 36);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var IP = process.env.NODE_ENV === 'production' ? 'http://54.212.196.159:5000' : 'http://0.0.0.0:5000';
	
	var getFeed = exports.getFeed = function getFeed(req, res) {
	  (0, _isomorphicFetch2.default)('http://localhost:5000/social/feed', {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  }).then(function (pres) {
	    return pres.json();
	  }).then(function (data) {
	    var body = data.map(function (json) {
	      var rObj = {};
	      var obj = JSON.parse(json);
	      rObj['id'] = obj.id_str;
	      rObj['content'] = obj.text;
	      return rObj;
	    });
	    res.send(body);
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var postFeedItem = exports.postFeedItem = function postFeedItem(req, res) {
	  console.log(req.body);
	  (0, _isomorphicFetch2.default)('http://54.212.196.159:5000/social/feed', {
	    'method': 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.body
	  }).then(function (pres) {
	    return res.send(pres.json());
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var updateFeedItem = exports.updateFeedItem = function updateFeedItem(req, res) {
	  (0, _isomorphicFetch2.default)('http://54.212.196.159:5000/social/feed/:id', {
	    'method': 'PUT',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.body
	  }).then(function (pres) {
	    return res.send(pres.json());
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var deleteFeedItem = exports.deleteFeedItem = function deleteFeedItem(req, res) {
	  (0, _isomorphicFetch2.default)('http://54.212.196.159:5000/social/feed/:id', {
	    'method': 'DELETE',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.params.id
	  }).then(function () {
	    return res.status(200).send();
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	// Using http-proxy. Manually implementing proxy using fetch
	// was faster: 1.16 ms with fetch vs 2.34 with proxy
	/*
	 var target = proxyRules.match(req);
	 if (target) {
	 proxy.web(req, res, {target: target});
	 } else {
	 res.writeHead(500, { 'Content-Type': 'text/plain' });
	 res.status(returnStatus).end('The request url and path did not match any resources');
	 console.log('DDB Error: ' + req.err);
	 }
	 */
	
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(IP, 'IP', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/feedItemsApi.js');
	
	  __REACT_HOT_LOADER__.register(getFeed, 'getFeed', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/feedItemsApi.js');
	
	  __REACT_HOT_LOADER__.register(postFeedItem, 'postFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/feedItemsApi.js');
	
	  __REACT_HOT_LOADER__.register(updateFeedItem, 'updateFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/feedItemsApi.js');
	
	  __REACT_HOT_LOADER__.register(deleteFeedItem, 'deleteFeedItem', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/feedItemsApi.js');
	}();

	;

/***/ },
/* 81 */
/*!*****************************************!*\
  !*** ./src/server/routes/userRoutes.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUser = exports.getUsers = undefined;
	
	var _isomorphicFetch = __webpack_require__(/*! isomorphic-fetch */ 36);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getUsers = exports.getUsers = function getUsers(req, res) {
	  (0, _isomorphicFetch2.default)('http://0.0.0.0:5000/user', {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  }).then(function (pres) {
	    return res.send(pres.json());
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var getUser = exports.getUser = function getUser(req, res, username) {
	  (0, _isomorphicFetch2.default)('http://0.0.0.0:5000/user/' + username, {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  }).then(function (pres) {
	    return res.send(pres.json());
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var registerUser = exports.registerUser = function registerUser(req, res) {
	  console.log(req.body);
	  (0, _isomorphicFetch2.default)('http://0.0.0.0:5000/user', {
	    'method': 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.body
	  }).then(function (pres) {
	    return res.send(pres.json());
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var loginUser = exports.loginUser = function loginUser(req, res) {
	  (0, _isomorphicFetch2.default)('http://0.0.0.0:5000/user/login', {
	    'method': 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.body
	  }).then(function (pres) {
	    return res.send(pres.json());
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var updateUser = exports.updateUser = function updateUser(req, res, username) {
	  (0, _isomorphicFetch2.default)('http://0.0.0.0:5000/user/' + username, {
	    'method': 'PUT',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.body
	  }).then(function (pres) {
	    console.log('success');
	    return res.send('success');
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	
	var deleteUser = exports.deleteUser = function deleteUser(req, res, username) {
	  (0, _isomorphicFetch2.default)('http://0.0.0.0:5000/user/' + username, {
	    'method': 'DELETE',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: req.params.id
	  }).then(function () {
	    return res.status(200).send();
	  }).catch(function (err) {
	    console.log(err);
	    res.end(err);
	  });
	};
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(getUsers, 'getUsers', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/userRoutes.js');
	
	  __REACT_HOT_LOADER__.register(getUser, 'getUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/userRoutes.js');
	
	  __REACT_HOT_LOADER__.register(registerUser, 'registerUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/userRoutes.js');
	
	  __REACT_HOT_LOADER__.register(loginUser, 'loginUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/userRoutes.js');
	
	  __REACT_HOT_LOADER__.register(updateUser, 'updateUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/userRoutes.js');
	
	  __REACT_HOT_LOADER__.register(deleteUser, 'deleteUser', 'C:/Users/Alex/Documents/OSU/7. Fall 2016/CS 419 Software Project/cs419-frontend/src/server/routes/userRoutes.js');
	}();

	;

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map