import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { clear_data, get_user_info_action } from '../../actions';
import { connect } from 'react-redux';
import { isLogin } from '../../utils';
import ChangeUserInfoPopup from '../PopUp/ChangeUserInfoPopup';
import ChangePasswordPopup from '../PopUp/ChangePasswordPopup';
import UserInfoPopup from '../PopUp/UserInfoPopup';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_login: isLogin(),
            loading: true,
            user_info: '',
            show_profile_popup: false,
            edit_profile_popup: false,
            change_password_popup: false
        };
        this.getUserInfo = this.getUserInfo.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getUserInfo = () => {
        this.props.get_user_info_action();
    }

    signOut = () => {
        localStorage.clear();
        this.setState({
            is_login: false
        })
    }

    toggleShowUserInfoPopup() {
        this.setState({
            show_profile_popup: !this.state.show_profile_popup
        });
    }

    toggleEditUserInfoPopup() {
        this.setState({
            edit_profile_popup: !this.state.edit_profile_popup
        });
    }

    toggleChangePasswordPopup() {
        this.setState({
            change_password_popup: !this.state.change_password_popup
        });
    }

    componentWillMount() {
        this.props.clear_data();
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
            this.getUserInfo();
        }
        return (
            <div id="profile" className="expanded">
                <div className="wrap">
                    <img id="profile-img" src={this.state.user_info.avatar_url ? this.state.user_info.avatar_url : '/default_ava.png'} className="online" alt="" onClick={this.toggleShowUserInfoPopup.bind(this)}/>
                    <p className="user_name" onClick={this.toggleShowUserInfoPopup.bind(this)}>{this.state.user_info.user_name}</p>
                    <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                    <div id="expanded">
                        <label onClick={this.toggleEditUserInfoPopup.bind(this)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></label>
                        <p className="setting" onClick={this.toggleEditUserInfoPopup.bind(this)}>Thay đổi thông tin cá nhân</p>
                        <label onClick={this.toggleChangePasswordPopup.bind(this)}><i className="fa fa-cog" aria-hidden="true"></i></label>
                        <p className="setting" onClick={this.toggleChangePasswordPopup.bind(this)}>Thay đổi mật khẩu</p>
                        <label><i className="fa fa-sign-out" aria-hidden="true"></i></label>
                        <p className="setting" onClick={(e) => this.signOut(e)}>Đăng xuất</p>
                    </div>
                    {this.state.show_profile_popup ?
                        <UserInfoPopup info={this.state.user_info} close={this.toggleShowUserInfoPopup.bind(this)} /> : null
                    }
                    {this.state.edit_profile_popup ?
                        <ChangeUserInfoPopup info={this.state.user_info} close={this.toggleEditUserInfoPopup.bind(this)} /> : null
                    }
                    {this.state.change_password_popup ?
                        <ChangePasswordPopup close={this.toggleChangePasswordPopup.bind(this)} /> : null
                    }
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

export default connect(mapStateToProps, { get_user_info_action, clear_data })(Profile);