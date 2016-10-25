export const getMockState = {
  withNoFeedItems: () => ({
    byId: {},
    ids: [],
    openFeedItemId: null,
  }),
  withOneFeedItem: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        content: 'test content',
      },
    },
    ids: [ 'id-123' ],
    openFeedItemId: 'id-123',
  }),
  withTwoFeedItems: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        content: 'test content',
      },
      'id-456': {
        id: 'id-456',
        content: 'test content deuce',
      },
    },
    ids: [ 'id-123', 'id-456' ],
    openFeedItemId: 'id-456',
  }),
  withNoOpenFeedItems: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        content: 'test content',
      },
    },
    ids: [ 'id-123'],
    openFeedItemId: null,
  }),
};

export const getActionPayload = {
  fetchFeedItemsSuccess: () => ({
    feedItems: {
      'id-123': {
        id: 'id-123',
        content: 'test content',
      },
    },
    feedItemsIds: [ 'id-123' ],
  }),

  addFeedItemSuccess: () => ({
    content: 'test content',
    id: 'id-123',
  }),

  updateFeedItemServerSuccess: () => ({
    id: 'id-123',
    content: 'test content'
  }),
};