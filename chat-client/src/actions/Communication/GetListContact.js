import axios from 'axios';
import { SERVER_API } from '../../constant';
import { GET_LIST_CONTACT } from '../../types';

const get_list_contact_action = () => {
    var token = localStorage.getItem('token');

    const data = {
        'api': 'get_list_contact',
        'token': JSON.parse(token)
    }

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: data
    }).then(res => {
        
        return {
            type: GET_LIST_CONTACT,
            payload: res.data
        };
    })
    .catch(err => {
        return {
            type: GET_LIST_CONTACT,
            payload: {}
        };
    });
}

export { get_list_contact_action };