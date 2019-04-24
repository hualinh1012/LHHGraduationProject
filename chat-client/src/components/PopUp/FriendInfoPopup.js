import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_friend_info_action, clear_data } from '../../actions'

class FriendInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friend_info: false,
            gender: null
        };
    }

    componentWillMount() {
        this.props.get_friend_info_action(this.props.user_id);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.friend_info.data)
        if (nextProps.friend_info.data) {
            switch (nextProps.friend_info.data.code) {
                case 0:
                    console.log(nextProps.friend_info.data.data)
                    if (nextProps.friend_info.data.data.gender === 0) {
                        console.log("b bbbbbbbbbbbbbbbbb")
                        this.setState({
                            gender: 'Nam',
                            friend_info: nextProps.friend_info.data.data
                        })
                    }
                    else {
                        this.setState({
                            gender: 'Nữ',
                            friend_info: nextProps.friend_info.data.data
                        })
                    }
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
        let { friend_info, gender } = this.state;
        if (!friend_info) {
            return null;
        }
        else {
            return (
                <div className='popup'>
                    <div className='popup_show_user_info'>
                        <div className="popup_header">
                            <h1>Thông tin cá nhân</h1>
                            <label className="close"><i className="fa fa-times" aria-hidden="true" onClick={this.props.close}></i></label>
                        </div>
                        <div className="popup_body">
                            <div className="avatar">
                                <img id="i-new_avatar" src={friend_info.avatar_url ? friend_info.avatar_url : '/default_ava.png'} alt="" />
                            </div>
                            <div className="info">
                                <div className="i-row-info">
                                    <label className="i-row-label">Tên người dùng:</label>
                                    <label className="i-row-label">{friend_info.user_name}</label>
                                </div>
                                <div className="i-row-info">
                                    <label className="i-row-label">Ngày sinh:</label>
                                    <label className="i-row-label">{friend_info.dob}</label>
                                </div>
                                <div className="i-row-info">
                                    <label className="i-row-label">Giới tính:</label>
                                    <label className="i-row-label">{gender}</label>
                                </div>
                                <div className="i-row-info">
                                    <label className="i-row-label">Số điện thoại:</label>
                                    <label className="i-row-label">{friend_info.phone_number}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        friend_info: state.friend_info_reducer
    }
}

export default connect(mapStateToProps, { get_friend_info_action, clear_data })(FriendInfoPopup);