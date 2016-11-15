import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../../src/actions/streamActions';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// Helper function for tests on return value of action
const assertReturnsFunction = ({ equal, end }, func) => {
  const result = func();
  equal(typeof result, 'function');
  end();
};

// Helper function for tests on dispatched action
const assertFirstDispatchedAction = ({ func, type, deepEqual, end }) => {
  const store = mockStore({});
  store.dispatch(func());
  const dispatchedActions = store.getActions();
  const actualAction = dispatchedActions[0];
  const expectedAction = {
    type,
    meta: {
      done: false,
    },
  };

  deepEqual(actualAction, expectedAction);
  end();
};

// Helper function for tests on dispatched action ( AKA: startAction )
const assertLastDispatchedAction = ({ deepEqual, end, func, expectedAction }) => {
  const store = mockStore({});
  store.dispatch(func())
    .then(() => {
      const dispatchedActions = store.getActions();
      const actualAction = dispatchedActions[dispatchedActions.length - 1];
      deepEqual(actualAction, expectedAction);
      end();
    });
};

// Helper function for tests on assertions for failure action
const createErrorAction = (type) => ({
  type,
  payload: {},
  error: true,
  meta: { done: true },
});

// Helper function for tests on assertions for success action
const createSuccessAction = (type, payload) => ({
  type,
  payload,
  meta: { done: true },
});

/**
 * Helper function for test skeleton
 * It receives a tape object as test and config as options
 * Each tests sets up a mock value, path, and method for fetch
 * Each test sets up a return success value
 * Each test ensures that the function is returned, and correct functions are dispatched
 */

const testAsyncAction = ({ test}, options) => {
  const {
    path,
    method,
    successMockReturn,
    successPayload,
    failureMockReturn,
    func,
    type,
  } = options;

  test('Setup', ({ end }) => {
    fetchMock.mock(path, successMockReturn, {method});
    end();
  });

  test('Returns a function', (test) => {
    assertReturnsFunction(test, func);
  });

  test('Dispatches an initial action', (test) => {
    assertFirstDispatchedAction({...test, func, type});
  });

  test('Dispatches correct action on success', (test) => {
    const expectedAction = createSuccessAction(type, successPayload);
    assertLastDispatchedAction({ ...test, func, expectedAction});
  });

  test('Dispatches correct action on failure', (test) => {
    fetchMock.restore().mock(path, failureMockReturn, {method});
    const expectedAction = createErrorAction(type);
    assertLastDispatchedAction({ ...test, func, expectedAction });
  });

  test('Tear down', ({end}) => {
    fetchMock.restore();
    end();
  });
};

test('action creator | fetchFeedItems ::', (t1) => {
  const FEED_ITEM = {
    id: 'id-123',
    content: 'test content'
  };

  const func = () => actions.fetchFeedItems();
  const type = 'fetchFeedItems';
  const successPayload = { feedItemIds: [ FEED_ITEM.id ], feedItems: { [FEED_ITEM.id]: FEED_ITEM } };
  const path = '/feedItems';
  const method = 'GET';
  const successMockReturn = [ FEED_ITEM ];
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | addFeedItem ::', (t1) => {
  const successPayload = {
    id: 123,
    content: 'test content'
  };

  const func = () => actions.addFeedItem(
    'test content'
  );
  const type = 'addFeedItem';
  const path = '/feedItems';
  const method = 'POST';
  const successMockReturn = (url, { body }) => ({
    id: 123,
    content: 'test content',
  });
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | updateFeedItemServer ::', (t1) => {
  const successPayload = {
    id: 123,
    content: 'test content'
  };

  const func = () => actions.updateFeedItemServer(
    123,
    'test content'
  );
  const type = 'updateFeedItemServer';
  const path = '/feedItems/123';
  const method = 'PUT';
  const successMockReturn = (url, { body }) => ({
    id: 123,
    content: JSON.parse(body).content,
  });
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | removeFeedItem ::', (t1) => {
  const func = () => actions.removeFeedItem(123);
  const type = 'removeFeedItem';
  const successPayload = {id: 123};
  const path = '/feedItems/123';
  const method = 'DELETE';
  const successMockReturn = { status: 200, body: '' };
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});