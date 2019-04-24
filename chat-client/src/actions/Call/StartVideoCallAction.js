import { START_VIDEO_CALL } from '../../types';

const start_video_call_action = (message) => {
    
        return {
            type: START_VIDEO_CALL,
            payload: message
        };
}

export { start_video_call_action };