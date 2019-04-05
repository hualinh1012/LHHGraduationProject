import { SHOW_MESSAGE } from '../../types';

const show_message_action = (message) => {
    
        return {
            type: SHOW_MESSAGE,
            payload: message
        };
}

export { show_message_action };