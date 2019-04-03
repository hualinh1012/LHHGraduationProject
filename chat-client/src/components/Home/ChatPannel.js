import React, { Component } from 'react';
import ConversationDetail from '../Home/ConversationDetail';

class ChatPannel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message_content: ''
        };
    }

    change_text = (text) => {
        this.setState({
            message_content: text
        })
    }

    handle_key_down = (e) => {
        if (e.keyCode === 13) {
            this.send_text();
        }
    }

    send_text = () => {
        const { message_content } = this.state;
        if (message_content && message_content.trim() !== '') {
            this.setState({
                message_content: ''
            })
            console.log(message_content);
        }
    }

    render() {
        return (
            <div>
                <ConversationDetail />
                <div className="messages">
                    <ul>
                        <li className="sent">
                            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                            <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!
						</p>
                        </li>
                        <li className="replies">
                            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                            <p>When you're backed against the wall, break the god damn thing down.</p>
                        </li>
                    </ul>
                </div>
                <div className="message-input">
                    <div className="wrap">
                        <input type="text" placeholder="Write your message..."
                            value={this.state.message_content}
                            onChange={(e) => this.change_text(e.target.value)}
                            onKeyDown={(e) => this.handle_key_down(e)} />
                        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                        <button className="submit" onClick={(e) => this.send_text()}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPannel;