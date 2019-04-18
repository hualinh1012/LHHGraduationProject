import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update_user_info_action, update_avatar_action } from '../../actions';

class ChangeUserInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        };
    }

    handlerUpdateUserInfo = (event) => {
        event.preventDefault();
        const { i_username, i_dob, i_gender, i_phonenumber, i_userava } = event.target;
        let file = i_userava.files;
        if (file[0]) {
            update_avatar_action(file[0]).then(res => {
                if (res && res.code === 0 && res.data) {
                    const file_id = res.data.file_id;
                    this.props.update_user_info_action(i_username.value, i_dob.value, i_gender.value, i_phonenumber.value, file_id)
                    this.props.close();
                }
            });
        }
        else {
            this.props.update_user_info_action(i_username.value, i_dob.value, i_gender.value, i_phonenumber.value, null)
            this.props.close();
        }
    }

    componentWillMount() {
        if (this.props.info) {
            this.setState({
                checked: (this.props.info === 0)
            })
        }
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_change_info'>
                    <div className="popup_header">
                        <h1>Thay đổi thông tin cá nhân</h1>
                        <label className="close"><i className="fa fa-times" aria-hidden="true" onClick={this.props.close}></i></label>
                    </div>
                    <div className="popup_body">
                        <form method="post" onSubmit={this.handlerUpdateUserInfo.bind(this)}>
                            <div className="avatar">
                                <img id="i-new_avatar" src={this.props.info.avatar_url ? this.props.info.avatar_url : '/default_ava.png'} alt="" />
                                <input name="i_userava" type='file' />
                            </div>
                            <div className="info">
                                <div className="i-row-info">
                                    <label className="i-row-label">Tên người dùng</label>
                                    <input className="i-row-input" name="i_username" type="text" required defaultValue={this.props.info.user_name}></input>
                                </div>
                                <div className="i-row-info">
                                    <label className="i-row-label">Ngày sinh</label>
                                    <input className="i-row-input" name="i_dob" type="date" required defaultValue={this.props.info.dob}></input>
                                </div>
                                <div className="i-row-info">
                                    <label className="i-row-label">Giới tính</label>
                                    <div className="i-radio-1">
                                        <input className="i-radio-value" type="radio" name="i_gender"
                                            value="0"
                                            defaultChecked={this.state.checked}
                                        />
                                        <label className="i-radio-label">Nam</label>
                                    </div>
                                    <div className="i-radio-2">
                                        <input className="i-radio-value" type="radio" name="i_gender"
                                            value="1" // minh lay props de check xem no la gi
                                            defaultChecked={!this.state.checked}
                                        />
                                        <label className="i-radio-label">Nữ</label>
                                    </div>
                                </div>
                                <div className="i-row-info">
                                    <label className="i-row-label">Số điện thoại</label>
                                    <input className="i-row-input" name="i_phonenumber" type="tel" defaultValue={this.props.info.phone_number}></input>
                                </div>
                            </div>
                            <div className="popup-submit">
                                <input type="submit" name="i_save" className="i-submit" value="Cập nhật" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_info: state.user_info_reducer
    }
}

export default connect(mapStateToProps, { update_user_info_action, update_avatar_action })(ChangeUserInfoPopup);