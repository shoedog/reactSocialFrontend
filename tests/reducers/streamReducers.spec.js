import test from 'tape';
import * as reducers from '../../src/reducers/streamReducers';
import * as actions from '../../src/actions/streamActions';
import { getMockState, getActionPayload } from '../utils/testMockStateUtils';

// byId reducer
test('reducer | byId :: Handle "fetchFeedItemsSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoFeedItems();
  const fetchedFeedItems = getActionPayload.fetchFeedItemsSuccess();
  const actualNextState = reducers.byId(
    state.byId,
    actions.fetchFeedItemsSuccess(fetchedFeedItems)
  );

  const feedItemId = fetchedFeedItems.feedItemsIds[0];
  const expectedNextState = {
    [feedItemId]: fetchedFeedItems.feedItems[feedItemId],
  };

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | byId :: Handle "addFeedItemSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoFeedItems();
  const newFeedItem = getActionPayload.addFeedItemSuccess();
  const actualNextState = reducers.byId(
    state.byId,
    actions.addFeedItemSuccess(newFeedItem)
  );

  const expectedNextState = {
    [newFeedItem.id]: newFeedItem,
  };

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | byId :: Handle "updateFeedItemServerSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneFeedItem();
  const updatedFeedItem = getActionPayload.updateFeedItemServerSuccess();
  const actualNextState = reducers.byId(
    state.byId,
    actions.updateFeedItemServerSuccess(updatedFeedItem)
  );

  const expectedNextState = {
    [updatedFeedItem.id]: updatedFeedItem,
  };

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | byId :: Handle "removeFeedItemSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneFeedItem();
  const actualNextState = reducers.byId(
    state.byId,
    actions.removeFeedItemSuccess({ id: 'id-123' })
  );

  const expectedNextState = {};

  deepEqual(actualNextState, expectedNextState);
  end();
});

// ids reducer

test('reducer | ids :: Handle "fetchFeedItemsSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoFeedItems();
  const actualNextState = reducers.ids(
    state.ids,
    actions.fetchFeedItemsSuccess(getActionPayload.fetchFeedItemsSuccess())
  );

  const expectedNextState = [ 'id-123' ];

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | ids :: Handle "addFeedItemSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoFeedItems();
  const newFeedItem = getActionPayload.addFeedItemSuccess();
  const actualNextState = reducers.ids(
    state.ids,
    actions.addFeedItemSuccess(getActionPayload.addFeedItemSuccess())
  );

  const expectedNextState = [ 'id-123' ];

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | ids :: Handle "removeFeedItemSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneFeedItem();
  const actualNextState = reducers.ids(
    state.ids,
    actions.removeFeedItemSuccess({ id: 'id-123' })
  );

  const expectedNextState = [];

  deepEqual(actualNextState, expectedNextState);
  end();
});

// openNoteId reducer

test('reducer | openFeedItemId :: Handle "addFeedItemSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoOpenFeedItems();
  const actualNextState = reducers.openFeedItemId(
    state.openFeedItemId,
    actions.addFeedItemSuccess(getActionPayload.addFeedItemSuccess())
  );

  const expectedNextState = 'id-123';

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | openFeedItemId :: Handle "removeFeedItemSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneFeedItem();
  const actualNextState = reducers.openFeedItemId(
    state.openFeedItemId,
    actions.removeFeedItemSuccess({ id: 'id-123' })
  );

  const expectedNextState = null;

  deepEqual(actualNextState, expectedNextState);
  end();
});