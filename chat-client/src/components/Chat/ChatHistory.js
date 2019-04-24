import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clear_data, get_chat_history_action, load_more_history } from '../../actions'
import { format_yyyyMMddHHmmss } from '../../utils'
import MessageContent from '../Chat/MessageContent'

class ChatHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_history: [],
            conversation_detail: null,
            scroll_bot: true,
            scrollHeight: 0,
            load_more_history: false
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.conversation_detail.data) {
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
        if (nextProps.new_message.data) {
            let { chat_history } = this.state;
            if (nextProps.new_message.data.type !== 'PRC') {
                chat_history.push(nextProps.new_message.data)
                for (let x in chat_history) {
                    let msg = chat_history[x];
                    if (msg.type === 'PRC' && msg.value === 'wt' && msg.from === nextProps.new_message.data.from) {
                        chat_history.splice(x, 1);
                        break;
                    }
                }
                this.setState({
                    chat_history,
                    scroll_bot: true
                });
            }
            else {
                if (nextProps.new_message.data.value === 'wt') {
                    const { conversation_detail } = this.state;
                    if (conversation_detail.conversation_id === nextProps.new_message.data.to) {
                        chat_history.push(nextProps.new_message.data)
                        this.setState({
                            chat_history
                        });
                    }
                }
                else {
                    for (let x in chat_history) {
                        let msg = chat_history[x];
                        if (msg.type === 'PRC' && msg.value === 'wt' && msg.from === nextProps.new_message.data.from) {
                            chat_history.splice(x, 1);
                            break;
                        }
                    }
                    this.setState({
                        chat_history
                    });
                }
            }
            this.props.clear_data();
        }
        if (nextProps.more_history.data) {
            switch (nextProps.more_history.data.code) {
                case 0: {
                    let { chat_history } = this.state;
                    let more_history = nextProps.more_history.data.data.reverse()
                    Array.prototype.push.apply(more_history, chat_history);
                    this.setState({
                        chat_history: more_history,
                        load_more_history: false,
                        scroll_bot: true
                    });
                    this.props.clear_data();
                    break;
                }
                default:
                    break;
            }
        }
    }

    render() {
        let { chat_history } = this.state;
        return (
            <div className="messages" ref="chathistory"
                onLoad={() => {
                    if (this.state.scroll_bot === true) {
                        const sr = this.refs.chathistory;
                        sr.scrollTop = sr.scrollHeight + 200;
                        this.setState({ scrollHeight: sr.scrollHeight });
                    }
                }}
                onScroll={() => {
                    const sr = this.refs.chathistory;
                    if (this.state.chat_history.length !== 0) {
                        if (sr.scrollTop <= 10) {
                            if (this.state.load_more_history === false) {
                                console.log("load more")
                                this.setState({ scroll_bot: false, load_more_history: true });
                                // // console.log(sr.scrollTop);
                                // const token = JSON.parse(localStorage.getItem('token'));
                                const time_stamp = this.state.chat_history[0].time;
                                this.props.load_more_history(this.state.conversation_detail.conversation_id, time_stamp, 20);
                            }
                        }
                    }
                }}
            >
                <ul>
                    {chat_history.map((item) => {
                        if (item.type !== 'PRC') {
                            return (
                                <li className={item.is_owned === true ? "sent" : "replies"} key={item.msg_id}>
                                    <img src={item.from_info.avatar_url ? item.from_info.avatar_url : '/default_ava.png'} alt="" />
                                    <div className={item.is_owned === true ? "sent-content" : "replies-content"}>
                                        <h6>{format_yyyyMMddHHmmss(item.time)}</h6>
                                        <MessageContent message={item} />
                                    </div>
                                </li>
                            )
                        }
                        else if (!item.is_owned) {
                            return (
                                <li className={item.is_owned === true ? "sent" : "replies"} key={item.msg_id}>
                                    <img src={item.from_info.avatar_url ? item.from_info.avatar_url : '/default_ava.png'} alt="" />
                                    <div className={item.is_owned === true ? "sent-content" : "replies-content"}>
                                        <h5>{item.from_info.user_name} đang viết...</h5>
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
        conversation_detail: state.get_conversation_detail_reducer,
        chat_history: state.get_chat_history_reducer,
        new_message: state.show_message_reducer,
        more_history: state.load_more_chat_history_reducer
    }
}

export default connect(mapStateToProps, { clear_data, get_chat_history_action, load_more_history })(ChatHistory);

// ref="wrap"
// 				style={{ height: height - height_minus }}
// 				onLoad={() => {
//                     /**
//                      * Set scrollTop -> bottom
//                      */
// 					if (this.state.scroll_bot === true) {
// 						const sr = this.refs.wrap;
// 						sr.scrollTop = sr.scrollHeight + 200;
// 						this.setState({ scrollHeight: sr.scrollHeight });
// 					}
// 				}}
// 				onScroll={() => {
//                     /**
//                      * Check scrollTop -> load more
//                      */
// 					const sr = this.refs.wrap;
// 					if (this.state.messages.length !== 0) {
// 						if (sr.scrollTop <= 10) {
// 							if (this.state.load_more_history === false) {
// 								this.setState({ scroll_bot: false, load_more_history: true });
// 								// console.log(sr.scrollTop);
// 								const token = JSON.parse(localStorage.getItem('token'));
// 								const time_stamp = this.state.messages[0].time_stamp;
// 								this.chatGetHistory(token, this.props.user_id_chat, this.state.take, time_stamp);
// 							}
// 						}
// 					}
// 				}}