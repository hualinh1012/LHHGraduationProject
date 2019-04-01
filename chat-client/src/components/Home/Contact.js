import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_contact_action, start_conversation_action } from '../../actions';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    add_friend = (friendId) => {
        this.props.add_contact_action(friendId);
    }

    start_conversation = (friendId) => {
        this.props.start_conversation_action(friendId);
    }

    render() {
        const data = this.props.data
        return (
            <ul>
                {data.map((item) => {
                    return (
                        <li className="contact" key={item.friend_id} onDoubleClick={() => this.start_conversation(item.friend_id)}>
                            <div className="wrap">
                            {/* <span className="contact-status online"></span> */}
                                <img src={item.friend_ava ? item.friend_ava : '/default_ava.png'} alt="" />
                                <div className="meta">
                                    <p className="name" key={item.friend_id}>{item.friend_name}</p>
                                </div>
                                {item.is_added ? null : <i onClick={() => this.add_friend(item.friend_id)} className="fa fa-user-plus add-contact" aria-hidden="true"></i>}
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
        
    }
}

export default connect(mapStateToProps, { add_contact_action, start_conversation_action })(Contact);