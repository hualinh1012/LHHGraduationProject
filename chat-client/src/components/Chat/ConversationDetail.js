import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { get_conversation_detail_action } from '../../actions';
import { connect } from 'react-redux';
import { isLogin } from '../../utils';
import FriendInfoPopup from '../PopUp/FriendInfoPopup';

class ConversationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_login: isLogin(),
            conversation_detail: '',
            show_conversation_detail_popup: false,
            friend_profile_popup: false,
            group_profile_popup: false
        };
    }

    toggleShowFriendInfoPopup() {
        this.setState({
            friend_profile_popup: !this.state.friend_profile_popup
        });
    }

    toggleShowGroupInfoPopup() {
        this.setState({
            group_profile_popup: !this.state.group_profile_popup
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.conversation_detail.data) {
            switch (nextProps.conversation_detail.data.code) {
                case 0:
                    this.setState({
                        conversation_detail: nextProps.conversation_detail.data.data
                    });
                    break;

                case 1:
                    this.setState({
                        errorMessage: 'Lỗi không xác định'
                    });
                    break;

                default:
                    this.setState({
                        disabled_btn_login: false,
                        message_error: 'Không thể kết nối tới máy chủ!'
                    });
                    break;
            }
        }
    }

    render() {
        var { is_login } = this.state;
        if (!is_login) {
            return (<Redirect to='/' />);
        }
        if (this.state.conversation_detail.conversation_type === 1) {
            return (
                <div className="contact-profile">
                    <img src={this.state.conversation_detail.avatar_url ? this.state.conversation_detail.avatar_url : '/default-group-avatar.png'} alt="" 
                    onClick={this.toggleShowGroupInfoPopup.bind(this)}/>
                    <p onClick={this.toggleShowGroupInfoPopup.bind(this)}>{this.state.conversation_detail.conversation_name ? this.state.conversation_detail.conversation_name : "Nhóm không tên"}</p>
                    <div className="social-media">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="contact-profile">
                    <img src={this.state.conversation_detail.avatar_url ? this.state.conversation_detail.avatar_url : '/default_ava.png'} alt=""
                    onClick={this.toggleShowFriendInfoPopup.bind(this)}/>
                    <p onClick={this.toggleShowFriendInfoPopup.bind(this)}>{this.state.conversation_detail.conversation_name}</p>
                    <div className="social-media">
                        <i className="fa fa-video-camera" aria-hidden="true"></i>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    {this.state.friend_profile_popup ?
                        <FriendInfoPopup user_id={this.state.conversation_detail.user_id} close={this.toggleShowFriendInfoPopup.bind(this)} /> : null
                    }
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        conversation_detail: state.get_conversation_detail_reducer
    }
}

export default connect(mapStateToProps, { get_conversation_detail_action })(ConversationDetail);