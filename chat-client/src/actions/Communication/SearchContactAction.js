import axios from 'axios';
import { SERVER_API } from '../../constant';
import { SEARCH_CONTACT } from '../../types';

const search_contact_action = (value) => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'search_contact',
        'token': JSON.parse(token),
        'search': value
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: SEARCH_CONTACT,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: SEARCH_CONTACT,
            payload: {}
        };
    });
}

export { search_contact_action };