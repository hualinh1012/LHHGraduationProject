import React, { Component } from 'react';
import ConversationDetail from './ConversationDetail';
import ChatInput from './ChatInput';
import ChatHistory from './ChatHistory';

class ChatPannel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message_content: ''
        };
    }

    render() {
        return (
            <div className="content">
                <ConversationDetail />
                <ChatHistory/>
                <ChatInput/>
            </div>
        );
    }
}

export default ChatPannel;