import { LOAD_CONVERSATION } from '../../types';

const load_conversation_action = (is_load) => {
    const data = {
        'load_conversation': is_load
    }

    return {
        type: LOAD_CONVERSATION,
        payload: data
    };

}

export { load_conversation_action };