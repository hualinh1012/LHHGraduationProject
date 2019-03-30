import React, { Component } from 'react';

class UserInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        };
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
                <div className='popup_show_user_info'>
                    <div className="popup_header">
                        <h1>Thông tin cá nhân</h1>
                        <label className="close"><i className="fa fa-times" aria-hidden="true" onClick={this.props.close}></i></label>
                    </div>
                    <div className="popup_body">
                                                  
                            <div className="info">
                                <div className="i-row-info">
                                    <label className="i-row-label">Mật khẩu mới</label>
                                    <input className="i-row-input" name="change_new_pwd" type="password" required></input>
                                </div>
                            </div>
                            <div className="info">
                                <div className="i-row-info">
                                    <label className="i-row-label">Xác nhận</label>
                                    <input className="i-row-input" name="change_cfm_new_pwd" type="password" required></input>
                                </div>
                            </div>
                            <div className="info">
                                <div className="i-row-info">
                                    <label className="i-row-label">Mật khẩu cũ</label>
                                    <input className="i-row-input" name="change_old_pwd" type="password" required></input>
                                </div>
                            </div>
                            <div className="error-message"><span>{this.state.errorMessage}</span></div>
                            <div>
                                <input type="submit" name="i_save" className="i-submit" value="Cập nhật" />
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfoPopup;