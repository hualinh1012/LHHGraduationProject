import axios from 'axios';
import { SERVER_API } from '../../constant';

const upload_file_action = (file) => {
    var token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('api', "upl_file");
    formData.append('token', JSON.parse(token));
    formData.append('file', file);

    return axios({
        method: 'post',
        url: `${SERVER_API}`,
        data: formData
    }).then(res => {        
        return res.data;
    })
}

export { upload_file_action };