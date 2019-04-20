import React, { Component } from 'react';

class ConversationPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const data = this.props.conversation;
        switch (data.last_message_type){
            case "TEXT":
                return (
                    <p className="preview">{data.last_message_value}</p>
                );
            case "FILE":
                return (
                    <p className="preview">Tệp đính kèm</p>
                );
            default:
                return <p className="preview">Hãy bắt đầu trò chuyện ngay</p>;
        }
        
    }
}

export default ConversationPreview;