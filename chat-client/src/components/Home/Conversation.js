import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load_conversation_action, get_conversation_detail_action } from '../../actions';
import { format_yyyyMMddHHmmss } from '../../utils';
import ConversationPreview from '../Home/ConversationPreview'

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    load_conversation = (conversation_id) => {
        this.props.load_conversation_action();
        this.props.get_conversation_detail_action(conversation_id)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            })
        }
        if (nextProps.new_message.data) {
            const new_msg = nextProps.new_message.data;
            let { data } = this.state;
            for (let i in data) {
                let c = data[i];
                if (c.conversation_id === new_msg.to) {
                    c.last_message_time = new_msg.time;
                    c.last_message_value = new_msg.value;
                    data.sort((a, b) => (a.last_message_time > b.last_message_time) ? -1 : 1)
                    this.setState({ data })
                }
            }
        }
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <div className="conversation-option">
                    <span>Sắp xếp theo: </span>
                    <select>
                        <option value="1">Thời gian</option>
                        <option value="2">Chưa đọc</option>
                    </select>                    
                    <button><i className="fa fa-plus" aria-hidden="true"></i> Trò chuyện</button>
                </div>
                <ul>
                    {data.map((item) => {
                        return (
                            <li className="message" key={item.conversation_id} onDoubleClick={() => this.load_conversation(item.conversation_id)}>
                                <div className="wrap">
                                    {/* <span className="contact-status online"></span> */}
                                    <img src={item.avatar_url ? item.avatar_url : '/default_ava.png'} alt=""/>
                                    <div className="meta">
                                        <p className="name">{item.conversation_name}</p>
                                        <p className="chat-time">{format_yyyyMMddHHmmss(item.last_message_time)}</p>
                                        <ConversationPreview conversation={item}/>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // start_conversation: state.start_conversation_reducer,
        new_message: state.show_message_reducer
    }
}

export default connect(mapStateToProps, { load_conversation_action, get_conversation_detail_action })(Conversation);