import React from 'react';
import Root from './containers/main';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';

const routes = {
  path: '/',
  component: Root,
  indexRoute: { components: Home},
  childRoutes: [
      {path: 'login', component: LoginForm},
      {path: 'signup', component: SignupForm}
  ]
}

export { routes };
