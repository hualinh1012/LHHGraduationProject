import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load_conversation_action, get_conversation_detail_action } from '../../actions';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    load_conversation = (conversation_id) => {
        this.props.load_conversation_action();
        this.props.get_conversation_detail_action(conversation_id)
    }

    convert_date = (date) => {

    }

    render() {
        const data = this.props.data
        return (
            <ul>
                {data.map((item) => {
                    return (
                        <li className="message" key={item.conversation_id} onDoubleClick={() => this.load_conversation(item.conversation_id)}>
                            <div className="wrap">
                                {/* <span className="contact-status online"></span> */}
                                <img src={item.avatar_url ? item.avatar_url : '/default_ava.png'} alt="" />
                                <div className="meta">
                                    <p className="name">{item.conversation_name}</p>
                                    <p className="chat-time">{item.last_message_time}</p>
                                    <p className="preview">{item.last_message_value}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        start_conversation: state.start_conversation_reducer
    }
}

export default connect(mapStateToProps, { load_conversation_action, get_conversation_detail_action })(Contact);