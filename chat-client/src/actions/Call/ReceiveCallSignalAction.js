import { RECEIVE_CALL_SIGNAL } from '../../types';

const receive_call_signal_action = (message) => {
    
        return {
            type: RECEIVE_CALL_SIGNAL,
            payload: message
        };
}

export { receive_call_signal_action };