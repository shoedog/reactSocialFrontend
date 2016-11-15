import 'isomorphic-fetch';
import { checkStatus, fetchJson } from '../lib/fetchUtils';

// Modify response for props
// We can do it here or on server
export const objConvert = (data) => {
    return data.map((json) => {
        var rObj = {};
        var obj = JSON.parse(json);
        rObj['id'] = obj.id_str;
        rObj['content'] = obj.text;
        return rObj;
    });
};


export default {
    TWITTER: {
        login(username, password) {
            var authToken = ``;
            return fetchJson(
                `http://54.212.196.159:5000/user/twitter`,
                {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                }
            );
        },
    },
};