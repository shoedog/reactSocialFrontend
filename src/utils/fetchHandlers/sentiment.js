import { fetchJson } from '../lib/fetchUtils';


export default {
    SENTIMENT: {
        fetchSentiment(term) {
            let options = { method: 'GET'};
            return fetchJson(`http://localhost:5000/social/sentiment/${term}`, options)
    },
}}