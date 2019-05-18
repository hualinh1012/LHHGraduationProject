import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change_password_action } from '../../actions';

class ChangePasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            success: false
        };
    }

    handlerChangePassword = (event) => {
        event.preventDefault();
        const { change_new_pwd, change_cfm_new_pwd, change_old_pwd } = event.target;
        if (change_new_pwd.value === change_cfm_new_pwd.value) {
            this.props.change_password_action(change_new_pwd.value, change_old_pwd.value)
        }
        else {
            this.setState({
                errorMessage: "Mật khẩu xác nhận không khớp"
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.change_pass.data) {
            if (nextProps.change_pass.data.code === 16){
                this.setState({
                    errorMessage: "Mật khẩu không chính xác"
                })
            }
            else if (nextProps.change_pass.data.code === 0){
                this.setState({
                    success: true
                })
            }
        }
    }

    render() {
        if (this.state.success){
            this.props.close();
        }
        return (
            <div className='popup'>
                <div className='popup_change_password'>
                    <div className="popup_header">
                        <h1>Thay đổi mật khẩu</h1>
                        <label className="close"><i className="fa fa-times" aria-hidden="true" onClick={this.props.close}></i></label>
                    </div>
                    <div className="popup_body">
                        <form method="post" onSubmit={this.handlerChangePassword.bind(this)}>
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
        change_pass: state.change_password_reducer
    }
}

export default connect(mapStateToProps, { change_password_action })(ChangePasswordPopup);