/* Configure Mocha test runner, see package.json/scripts/test */
'use strict';

import jsdom from 'jsdom';
import { expect } from 'chai';
import sinon from 'sinon';

//so they are available globally to tests so we don't
// have to import expect and sinon for every test
global.expect = expect;
global.sinon = sinon;

var exposedProperties = ['window', 'navigator', 'document'];

process.env.NODE_ENV = 'test';

global.document = jsdom.jsdom('<html><body></body></html>');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

//global.navigator = window.navigator;
global.navigator = {
  userAgent: 'node.js'
};

//documentRef = document;


function noop() {
  return null;
}

//prevent tests from breaking when trying to get these files
require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;