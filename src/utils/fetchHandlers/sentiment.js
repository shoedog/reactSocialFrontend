import { fetchJson } from '../lib/fetchUtils';


export default {
    SENTIMENT: {
        fetchSentiment(term) {
            let options = { method: 'GET'};
            return fetchJson(`http://54.212.196.159:5000/social/sentiment/${term}`, options)
    },
}}