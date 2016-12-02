import { dissoc, without, merge, prepend } from 'ramda';
import { SENTIMENT_SUCCESS, SENTIMENT_FAILURE } from '../actions/sentiment';

/**
 *
 * @type {{searchTerms: Array, searchResults: Array, error: null}}
 */


/**
 *
 * @param state
 * @param type
 * @param payload
 * @param meta
 * @param error
 * @returns {*}
 */
export const sentimentGroup = (state = [], { type, payload, meta, error }) => {
    switch (type) {
        case SENTIMENT_SUCCESS:
            if (meta.done && !error) {
                console.log(state);
                return prepend( {name: payload.term, value: payload.result}, state)
            }
            return state;

        case SENTIMENT_FAILURE:
            if (meta.done && !error) {
                return merge(state, {
                    error: payload.error
                });
            }
            return state;

        default:
            return state;
    }
};

/* Reducer for feed items ids Array in state
export const sentimentTweets = (state = [], { type, payload, meta, error}) => {
    switch (type) {
        case SENTIMENT_SUCCESS:
            if (meta.done && !error) {
                return prepend(payload.result.tweets, state)
            }
            return state;

        case SENTIMENT_FAILURE:
            if (meta.done && !error) {
                return merge(state, {
                    error: payload.error
                });
            }
            return state;

        default:
            return state;
    }
};*/

export default {
    sentimentGroup,
    //sentimentTweets
};