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

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _server2 = _interopRequireDefault(_server);

	var _reactRouter = __webpack_require__(6);

	var _redux = __webpack_require__(7);

	var _reactRedux = __webpack_require__(8);

	var _fs = __webpack_require__(9);

	var _fs2 = _interopRequireDefault(_fs);

	var _rootReducer = __webpack_require__(10);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	var _routes = __webpack_require__(22);

	var _routes2 = _interopRequireDefault(_routes);

	var _promiseMiddleware = __webpack_require__(45);

	var _promiseMiddleware2 = _interopRequireDefault(_promiseMiddleware);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import fetchComponentData from './lib/fetchComponentData';
	// import renderHTML from './renderHTML';

	// API server
	// const API_PORT = process.env.API_PORT || 3001;
	// const API_HOST = process.env.API_HOST || '0.0.0.0';
	// const targetUrl = `http://${API_HOST}:${API_PORT}`;

	// import compression from 'compression';

	// import axoios from 'axios';
	// import serialize from 'serialize-javascript';
	// import path from 'path';
	var app = (0, _express2.default)();
	app.use(_express2.default.static('public/static/dist'));

	// const history = createMemoryHistory();

	app.use(function (req, res) {
	  // See react-router docs: match() for documentation
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
	    if (error) {
	      return res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (!renderProps) {
	      return res.status(404).end('Not found.');
	    } else {
	      /* const reducer = rootReducer;
	       // Async middleware applied same as in client except without initialState
	      const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);
	       const componentHTML = ReactDOM.renderToString(
	        <Provider store={store}>
	          <RouterContext {...renderProps} />
	        </Provider>
	      );
	       const initialState = store.getState();
	       res.send(renderHTML(componentHTML, initialState));*/
	      handleRender(res, renderProps);
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

	function handleRender(res, renderProps) {
	  // Async middleware applied same as in client except without initialState
	  var store = (0, _redux.applyMiddleware)(_promiseMiddleware2.default)(_redux.createStore)(_rootReducer2.default);

	  var html = _server2.default.renderToString(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_reactRouter.RouterContext, renderProps)
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

	module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(7);

	var _reduxForm = __webpack_require__(11);

	var _LaunchPageReducer = __webpack_require__(12);

	var _LaunchPageReducer2 = _interopRequireDefault(_LaunchPageReducer);

	var _RouterReducer = __webpack_require__(14);

	var _RouterReducer2 = _interopRequireDefault(_RouterReducer);

	var _AuthReducer = __webpack_require__(16);

	var _AuthReducer2 = _interopRequireDefault(_AuthReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var reducers = {
	  launchPage: _LaunchPageReducer2.default,
	  router: _RouterReducer2.default,
	  auth: _AuthReducer2.default,
	  form: _reduxForm.reducer
	}; /*
	    So that Redux can pick up multiple reducers in the future,
	    you’ll want also to have a reducers/index.js:
	   
	    Since we only have one reducer in this app, this isn’t that useful,
	    but it’s a nice structure to have.
	    */


	var rootReducer = (0, _redux.combineReducers)(reducers);

	exports.default = rootReducer;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("redux-form");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = LaunchPageReducer;

	var _immutable = __webpack_require__(13);

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

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _router = __webpack_require__(15);

	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var action = arguments[1];

	  switch (action.type) {
	    case _router.ROUTER_STATE_CHANGE:
	      return action.state;

	    default:
	      return state;
	  }
	};

/***/ },
/* 15 */
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _auth = __webpack_require__(18);

	var _router = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialState = {
	  error: null, // last occured error
	  token: null,
	  profile: null
	};

	exports.default = function () {
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

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logout = exports.fetchProfileError = exports.fetchProfileSuccess = exports.loginFailure = exports.loginSuccess = exports.loginRequest = exports.registerFailure = exports.registerSuccess = exports.registerRequest = exports.FETCH_PROFILE_ERROR = exports.FETCH_PROFILE_SUCCESS = exports.LOGOUT = exports.SAVE_AUTH_TOKEN = exports.LOGIN_FAILURE = exports.LOGIN_SUCCESS = exports.LOGIN_REQUEST = exports.REGISTER_FAILURE = exports.REGISTER_SUCCESS = exports.REGISTER_REQUEST = undefined;
	exports.requestUserRegister = requestUserRegister;
	exports.login = login;
	exports.fetchProfile = fetchProfile;

	var _axios = __webpack_require__(19);

	var _axios2 = _interopRequireDefault(_axios);

	var _querystring = __webpack_require__(20);

	var _querystring2 = _interopRequireDefault(_querystring);

	var _stringifyLocation = __webpack_require__(21);

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

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = stringifyLocation;

	var _reactRouter = __webpack_require__(6);

	function stringifyLocation(location) {
	  var query = (0, _reactRouter.stringifyQuery)(location.query);

	  return '' + location.pathname + (query && '?' + query);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _Home = __webpack_require__(23);

	var _Home2 = _interopRequireDefault(_Home);

	var _about = __webpack_require__(37);

	var _about2 = _interopRequireDefault(_about);

	var _Page = __webpack_require__(39);

	var _Page2 = _interopRequireDefault(_Page);

	var _App = __webpack_require__(41);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createElement(
		_reactRouter.Route,
		{ name: 'app', path: '/', component: _App2.default },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'login', path: 'login', component: _Home2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: 'about', path: 'about', component: _about2.default }),
		_react2.default.createElement(_reactRouter.Route, { name: '404', path: '*', component: _Page2.default })
	);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(24);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(25);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(26);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(27);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(28);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _stringify = __webpack_require__(2);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _promise = __webpack_require__(29);

	var _promise2 = _interopRequireDefault(_promise);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(30);

	var _HomeForms = __webpack_require__(31);

	var _HomeForms2 = _interopRequireDefault(_HomeForms);

	var _redux = __webpack_require__(7);

	var _LaunchPageActions = __webpack_require__(33);

	var LaunchPageActions = _interopRequireWildcard(_LaunchPageActions);

	var _reactRedux = __webpack_require__(8);

	var _RegisterForm = __webpack_require__(34);

	var _RegisterForm2 = _interopRequireDefault(_RegisterForm);

	var _Home = __webpack_require__(36);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var showResults = function showResults(values) {
	  return new _promise2.default(function (resolve) {
	    setTimeout(function () {
	      // simulate server latency
	      window.alert('You submitted:\n\n' + (0, _stringify2.default)(values, null, 2));
	      resolve();
	    }, 500);
	  });
	};
	//require("!style!css!./Home.css");

	var Home = function (_Component) {
	  (0, _inherits3.default)(Home, _Component);

	  function Home(props) {
	    (0, _classCallCheck3.default)(this, Home);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

	    _this.state = { toggle: true };
	    return _this;
	  }

	  (0, _createClass3.default)(Home, [{
	    key: 'handleToggle',
	    value: function handleToggle() {
	      this.setState({ toggle: !this.state.toggle });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement(
	        'div',
	        { className: _Home2.default.Home },
	        _react2.default.createElement(
	          'div',
	          { className: _Home2.default.loginOptions },
	          _react2.default.createElement(
	            'button',
	            { className: _Home2.default.signInBox, onClick: !this.state.toggle ? function () {
	                return _this2.handleToggle();
	              } : function () {}, selected: this.state.toggle },
	            'Log In'
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: _Home2.default.signUpBox, onClick: this.state.toggle ? function () {
	                return _this2.handleToggle();
	              } : function () {}, selected: this.state.toggle },
	            'Register'
	          )
	        ),
	        this.state.toggle ? _react2.default.createElement(_HomeForms2.default, { onSubmit: showResults }) : _react2.default.createElement(_RegisterForm2.default, { className: _Home2.default.registerForm, onSubmit: showResults })
	      );
	    }
	  }]);
	  return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fields = undefined;

	var _defineProperty2 = __webpack_require__(32);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(11);

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

	exports.default = (0, _reduxForm.reduxForm)({
	  form: 'loginForm', // a unique name for this form
	  loginValidate: loginValidate,
	  fields: fields
	})(LoginForm);

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.userLogin = userLogin;

	var _axios = __webpack_require__(19);

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

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(32);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(29);

	var _promise2 = _interopRequireDefault(_promise);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reduxForm = __webpack_require__(11);

	var _axios = __webpack_require__(19);

	var _axios2 = _interopRequireDefault(_axios);

	var _qs = __webpack_require__(35);

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

	exports.default = (0, _reduxForm.reduxForm)({
	  form: 'registerForm', // a unique name for this form
	  registerValidate: registerValidate
	})(RegisterForm);

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("qs");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {
		"Home": "Home__Home___1exmz",
		"loginOptions": "Home__loginOptions___33jyt",
		"signInBox": "Home__signInBox___13Iej",
		"signUpBox": "Home__signUpBox___3nrs-",
		"registerForm": "Home__registerForm___2JhfZ"
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(24);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(25);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(26);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(27);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(28);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(7);

	var _reactRedux = __webpack_require__(8);

	var _about = __webpack_require__(38);

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


	exports.default = About;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {
		"about": "about__about___2SZ67",
		"title": "about__title___2zi04",
		"context": "about__context___1kIoE"
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getPrototypeOf = __webpack_require__(24);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(25);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(26);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(27);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(28);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(7);

	var _reactRedux = __webpack_require__(8);

	var _Page = __webpack_require__(40);

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


	exports.default = Page404;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = {
		"page404": "Page404__page404___3zE9M"
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _NavBar = __webpack_require__(42);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	var _App = __webpack_require__(44);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    { className: _App2.default.rootstyle },
	    _react2.default.createElement(
	      'h1',
	      { className: _App2.default.title },
	      'Moonwalk'
	    ),
	    _react2.default.createElement(_NavBar2.default, { className: _App2.default.navbar }),
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

	/*const styles = StyleSheet.create({
	  root: {
	    maxWidth: "100%",
	    backgroundColor: "#c0c0c0",
	    color: '#000',
	    margin: '0',
	    padding: '0'
	  },
	  title: {
	    color: '#000',
	    backgroundColor: "#d8d8d8",
	    textAlign: "center",
	    maxWidth: "100%",
	    fontWeight: 'bold',
	    fontSize: 56
	  },
	  footer: {
	    margin: '4rem auto',
	    textAlign: 'center',
	    color: '#b7b7b7'
	  },
	  footerLink: {
	    display: 'inline-block',
	    color: '#000',
	    textDecoration: 'none'
	  },
	  nav: {
	    width: '100%',
	    align: 'center'
	  }
	});*/

	//require('!style!css!./App.css');
	exports.default = App;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _reactRedux = __webpack_require__(8);

	var _NavBar = __webpack_require__(43);

	var _NavBar2 = _interopRequireDefault(_NavBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Nav = function Nav() {
	  return _react2.default.createElement(
	    'div',
	    { className: _NavBar2.default.navbar },
	    _react2.default.createElement(
	      _reactRouter.IndexLink,
	      { to: '/', className: _NavBar2.default.link, activeClassName: 'link activeLink' },
	      'Home'
	    ),
	    _react2.default.createElement(
	      _reactRouter.IndexLink,
	      { to: '/about', className: _NavBar2.default.link, activeClassName: 'link activeLink' },
	      'About'
	    ),
	    _react2.default.createElement(
	      _reactRouter.IndexLink,
	      { to: '/contact', className: _NavBar2.default.link, activeClassName: 'link activeLink' },
	      'Contact'
	    ),
	    _react2.default.createElement(
	      'a',
	      { href: 'https://github.com/jaredpalmer/react-production-starter', className: _NavBar2.default.link, target: '_blank' },
	      'GitHub Inspiration'
	    )
	  );
	};

	/*const styles = StyleSheet.create({
	  link: {
	    maxWidth: '25%',
	    color: '#FFFFFF',
	    margin: "0 10px 0 10px",
	    padding: "20px",
	    display: 'inline-block',
	    textDecoration: 'none',
	    fontWeight: 'bold',
	    border: "solid black round",
	    transition: '.2s opacity ease',
	    ':hover': {
	      opacity: 0.4
	    }
	  },
	  activeLink: {
	    backgroundColor: '#FFFFFF',
	    color: '#585555'
	  },
	  navbar: {
	    backgroundColor: '#585555',
	    paddingLeft: "20px"
	  }
	});*/

	//import '!style!css!./NavBar.css';
	exports.default = Nav;

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {
		"link": "NavBar__link___j8SB_",
		"activeLink": "NavBar__activeLink___2N4zb",
		"navbar": "NavBar__navbar___2VuQh"
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = {
		"mtest": "App__mtest___9w9M8",
		"rootstyle": "App__rootstyle____HH7o",
		"title": "App__title___IuW1T",
		"footer": "App__footer___IqPZA",
		"footerLink": "App__footerLink___2M90K",
		"img": "App__img___x1Vqa"
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(17);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(46);

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

	exports.default = promiseMiddleware;

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ }
/******/ ]);