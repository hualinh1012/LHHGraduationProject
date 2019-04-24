import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load_conversation_action, get_conversation_detail_action } from '../../actions';
import { format_yyyyMMddHHmmss } from '../../utils';
import ConversationPreview from '../Home/ConversationPreview'

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            create_conversation_popup: false,
            active_conversation: ''
        };
    }

    load_conversation = (conversation_id) => {
        this.props.load_conversation_action();
        this.props.get_conversation_detail_action(conversation_id)
        let { data } = this.state;
        for (let x in data) {
            let c = data[x];
            if (c.conversation_id === conversation_id) {
                c.unread_number = null;
            }
        }
        this.setState({
            active_conversation: conversation_id,
            data
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            })
        }
        if (nextProps.new_message.data) {
            const new_msg = nextProps.new_message.data;
            if (new_msg.type !== 'PRC') {
                let { data } = this.state;
                for (let i in data) {
                    let c = data[i];
                    if (c.conversation_id === new_msg.to) {
                        if (new_msg.is_owned === false) {
                            if (c.unread_number === null || c.unread_number === undefined) {
                                c.unread_number = 1;
                            }
                            else {
                                c.unread_number += 1;
                            }
                        }
                        c.last_message_time = new_msg.time;
                        c.last_message_value = new_msg.value;
                        data.sort((a, b) => (a.last_message_time > b.last_message_time) ? -1 : 1)
                        this.setState({ data })
                    }
                }
            }
        }
    }

    render() {
        const { data, active_conversation } = this.state;
        return (
            <div className="sidebar-list-messages">
                <ul>
                    {data.map((item) => {
                        if (item.conversation_type === 0) {
                            return (
                                <li className={item.conversation_id === active_conversation ? "message active" : "message"} key={item.conversation_id}
                                    onDoubleClick={() => this.load_conversation(item.conversation_id)}>
                                    <div className="wrap">
                                        <img src={item.avatar_url ? item.avatar_url : '/default_ava.png'} alt="" />
                                        <div className="meta">
                                            <p className="name">{item.conversation_name}</p>
                                            <p className="chat-time">{format_yyyyMMddHHmmss(item.last_message_time)}</p>
                                            <ConversationPreview conversation={item} />
                                            {item.unread_number ?
                                                <div className="unread_number"><h6>{item.unread_number > 99 ? "99+" : item.unread_number}</h6></div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        else if (item.conversation_type === 1) {
                            return (
                                <li className={item.conversation_id === active_conversation ? "message active" : "message"} key={item.conversation_id}
                                    onDoubleClick={() => this.load_conversation(item.conversation_id)}>
                                    <div className="wrap">
                                        <img src={item.avatar_url ? item.avatar_url : '/default-group-avatar.png'} alt="" />
                                        <div className="meta">
                                            <p className="name">{item.conversation_name ? item.conversation_name : "Nhóm không tên"}</p>
                                            <p className="chat-time">{format_yyyyMMddHHmmss(item.last_message_time)}</p>
                                            <ConversationPreview conversation={item} />
                                            {item.unread_number ?
                                                <div className="unread_number"><h6>{item.unread_number > 99 ? "99+" : item.unread_number}</h6></div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        else {
                            return null;
                        }
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