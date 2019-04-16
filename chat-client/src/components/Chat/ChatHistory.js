import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clear_data, get_chat_history_action } from '../../actions'
import { format_yyyyMMddHHmmss } from '../../utils'

class ChatHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_history: [],
            conversation_detail: null
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.chat_history)
        if (nextProps.conversation_detail.data) {
            console.log(nextProps.conversation_detail.data.data)
            switch (nextProps.conversation_detail.data.code) {
                case 0: {
                    this.setState({
                        conversation_detail: nextProps.conversation_detail.data.data,
                        chat_history: []
                    });
                    this.props.clear_data();
                    this.props.get_chat_history_action(nextProps.conversation_detail.data.data.conversation_id, null, 20);
                    break;
                }
                default:
                    break;
            }
        }
        if (nextProps.chat_history.data) {
            console.log(nextProps.chat_history.data)
            switch (nextProps.chat_history.data.code) {
                case 0: {
                    this.setState({
                        chat_history: nextProps.chat_history.data.data.reverse()
                    });
                    this.props.clear_data();
                    break;
                }
                default:
                    break;
            }
        }
        console.log(nextProps.new_message.data)
        if (nextProps.new_message.data) {
            let { chat_history } = this.state;
            chat_history.push(nextProps.new_message.data)
            this.setState({
                chat_history
            });
            this.props.clear_data();
        }
    }

    render() {
        let { chat_history } = this.state;
        return (
            <div className="messages">
                <ul>
                    {chat_history.map((item) => {
                        return (
                            <li className={item.is_owned === true ? "sent" : "replies"} key={item.msg_id}>
                                <img src={item.from_info.user_ava ? item.from_info.user_ava : '/default_ava.png'} alt="" />
                                <div className={item.is_owned === true ? "sent-content" : "replies-content"}>
                                    <h6>{format_yyyyMMddHHmmss(item.time)}</h6>
                                    <p>{item.value}</p>
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
        conversation_detail: state.get_conversation_detail_reducer,
        chat_history: state.get_chat_history_reducer,
        new_message: state.show_message_reducer
    }
}

export default connect(mapStateToProps, { clear_data, get_chat_history_action })(ChatHistory);