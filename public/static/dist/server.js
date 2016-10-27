module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(2);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _httpProxy = __webpack_require__(4);

	var _httpProxy2 = _interopRequireDefault(_httpProxy);

	var _httpProxyRules = __webpack_require__(5);

	var _httpProxyRules2 = _interopRequireDefault(_httpProxyRules);

	var _http = __webpack_require__(6);

	var _http2 = _interopRequireDefault(_http);

	var _fs = __webpack_require__(7);

	var _fs2 = _interopRequireDefault(_fs);

	var _getMuiTheme = __webpack_require__(8);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _MuiThemeProvider = __webpack_require__(9);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _lightBaseTheme = __webpack_require__(10);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _path = __webpack_require__(11);

	var _path2 = _interopRequireDefault(_path);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(13);

	var _server2 = _interopRequireDefault(_server);

	var _reactRouter = __webpack_require__(14);

	var _redux = __webpack_require__(15);

	var _reactRedux = __webpack_require__(16);

	var _rootReducer = __webpack_require__(17);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	var _routes = __webpack_require__(39);

	var _routes2 = _interopRequireDefault(_routes);

	var _promiseMiddleware = __webpack_require__(68);

	var _promiseMiddleware2 = _interopRequireDefault(_promiseMiddleware);

	var _configureStore = __webpack_require__(70);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var server = new _http2.default.Server(app);
	app.use(_express2.default.static('public/static/dist'));
	app.use('/static', _express2.default.static('/public/static'));

	// Transform routes to target routes for proxy service
	var proxyRules = new _httpProxyRules2.default({
	  rules: {
	    '.*/feedItems': 'http://0.0.0.0:5000/social/feed'
	  },
	  default: 'http://0.0.0.0:5000'
	});
	var proxy = _httpProxy2.default.createProxy();

	// Proxy error handling
	proxy.on('error', function (error, req, res) {
	  var json = void 0;
	  if (error.code !== 'ECONNRESET') {
	    console.error('proxy error', error);
	  }
	  if (!res.headersSent) {
	    res.writeHead(500, { 'content-type': 'application/json' });
	  }

	  json = { error: 'proxy_error', reason: error.message };
	  res.end((0, _stringify2.default)(json));
	});

	// Api Proxy Requests
	app.route('/feedItems').get(function (req, res) {
	  var target = proxyRules.match(req);
	  if (target) {
	    proxy.web(req, res, { target: target });
	  } else {
	    res.writeHead(500, { 'Content-Type': 'text/plain' });
	    res.status(returnStatus).end('The request url and path did not match any resources');
	    console.log('DDB Error: ' + req.err);
	  }
	});

	app.get(['/', '/login', '/about', '/stream', '/404'], function (req, res) {
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
	});

	var PORT = process.env.PORT || 3000;

	app.listen(PORT, function (err) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  console.log('Server listening on: ' + PORT);
	});

	function handleRender(req, res, renderProps) {
	  global.navigator = {
	    userAgent: req.headers['user-agent']
	  };
	  console.log('>>>>>>>> navigator.userAgent');
	  console.log(navigator.userAgent);
	  var muiTheme = (0, _getMuiTheme2.default)({ userAgent: req.headers['user-agent'] });
	  // Async middleware applied same as in client except without initialState
	  //const store = applyMiddleware(promiseMiddleware)(createStore)(rootReducer);
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
	    res.send(document);
	  });
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(app, 'app', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/renderingServer.js');

	  __REACT_HOT_LOADER__.register(server, 'server', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/renderingServer.js');

	  __REACT_HOT_LOADER__.register(proxyRules, 'proxyRules', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/renderingServer.js');

	  __REACT_HOT_LOADER__.register(proxy, 'proxy', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/renderingServer.js');

	  __REACT_HOT_LOADER__.register(PORT, 'PORT', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/renderingServer.js');

	  __REACT_HOT_LOADER__.register(handleRender, 'handleRender', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/renderingServer.js');
	}();

	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("http-proxy-rules");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/getMuiTheme");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("material-ui/styles/baseThemes/lightBaseTheme");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(15);

	var _reduxForm = __webpack_require__(18);

	var _LaunchPageReducer = __webpack_require__(19);

	var _LaunchPageReducer2 = _interopRequireDefault(_LaunchPageReducer);

	var _RouterReducer = __webpack_require__(21);

	var _RouterReducer2 = _interopRequireDefault(_RouterReducer);

	var _AuthReducer = __webpack_require__(23);

	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

	var _asyncReducers = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var reducers = {
	  launchPage: _LaunchPageReducer2.default,
	  router: _RouterReducer2.default,
	  auth: _AuthReducer2.default,
	  byId: _asyncReducers.byId,
	  ids: _asyncReducers.ids,
	  openFeedItemId: _asyncReducers.openFeedItemId,
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

	  __REACT_HOT_LOADER__.register(reducers, 'reducers', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/rootReducer.js');

	  __REACT_HOT_LOADER__.register(rootReducer, 'rootReducer', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/rootReducer.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/rootReducer.js');
	}();

	;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = LaunchPageReducer;

	var _immutable = __webpack_require__(20);

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

	  __REACT_HOT_LOADER__.register(defaultState, 'defaultState', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/LaunchPageReducer.js');

	  __REACT_HOT_LOADER__.register(LaunchPageReducer, 'LaunchPageReducer', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/LaunchPageReducer.js');
	}();

	;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _router = __webpack_require__(22);

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

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/RouterReducer.js');
	}();

	;

/***/ },
/* 22 */
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

	  __REACT_HOT_LOADER__.register(ROUTER_STATE_CHANGE, 'ROUTER_STATE_CHANGE', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/router.js');

	  __REACT_HOT_LOADER__.register(routerStateChange, 'routerStateChange', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/router.js');
	}();

	;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(24);

	var _extends3 = _interopRequireDefault(_extends2);

	var _auth = __webpack_require__(25);

	var _router = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
	  error: null, // last occured error
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

	  __REACT_HOT_LOADER__.register(initialState, 'initialState', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/AuthReducer.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/AuthReducer.js');
	}();

	;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logout = exports.fetchProfileError = exports.fetchProfileSuccess = exports.loginFailure = exports.loginSuccess = exports.loginRequest = exports.registerFailure = exports.registerSuccess = exports.registerRequest = exports.FETCH_PROFILE_ERROR = exports.FETCH_PROFILE_SUCCESS = exports.LOGOUT = exports.SAVE_AUTH_TOKEN = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = exports.REGISTER_FAILURE = exports.REGISTER_SUCCESS = exports.REGISTER_REQUEST = undefined;
	exports.requestUserRegister = requestUserRegister;
	exports.login = login;
	exports.fetchProfile = fetchProfile;

	var _axios = __webpack_require__(26);

	var _axios2 = _interopRequireDefault(_axios);

	var _querystring = __webpack_require__(27);

	var _querystring2 = _interopRequireDefault(_querystring);

	var _stringifyLocation = __webpack_require__(28);

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

	  __REACT_HOT_LOADER__.register(REGISTER_REQUEST, 'REGISTER_REQUEST', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(REGISTER_SUCCESS, 'REGISTER_SUCCESS', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(REGISTER_FAILURE, 'REGISTER_FAILURE', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(LOGIN_REQUEST, 'LOGIN_REQUEST', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(LOGIN_SUCCESS, 'LOGIN_SUCCESS', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(LOGIN_FAILURE, 'LOGIN_FAILURE', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(SAVE_AUTH_TOKEN, 'SAVE_AUTH_TOKEN', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(LOGOUT, 'LOGOUT', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(FETCH_PROFILE_SUCCESS, 'FETCH_PROFILE_SUCCESS', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(FETCH_PROFILE_ERROR, 'FETCH_PROFILE_ERROR', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(registerRequest, 'registerRequest', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(registerSuccess, 'registerSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(registerFailure, 'registerFailure', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(loginRequest, 'loginRequest', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(loginSuccess, 'loginSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(loginFailure, 'loginFailure', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(fetchProfileSuccess, 'fetchProfileSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(fetchProfileError, 'fetchProfileError', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(logout, 'logout', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(saveAuthToken, 'saveAuthToken', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(requestUserRegister, 'requestUserRegister', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(login, 'login', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');

	  __REACT_HOT_LOADER__.register(fetchProfile, 'fetchProfile', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/auth.js');
	}();

	;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stringifyLocation;

	var _reactRouter = __webpack_require__(14);

	function stringifyLocation(location) {
	  var query = (0, _reactRouter.stringifyQuery)(location.query);

	  return '' + location.pathname + (query && '?' + query);
	}
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(stringifyLocation, 'stringifyLocation', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/lib/stringifyLocation.js');
	}();

	;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.openFeedItemId = exports.ids = exports.byId = undefined;

	var _defineProperty2 = __webpack_require__(30);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _ramda = __webpack_require__(31);

	var _asyncActions = __webpack_require__(32);

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
	    case _asyncActions.UPDATE_FEED_ITEM:
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
	    case _asyncActions.OPEN_FEED_ITEM:
	      return payload.id;
	    case _asyncActions.CLOSE_FEED_ITEM:
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

	  __REACT_HOT_LOADER__.register(byId, 'byId', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/asyncReducers.js');

	  __REACT_HOT_LOADER__.register(ids, 'ids', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/asyncReducers.js');

	  __REACT_HOT_LOADER__.register(openFeedItemId, 'openFeedItemId', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/asyncReducers.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/reducers/asyncReducers.js');
	}();

	;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeFeedItem = exports.removeFeedItemFailure = exports.removeFeedItemSuccess = exports.removeFeedItemStart = exports.updateFeedItemServer = exports.updateFeedItemServerFailure = exports.updateFeedItemServerSuccess = exports.updateFeedItemServerStart = exports.addFeedItem = exports.addFeedItemFailure = exports.addFeedItemSuccess = exports.addFeedItemStart = exports.fetchFeedItems = exports.fetchFeedItemsFailure = exports.fetchFeedItemsSuccess = exports.fetchFeedItemsStart = exports.updateFeedItem = exports.closeFeedItem = exports.openFeedItem = exports.UPDATE_FEED_ITEM = exports.CLOSE_FEED_ITEM = exports.OPEN_FEED_ITEM = undefined;

	var _api = __webpack_require__(33);

	var _api2 = _interopRequireDefault(_api);

	var _asyncActionUtils = __webpack_require__(37);

	var _uuid = __webpack_require__(38);

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
	    return _api2.default.feedItems.fetch();
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

	  __REACT_HOT_LOADER__.register(OPEN_FEED_ITEM, 'OPEN_FEED_ITEM', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(CLOSE_FEED_ITEM, 'CLOSE_FEED_ITEM', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(UPDATE_FEED_ITEM, 'UPDATE_FEED_ITEM', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(openFeedItem, 'openFeedItem', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(closeFeedItem, 'closeFeedItem', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(updateFeedItem, 'updateFeedItem', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(fetchFeedItemsType, 'fetchFeedItemsType', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(fetchFeedItemsStart, 'fetchFeedItemsStart', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(fetchFeedItemsSuccess, 'fetchFeedItemsSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(fetchFeedItemsFailure, 'fetchFeedItemsFailure', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(fetchFeedItems, 'fetchFeedItems', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(addFeedItemType, 'addFeedItemType', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(addFeedItemStart, 'addFeedItemStart', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(addFeedItemSuccess, 'addFeedItemSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(addFeedItemFailure, 'addFeedItemFailure', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(addFeedItem, 'addFeedItem', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(updateFeedItemServerType, 'updateFeedItemServerType', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(updateFeedItemServerStart, 'updateFeedItemServerStart', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(updateFeedItemServerSuccess, 'updateFeedItemServerSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(updateFeedItemServerFailure, 'updateFeedItemServerFailure', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(updateFeedItemServer, 'updateFeedItemServer', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(removeFeedItemType, 'removeFeedItemType', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(removeFeedItemStart, 'removeFeedItemStart', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(removeFeedItemSuccess, 'removeFeedItemSuccess', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(removeFeedItemFailure, 'removeFeedItemFailure', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');

	  __REACT_HOT_LOADER__.register(removeFeedItem, 'removeFeedItem', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActions.js');
	}();

	;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.returnFeedItemsAndIds = exports.normalizeFeedItems = exports.fetchJson = exports.checkStatus = exports.objConvert = exports.toJson = undefined;

	var _stringify = __webpack_require__(2);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _extends2 = __webpack_require__(24);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(34);

	var _promise2 = _interopRequireDefault(_promise);

	__webpack_require__(35);

	var _normalizr = __webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Create  schema for normalizr
	var feedItems = new _normalizr.Schema('feedItems');

	// Utility to convert response stream from fetch to JSON
	var toJson = exports.toJson = function toJson(res) {
	  return res.json();
	};

	// Modify response for props
	var objConvert = exports.objConvert = function objConvert(data) {
	  return data.map(function (json) {
	    var rObj = {};
	    var obj = JSON.parse(json);
	    rObj['id'] = obj.id_str;
	    rObj['content'] = obj.text;
	    return rObj;
	  });
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
	    fetch: function fetch() {
	      return fetchJson('/feedItems').then(objConvert).then(normalizeFeedItems).then(returnFeedItemsAndIds);
	    },
	    add: function add(content) {
	      return fetchJson('/feedItems', {
	        method: 'POST',
	        body: (0, _stringify2.default)({ content: content })
	      });
	    },
	    update: function update(id, content) {
	      return fetchJson('/feedItems/' + id, {
	        method: 'PUT',
	        body: (0, _stringify2.default)({ content: content })
	      });
	    },
	    delete: function _delete(id) {
	      return fetch('/feedItems/' + id, {
	        method: 'DELETE'
	      }).then(checkStatus).then(function (res) {
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

	  __REACT_HOT_LOADER__.register(feedItems, 'feedItems', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(toJson, 'toJson', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(objConvert, 'objConvert', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(checkStatus, 'checkStatus', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(fetchJson, 'fetchJson', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(normalizeFeedItems, 'normalizeFeedItems', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(returnFeedItemsAndIds, 'returnFeedItemsAndIds', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/utils/api.js');
	}();

	;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("normalizr");

/***/ },
/* 37 */
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

	  __REACT_HOT_LOADER__.register(startAction, "startAction", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActionUtils.js");

	  __REACT_HOT_LOADER__.register(successAction, "successAction", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActionUtils.js");

	  __REACT_HOT_LOADER__.register(failureAction, "failureAction", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActionUtils.js");

	  __REACT_HOT_LOADER__.register(asyncAction, "asyncAction", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/asyncActionUtils.js");
	}();

	;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("uuid");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(14);

	var _Home = __webpack_require__(40);

	var _Home2 = _interopRequireDefault(_Home);

	var _about = __webpack_require__(53);

	var _about2 = _interopRequireDefault(_about);

	var _stream = __webpack_require__(55);

	var _stream2 = _interopRequireDefault(_stream);

	var _Page = __webpack_require__(61);

	var _Page2 = _interopRequireDefault(_Page);

	var _App = __webpack_require__(63);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _default = _react2.default.createElement(
		_reactRouter.Route,
		{ name: 'app', path: '/', component: _App2.default },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'login', path: 'login', component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'about', path: 'about', component: _about2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'stream', path: 'stream', component: _stream2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: '404', path: '*', component: _Page2.default })
	);

	exports.default = _default;
	;

	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}

		__REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/routes.js');
	}();

	;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(41);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(43);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(44);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _stringify = __webpack_require__(2);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _promise = __webpack_require__(34);

	var _promise2 = _interopRequireDefault(_promise);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(46);

	var _HomeForms = __webpack_require__(47);

	var _HomeForms2 = _interopRequireDefault(_HomeForms);

	var _redux = __webpack_require__(15);

	var _LaunchPageActions = __webpack_require__(48);

	var LaunchPageActions = _interopRequireWildcard(_LaunchPageActions);

	var _reactRedux = __webpack_require__(16);

	var _RegisterForm = __webpack_require__(49);

	var _RegisterForm2 = _interopRequireDefault(_RegisterForm);

	var _Home = __webpack_require__(51);

	var _Home2 = _interopRequireDefault(_Home);

	var _materialUi = __webpack_require__(52);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//require("!style!css!./Home.css");
	var showResults = function showResults(values) {
	  return new _promise2.default(function (resolve) {
	    setTimeout(function () {
	      // simulate server latency
	      window.alert('You submitted:\n\n' + (0, _stringify2.default)(values, null, 2));
	      resolve();
	    }, 500);
	  });
	};

	var Home = function (_Component) {
	  (0, _inherits3.default)(Home, _Component);

	  function Home(props) {
	    (0, _classCallCheck3.default)(this, Home);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

	    _this.handleToggle = function (value) {
	      _this.setState({ value: value });
	    };

	    _this.state = { value: "1" };
	    return _this;
	  }

	  (0, _createClass3.default)(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _materialUi.Tabs,
	          { value: this.state.value, onChange: this.handleToggle },
	          _react2.default.createElement(
	            _materialUi.Tab,
	            { label: 'Sign In', value: '1' },
	            _react2.default.createElement(_HomeForms2.default, { onSubmit: showResults })
	          ),
	          _react2.default.createElement(
	            _materialUi.Tab,
	            { label: 'Register', value: '2' },
	            _react2.default.createElement(_RegisterForm2.default, { className: _Home2.default.registerForm, onSubmit: showResults })
	          )
	        )
	      );
	    }
	  }]);
	  return Home;
	}(_react.Component);

	var _default = Home;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(showResults, 'showResults', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Home/Home.js');

	  __REACT_HOT_LOADER__.register(Home, 'Home', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Home/Home.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Home/Home.js');
	}();

	;

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fields = undefined;

	var _defineProperty2 = __webpack_require__(30);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends2 = __webpack_require__(24);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fields = exports.fields = ['email', 'password'];

	var submit = function submit(values, dispatch) {
	  //  return new Promise((resolve, reject) => {
	  if (values.email && values.password) {
	    /*      axios.get(`http://${config.apiHost}:${config.apiPort}/auth/${values.email}/${values.password}`)
	         .then (response => {
	           if(response.status === 200) {
	             dispatch(auth(values.email, values.password))
	             resolve()
	           }
	         })
	         .catch(response => {
	           if(response.status !== 200) {
	             reject({ username: 'Invalid username or password', _error: 'Login failed!' })
	           }
	         })*/

	  }
	  console.log(values);
	  // })
	};

	//Form Sync validation. We can add submit validation too( see redux-form docs)
	var loginValidate = function loginValidate(values) {
	  var errors = {};
	  if (!values.email) {
	    errors.email = 'Required';
	  }
	  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	    errors.email = 'Invalid email address';
	  }
	  if (!values.password) {
	    errors.password = 'Required';
	  }
	  return errors;
	};

	//Makes a Label & Input Field
	var renderField = function renderField(_ref) {
	  var input = _ref.input;
	  var value = _ref.value;
	  var label = _ref.label;
	  var type = _ref.type;
	  var onChange = _ref.onChange;
	  var _ref$meta = _ref.meta;
	  var touched = _ref$meta.touched;
	  var error = _ref$meta.error;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'label',
	      null,
	      label
	    ),
	    _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement('input', (0, _extends3.default)({}, input, { type: type, value: value, placeholder: label })),
	      touched && error && _react2.default.createElement(
	        'div',
	        null,
	        error
	      )
	    )
	  );
	};

	var LoginForm = function LoginForm(props) {
	  var _React$createElement, _React$createElement2;

	  var _props$fields = props.fields;
	  var email = _props$fields.email;
	  var password = _props$fields.password;
	  var error = props.error;
	  var handleSubmit = props.handleSubmit;
	  var pristine = props.pristine;
	  var reset = props.reset;
	  var submitting = props.submitting;


	  return _react2.default.createElement(
	    'div',
	    { id: 'login-form' },
	    _react2.default.createElement(
	      'h1',
	      { style: { "textAlign": "center" } },
	      'Welcome Back!'
	    ),
	    _react2.default.createElement(
	      'div',
	      { style: { "align": "center", "backgroundColor": "#d8d8d8", "textAlign": "center", "marginLeft": "200px", "marginRight": "200px", "border": "solid black" } },
	      _react2.default.createElement(
	        'form',
	        { onSubmit: handleSubmit },
	        error && _react2.default.createElement(
	          'div',
	          { className: 'form-error' },
	          error
	        ),
	        _react2.default.createElement(_reduxForm.Field, (_React$createElement = { name: 'email', component: 'input', type: 'email' }, (0, _defineProperty3.default)(_React$createElement, 'component', renderField), (0, _defineProperty3.default)(_React$createElement, 'label', 'Email'), (0, _defineProperty3.default)(_React$createElement, 'value', email), (0, _defineProperty3.default)(_React$createElement, 'onChange', function onChange(e) {
	          return e.target.value;
	        }), _React$createElement)),
	        _react2.default.createElement(_reduxForm.Field, (_React$createElement2 = { name: 'password', component: 'input', type: 'password' }, (0, _defineProperty3.default)(_React$createElement2, 'component', renderField), (0, _defineProperty3.default)(_React$createElement2, 'label', 'Password'), (0, _defineProperty3.default)(_React$createElement2, 'value', password), (0, _defineProperty3.default)(_React$createElement2, 'onChange', function onChange(e) {
	          return e.target.value;
	        }), _React$createElement2)),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            { type: 'submit', disabled: submitting },
	            'Submit'
	          )
	        )
	      )
	    )
	  );
	};

	var _default = (0, _reduxForm.reduxForm)({
	  form: 'loginForm', // a unique name for this form
	  loginValidate: loginValidate,
	  fields: fields
	})(LoginForm);

	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(fields, 'fields', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/HomeForms.js');

	  __REACT_HOT_LOADER__.register(submit, 'submit', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/HomeForms.js');

	  __REACT_HOT_LOADER__.register(loginValidate, 'loginValidate', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/HomeForms.js');

	  __REACT_HOT_LOADER__.register(renderField, 'renderField', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/HomeForms.js');

	  __REACT_HOT_LOADER__.register(LoginForm, 'LoginForm', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/HomeForms.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/HomeForms.js');
	}();

	;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.userLogin = userLogin;

	var _axios = __webpack_require__(26);

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

	  __REACT_HOT_LOADER__.register(userLogin, 'userLogin', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/actions/LaunchPageActions.js');
	}();

	;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(30);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends2 = __webpack_require__(24);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(34);

	var _promise2 = _interopRequireDefault(_promise);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(18);

	var _axios = __webpack_require__(26);

	var _axios2 = _interopRequireDefault(_axios);

	var _qs = __webpack_require__(50);

	var _qs2 = _interopRequireDefault(_qs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

	var submit = function submit(values, dispatch) {
	  return new _promise2.default(function (resolve, reject) {
	    if (values.email && values.password1 && values.username) {
	      _axios2.default.post('http://0.0.0.0:5000/user', _qs2.default.stringify({
	        username: values.username,
	        password: values.password1
	      }), headers).then(function (response) {
	        console.log(response);
	      }).catch(function (response) {
	        if (response.status !== 200) {
	          console.log(response);
	          reject({ username: 'Invalid username or password', _error: 'Login failed!' });
	        }
	      });
	    }console.log(values);
	  });
	};

	var registerValidate = function registerValidate(values) {
	  var errors = {};
	  if (!values.email) {
	    errors.email = 'Required';
	  }
	  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	    errors.email = 'Invalid email address';
	  }
	  if (!values.username) {
	    errors.username = 'Required';
	  }
	  if (!values.password1) {
	    errors.password = 'Required';
	  }
	  if (!values.password2) {
	    errors.password = 'Required';
	  }
	  if (values.password1 !== valuespassword2) {
	    errors.password2 = 'Passwords Must Match!';
	  }
	  return errors;
	};

	//Makes a Label & Input Field
	var renderField = function renderField(_ref) {
	  var input = _ref.input;
	  var value = _ref.value;
	  var label = _ref.label;
	  var type = _ref.type;
	  var name = _ref.name;
	  var onChange = _ref.onChange;
	  var _ref$meta = _ref.meta;
	  var dirty = _ref$meta.dirty;
	  var error = _ref$meta.error;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'label',
	      { htmlFor: name },
	      label
	    ),
	    _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement('input', (0, _extends3.default)({}, input, { type: type, placeholder: label, value: value, onChange: function onChange(e) {
	          return e.target.value;
	        } })),
	      dirty && error && _react2.default.createElement(
	        'span',
	        null,
	        error
	      )
	    )
	  );
	};

	var RegisterForm = function RegisterForm(props) {
	  var _React$createElement, _React$createElement2, _React$createElement3, _React$createElement4;

	  var handleSubmit = props.handleSubmit;
	  var pristine = props.pristine;
	  var reset = props.reset;
	  var submitting = props.submitting;


	  return _react2.default.createElement(
	    'div',
	    { className: 'registration' },
	    _react2.default.createElement(
	      'h1',
	      { style: { "textAlign": "center" } },
	      'Register New User'
	    ),
	    _react2.default.createElement(
	      'div',
	      { style: { "align": "center", "backgroundColor": "#d8d8d8", "textAlign": "center", "marginLeft": "200px", "marginRight": "200px", "border": "solid black" } },
	      _react2.default.createElement(
	        'form',
	        { onSubmit: handleSubmit(submit) },
	        _react2.default.createElement(_reduxForm.Field, (_React$createElement = { name: 'email', component: 'input', type: 'email' }, (0, _defineProperty3.default)(_React$createElement, 'component', renderField), (0, _defineProperty3.default)(_React$createElement, 'label', 'Email'), _React$createElement)),
	        _react2.default.createElement(_reduxForm.Field, (_React$createElement2 = { name: 'username', component: 'input', type: 'text' }, (0, _defineProperty3.default)(_React$createElement2, 'component', renderField), (0, _defineProperty3.default)(_React$createElement2, 'label', 'User Name'), _React$createElement2)),
	        _react2.default.createElement(_reduxForm.Field, (_React$createElement3 = { name: 'password1', component: 'input', type: 'password' }, (0, _defineProperty3.default)(_React$createElement3, 'component', renderField), (0, _defineProperty3.default)(_React$createElement3, 'label', 'Password'), _React$createElement3)),
	        _react2.default.createElement(_reduxForm.Field, (_React$createElement4 = { name: 'password2', component: 'input', type: 'password' }, (0, _defineProperty3.default)(_React$createElement4, 'component', renderField), (0, _defineProperty3.default)(_React$createElement4, 'label', 'Password'), _React$createElement4)),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            { type: 'submit', disabled: submitting },
	            'Submit'
	          )
	        )
	      )
	    )
	  );
	};

	var _default = (0, _reduxForm.reduxForm)({
	  form: 'registerForm', // a unique name for this form
	  registerValidate: registerValidate
	})(RegisterForm);

	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(headers, 'headers', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/RegisterForm.js');

	  __REACT_HOT_LOADER__.register(submit, 'submit', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/RegisterForm.js');

	  __REACT_HOT_LOADER__.register(registerValidate, 'registerValidate', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/RegisterForm.js');

	  __REACT_HOT_LOADER__.register(renderField, 'renderField', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/RegisterForm.js');

	  __REACT_HOT_LOADER__.register(RegisterForm, 'RegisterForm', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/RegisterForm.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/HomeForms/RegisterForm.js');
	}();

	;

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = require("qs");

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = {
		"Home": "Home__Home___1exmz",
		"loginOptions": "Home__loginOptions___33jyt",
		"signInBox": "Home__signInBox___13Iej",
		"signUpBox": "Home__signUpBox___3nrs-",
		"registerForm": "Home__registerForm___2JhfZ"
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("material-ui");

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(41);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(43);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(44);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(15);

	var _reactRedux = __webpack_require__(16);

	var _about = __webpack_require__(54);

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
						'h1',
						{ className: _about2.default.title },
						'About Our Project'
					),
					_react2.default.createElement(
						'div',
						{ className: _about2.default.content },
						'Moonwalk is a web based platform which integrates major social media networks. It allows users to seamlessly read, post, and share content across social media profiles. Moonwalk is capable of organizing content in a meaningful way by providing custom filter controls empowering users to curate their social media content. Our platform aggregates the user\u2019s social media feeds and displays relevant content in one unified user stream. Additionally, it allows users to post and share across social media networks with just a click. Moonwalk empowers users to manage their online presence like never before.'
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

		__REACT_HOT_LOADER__.register(About, 'About', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/About/about.js');

		__REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/About/about.js');
	}();

	;

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = {
		"about": "about__about___shtn1",
		"title": "about__title___23BOT",
		"context": "about__context___3B0bk"
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends2 = __webpack_require__(24);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(41);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(43);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(44);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(16);

	var _asyncActions = __webpack_require__(32);

	var actionCreators = _interopRequireWildcard(_asyncActions);

	var _selectors = __webpack_require__(56);

	var selectors = _interopRequireWildcard(_selectors);

	var _sidebar = __webpack_require__(57);

	var _sidebar2 = _interopRequireDefault(_sidebar);

	var _StreamItem = __webpack_require__(59);

	var _StreamItem2 = _interopRequireDefault(_StreamItem);

	var _stream = __webpack_require__(60);

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
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.props.fetchFeedItems();
				// For easy console fun
				console.log(this.props.fetchFeedItems());
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var _props = this.props;
				var feedItems = _props.feedItems;
				var openFeedItemId = _props.openFeedItemId;
				var addFeedItem = _props.addFeedItem;
				var openFeedItem = _props.openFeedItem;


				return _react2.default.createElement(
					'div',
					{ className: _stream2.default.Stream },
					_react2.default.createElement(
						'h1',
						null,
						'User Stream'
					),
					_react2.default.createElement(
						'div',
						null,
						this.state.isToggleOn ? _react2.default.createElement(_sidebar2.default, null) : ""
					),
					_react2.default.createElement(
						'a',
						{ href: '', className: _stream2.default.SideBarToggle, onClick: function onClick() {
								return _this2.handleToggle();
							} },
						this.state.isToggleOn ? 'v' : '>',
						' Username'
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
						),
						feedItems.length === 0 ? _react2.default.createElement(
							'div',
							{ className: _stream2.default.empty },
							'No Content...'
						) : feedItems.map(function (feedItem) {
							return _react2.default.createElement(
								'button',
								{ key: feedItem.id, className: feedItem.id === openFeedItemId ? (0, _extends3.default)({}, _stream2.default.feedItem, _stream2.default.selected) : _stream2.default.feedItem,
									onClick: function onClick() {
										return openFeedItem(feedItem.id);
									} },
								feedItem.content === '' ? _react2.default.createElement(
									'span',
									{ className: _stream2.default.newFeedItem },
									'Create Post'
								) : _react2.default.createElement(
									'div',
									null,
									'Content: ',
									feedItem.content,
									_react2.default.createElement('br', null),
									'...might need to map content into heading, main, img, preview, etc'
								)
							);
						}),
						_react2.default.createElement(_StreamItem2.default, null)
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

		__REACT_HOT_LOADER__.register(StreamList, 'StreamList', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/StreamList/stream.js');

		__REACT_HOT_LOADER__.register(selector, 'selector', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/StreamList/stream.js');

		__REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/StreamList/stream.js');
	}();

	;

/***/ },
/* 56 */
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

	  __REACT_HOT_LOADER__.register(getFeedItems, "getFeedItems", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/lib/selectors.js");

	  __REACT_HOT_LOADER__.register(getOpenFeedItemId, "getOpenFeedItemId", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/lib/selectors.js");

	  __REACT_HOT_LOADER__.register(getFeedItem, "getFeedItem", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/lib/selectors.js");
	}();

	;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _sidebar = __webpack_require__(58);

	var _sidebar2 = _interopRequireDefault(_sidebar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Returns the User's Avatar Image
	// function Avatar(props){
	// 	return(
	// 		<img className={style.avatar}
	// 			src={props.user.avatarUrl}
	// 			alt={props.user.name}
	// 		/>
	// 	);
	// }

	// function UserInfo(props) {
	// 	return (
	// 		<div className={style.userInfo}>
	// 			<Avatar user={props.user} />
	// 			<div className={style.userInfo-name}>
	// 				{props.user.name}
	// 			</div>
	// 		</div>
	// 	)
	// }

	// Sidebar

	var Sidebar = function Sidebar(props) {
		return _react2.default.createElement(
			'div',
			{ className: _sidebar2.default.Sidebar },
			_react2.default.createElement(
				'h2',
				null,
				'Sidebar is active!'
			),
			_react2.default.createElement(
				'ul',
				null,
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						'a',
						{ href: '' },
						'Profile'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						'a',
						{ href: '' },
						'Settings'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						'a',
						{ href: '' },
						'Filters'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						'a',
						{ href: '' },
						'Profile'
					)
				)
			)
		);
	};

	var _default = Sidebar;
	exports.default = _default;
	;

	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}

		__REACT_HOT_LOADER__.register(Sidebar, 'Sidebar', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Sidebar/sidebar.js');

		__REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Sidebar/sidebar.js');
	}();

	;

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = {
		"avatar": "sidebar__avatar___vhij6",
		"Sidebar": "sidebar__Sidebar___3ul8-",
		"userInfo": "sidebar__userInfo___3TCGY",
		"userInfo-name": "sidebar__userInfo-name___AL9kq"
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _stream = __webpack_require__(60);

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

		__REACT_HOT_LOADER__.register(StreamContent, 'StreamContent', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/StreamItem/StreamItem.js');

		__REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/StreamItem/StreamItem.js');
	}();

	;

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = {
		"Stream": "stream__Stream___1gihR",
		"SideBarToggle": "stream__SideBarToggle___1e7Tv",
		"StreamContent": "stream__StreamContent___1JP8V",
		"empty": "stream__empty___1cUZH",
		"addFeedItemButton": "stream__addFeedItemButton___2Gdbs",
		"selected": "stream__selected___2SQ78",
		"feedItem": "stream__feedItem___2SXqe",
		"newFeedItem": "stream__newFeedItem___3zxN3"
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(41);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(42);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(43);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(44);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(45);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(15);

	var _reactRedux = __webpack_require__(16);

	var _Page = __webpack_require__(62);

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

		__REACT_HOT_LOADER__.register(Page404, 'Page404', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Page404/Page404.js');

		__REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/components/Page404/Page404.js');
	}();

	;

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = {
		"page404": "Page404__page404___3zE9M"
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _NavBar = __webpack_require__(64);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	var _App = __webpack_require__(65);

	var _App2 = _interopRequireDefault(_App);

	var _MuiThemeProvider = __webpack_require__(9);

	var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

	var _lightBaseTheme = __webpack_require__(10);

	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

	var _getMuiTheme = __webpack_require__(8);

	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

	var _AppBar = __webpack_require__(66);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _reactTapEventPlugin = __webpack_require__(67);

	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//require('!style!css!./App.css');
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
	    _MuiThemeProvider2.default,
	    { muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default) },
	    _react2.default.createElement(
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

	  __REACT_HOT_LOADER__.register(App, 'App', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/Containers/App.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/Containers/App.js');
	}();

	;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(14);

	var _reactRedux = __webpack_require__(16);

	var _materialUi = __webpack_require__(52);

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

	  __REACT_HOT_LOADER__.register(NavBar, 'NavBar', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/Containers/NavBar.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/Containers/NavBar.js');
	}();

	;

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = {
		"mtest": "App__mtest___9w9M8",
		"rootstyle": "App__rootstyle____HH7o",
		"pageHeader": "App__pageHeader___bIBCs",
		"headerImage": "App__headerImage___3lUYh",
		"title": "App__title___IuW1T",
		"footer": "App__footer___IqPZA",
		"footerLink": "App__footerLink___2M90K"
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = require("material-ui/AppBar");

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("react-tap-event-plugin");

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(24);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(69);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	  Helper for asynchronous actions( dispatcher middleware to transform actions ):
	    Keeps actions simple
	    Keeps action creators synchronous
	    uses promises
	 */

	/*
	 we just define a promise key on our actions and have them automatically resolved and rejected.
	 We can also optionally listen in the reducers for auto-generated <TYPE>_REQUEST and <TYPE>_FAILURE
	 if we care about mutating state along the way.
	 */
	function promiseMiddleware() {
	  return function (next) {
	    return function (action) {
	      var promise = action.promise;
	      var type = action.type;
	      var rest = (0, _objectWithoutProperties3.default)(action, ["promise", "type"]);


	      if (!promise) return next(action);

	      var SUCCESS = type;
	      var REQUEST = type + "_REQUEST";
	      var FAILURE = type + "_FAILURE";

	      next((0, _extends3.default)({}, rest, { type: REQUEST }));

	      return promise.then(function (res) {
	        next((0, _extends3.default)({}, rest, { res: res, type: SUCCESS }));

	        return true;
	      }).catch(function (error) {
	        next((0, _extends3.default)({}, rest, { error: error, type: FAILURE }));

	        // Another benefit is being able to log all failures here
	        console.log(error);
	        return false;
	      });
	    };
	  };
	}

	var _default = promiseMiddleware;
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(promiseMiddleware, "promiseMiddleware", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/lib/promiseMiddleware.js");

	  __REACT_HOT_LOADER__.register(_default, "default", "/Users/wesleyjinks/ReactApps/cs419-frontend/src/lib/promiseMiddleware.js");
	}();

	;

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(15);

	var _reduxThunk = __webpack_require__(71);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(17);

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

	  __REACT_HOT_LOADER__.register(createStoreWithMiddleware, 'createStoreWithMiddleware', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/configureStore.js');

	  __REACT_HOT_LOADER__.register(configureStore, 'configureStore', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/configureStore.js');

	  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/wesleyjinks/ReactApps/cs419-frontend/src/configureStore.js');
	}();

	;

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ }
/******/ ]);