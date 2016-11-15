import test from 'tape';
import fetchMock from 'fetch-mock';

import api from '../../src/utils/api';
import { testErrorRejection } from './testUtils';

test('api | feedItems.fetch ::', (t1) => {
  const ITEM_ONE = {
    id: 123,
    content: 'test content 1',
    rank: '1',
  };
  const ITEM_TWO = {
    id: 456,
    content: 'test content 2',
    rank: '2',
  };

  const DUMMY_CREATE_RESPONSE = [ ITEM_ONE, ITEM_TWO ];

  t1.test('Returns feed items and item ids', ({ deepEqual, end }) => {
    fetchMock.mock('/feedItems', DUMMY_CREATE_RESPONSE);
    api.feedItems
      .fetch()
      .then(({ feedItems, feedItemIds }) => {
        const  expectedFeedItems = {
          [ITEM_ONE.id]: ITEM_ONE,
          [ITEM_TWO.id]: ITEM_TWO,
        };
        const expectedFeedItemIds = [ 123, 456 ];

        deepEqual(feedItemIds, expectedFeedItemIds);
        deepEqual(feedItems, expectedFeedItems);

        end();
      });
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/feedItems',
      equal,
      func: () => api.feedItems.fetch(),
    })
      .then(() => end());
  });

  t1.test('Tear down', ({ end }) => {
    fetchMock.restore();
    end();
  });
});


test('api | feedItems.add ::', (t1) => {
  const FEED_ITEM = {
    id: 123,
    content: 'test content 1',
  };

  t1.test('Returns a new song from the api', ({ deepEqual, end }) => {
    fetchMock.post('/feedItems', (url, options) => {
      const { content } = JSON.parse(options.body);
      console.log({content});
      return {
        ...FEED_ITEM,
        content,
      };
    });

    api.feedItems
      .add('test content 1')
      .then((feedItem) => {
        console.log(feedItem);
        const expectedFeedItem = {
          ...FEED_ITEM,
          content: 'test content 1',
        };
        deepEqual(feedItem, expectedFeedItem);
        end();
      });
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/feedItems',
      equal,
      method: 'POST',
      func: () => api.feedItems.add('test'),
    })
      .then(() => end());
  });

  t1.test('Tear down', ({ end }) => {
    fetchMock.restore();
    end();
  });
});

test('api | feedItems.update ::', (t1) => {
  const FEED_ITEM = {
    id: 123,
    content: 'test content 1',
  };

  t1.test('Returns an updated feed item from the api', ({deepEqual, end}) => {
    fetchMock.put('/feedItems/123', (url, options) => {
      const { content} = JSON.parse(options.body);
      return {
        ...FEED_ITEM,
        content,
      };
    });

    api.feedItems
      .update(123, 'test content update')
      .then((feedItem) => {
        const expectedFeedItem = {
          ...FEED_ITEM,
          content: 'test content update',
        };
        deepEqual(feedItem, expectedFeedItem);
        end()
      });
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/feedItems/123',
      equal,
      method: 'PUT',
      func: () => api.feedItems.update(123, 'test'),
    })
      .then(() => end());
  });

  t1.test('Tear down', ({ end }) => {
    fetchMock.restore();
    end();
  });

});

test( 'api | feedItems.delete ::', (t1) => {
  t1.test('Removes an item from the api', ({ equal, end }) => {
    fetchMock.delete('/feedItems/123', 200  );

    api.feedItems
      .delete(123)
      .then((res => {
        equal(res, '');
        end();
      }));
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/feedItems/123',
      equal,
      method: 'DELETE',
      func: () => api.feedItems.delete(123),
    })
      .then(() => end());
  });

  t1.test('Tear down', ({ end }) => {
    fetchMock.restore();
    end();
  });
});
