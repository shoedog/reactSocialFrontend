import SentimentApi from '../utils/fetchHandlers/sentiment';

export const FETCH_SENTIMENT = 'FETCH_SENTIMENT';
export const SENTIMENT_SUCCESS = 'SENTIMENT_SUCCESS';
export const SENTIMENT_FAILURE = 'SENTIMENT_FAILURE';

/**
 * * Action on Sentiment API Success Result
 *
 * @param term: Search term add to store in reducer
 * @param payload: Result from Sentiment API, we add to store in reducer
 */
export const sentimentSuccess = (term, payload) => ({
    type: SENTIMENT_SUCCESS,
    payload: {
       term: term,
        result: payload
    },
    meta: {
        done: true,
    },
});

/**
 * Action on Sentiment API Failure Result
 * @param payload: Failure result
 */
export const sentimentFailure = (payload) => ({
    type: SENTIMENT_FAILURE,
    error: true,
    payload,
    meta: {
        done: true,
    }
});

/**
 * Async Action: Get Sentiment From API Server and call Fulfilled or Rejected
 * @param term : Term for Sentiment API
 * @returns {function(*)} : Dispatch: See Redux-Thunk Docs
 */
export const fetchSentimentServer = (term) => {
    return dispatch => {
        return dispatch({
            type: FETCH_SENTIMENT,
            payload: SentimentApi.SENTIMENT.fetchSentiment(term),
        }).then( ({value, action}) => {
            console.log(value);
            console.log(action.type);
            if( action.type === 'FETCH_SENTIMENT_FULFILLED'){
                dispatch(sentimentSuccess(term, value));
            } else if ( action.type === 'FETCH_SENTIMENT_REJECTED'){
                dispatch(sentimentFailure(value));
            }
        })
    }
}