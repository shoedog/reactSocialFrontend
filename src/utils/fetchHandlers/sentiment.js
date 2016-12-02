import { normalize, Schema, arrayOf, valuesOf, schemaAttribute, inferSchema } from 'normalizr';
import { fetchJson } from '../lib/fetchUtils';

const sentimentItem = new Schema('sentimentItems');
const tweet = new Schema('tweets');
sentimentItem.define({
    tweets: arrayOf(tweet)
});

// Process data from fetch:
export const normalizeSentimentItems = (data) => {
    console.log(data);
    return normalize(data, sentimentItem);
};

// Process object returned from normalizeSongList into feedItems and feedItemIds
export const returnSentimentItemsAndIds = ({ entities: {sentimentItems, tweets} }) => ({
    sentimentItems,
    tweets
});

export default {
    SENTIMENT: {
        fetchSentiment(term) {

            let options = { method: 'GET'};
            return fetchJson(`http://localhost:5000/social/sentiment/${term}`, options)
            //.then(normalizeSentimentItems)
            //.then(returnSentimentItemsAndIds);
        },
    },
};