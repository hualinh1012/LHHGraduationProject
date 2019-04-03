import { LOAD_CONVERSATION } from '../../types';

const load_conversation_action = () => {

    const data = {
        'load_conversation': true
    }

    return {
        type: LOAD_CONVERSATION,
        payload: data
    };

}

export { load_conversation_action };