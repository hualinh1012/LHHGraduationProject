import React, { Component } from 'react';

class UserInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: null
        };
    }

    componentWillMount() {
        if (this.props.info.gender === 0) {
            this.setState({
                gender: 'Nam'
            })
        }
        else {
            this.setState({
                gender: 'Nữ'
            })
        }
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_show_user_info'>
                    <div className="popup_header">
                        <h1>Thông tin cá nhân</h1>
                        <label className="close"><i className="fa fa-times" aria-hidden="true" onClick={this.props.close}></i></label>
                    </div>
                    <div className="popup_body">
                        <div className="avatar">
                            <img id="i-new_avatar" src={this.props.info.avatar_url ? this.props.info.avatar_url : '/default_ava.png'} alt="" />
                        </div>
                        <div className="info">
                            <div className="i-row-info">
                                <label className="i-row-label">Tên người dùng:</label>
                                <label className="i-row-label">{this.props.info.user_name}</label>
                            </div>
                            <div className="i-row-info">
                                <label className="i-row-label">Ngày sinh:</label>
                                <label className="i-row-label">{this.props.info.dob}</label>
                            </div>
                            <div className="i-row-info">
                                <label className="i-row-label">Giới tính:</label>
                                <label className="i-row-label">{this.state.gender}</label>
                            </div>
                            <div className="i-row-info">
                                <label className="i-row-label">Số điện thoại:</label>
                                <label className="i-row-label">{this.props.info.phone_number}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoPopup;