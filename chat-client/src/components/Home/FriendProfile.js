import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { clear_data, get_friend_info_action } from '../../actions';
import { connect } from 'react-redux';
import { isLogin } from '../../utils';

class FriendProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user_info: '',
            is_login: isLogin(),
            show_friend_profile_popup: false
        };
        this.getFriendInfo = this.getFriendInfo.bind(this);
    }

    getFriendInfo = () => {
        this.props.get_friend_info_action();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: false
        })
        if (nextProps.user_info.data) {
            switch (nextProps.user_info.data.code) {
                case 0:
                    this.setState({
                        user_info: nextProps.user_info.data.data
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
        var { loading, is_login } = this.state;
        if (!is_login) {
            return (<Redirect to='/' />);
        }
        if (loading) {
            this.getFriendInfo();
        }
        return (
            <div className="contact-profile">
                <img src={this.state.user_info.user_ava ? this.state.user_info.user_ava : '/default_ava.png'} alt="" />
                <p>{this.state.user_info.user_name}</p>
                <div className="social-media">
                    <i className="fa fa-video-camera" aria-hidden="true"></i>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_info: state.friend_info_reducer
    }
}

export default connect(mapStateToProps, { get_friend_info_action, clear_data })(FriendProfile);