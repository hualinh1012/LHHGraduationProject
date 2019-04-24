import { START_CALL } from '../../types';

const start_call_action = (message) => {
    
        return {
            type: START_CALL,
            payload: message
        };
}

export { start_call_action };