import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { clear_data, login_action, set_connect_socket_status_action } from '../../actions';
import { connect } from 'react-redux';
import { isLogin } from '../../utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            is_login: isLogin()
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount() {
        this.props.clear_data();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleLogin = (event) => {
        event.preventDefault();
        const { l_email, l_password } = event.target;
        this.props.login_action(l_email.value, l_password.value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user_login.data) {
            switch (nextProps.user_login.data.code) {
                case 0:
                    this.setState({ is_login: true });
                    this.props.set_connect_socket_status_action(true);
                    break;
                case 1:
                    this.setState({
                        errorMessage: 'Lỗi không xác định'
                    });
                    break;
                case 12:
                    this.setState({
                        errorMessage: 'E-mail không hợp lệ'
                    });
                    break;
                case 15:
                    this.setState({
                        errorMessage: 'Không thể tìm thấy E-mail này'
                    });
                    break;
                case 16:
                    this.setState({
                        errorMessage: 'Mật khẩu không chính xác'
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
        const { is_login } = this.state;
        if (is_login) {
            return (<Redirect to='/home' />);
        }
        return (
            <form className="form-detail" onSubmit={this.handleLogin} method="post" autoComplete="on">
                <div className="tabcontent" id="sign-in">
                    <div className="error-message"><span>{this.state.errorMessage}</span></div>
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="text" name="l_email" className="input-text" required placeholder="E-mail" />
                            {/* <span className="label">E-mail</span>
                            <span className="border"></span> */}
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="password" name="l_password" className="input-text" required placeholder="Mật khẩu" />
                            {/* <span className="label">Mật khẩu</span>
                            <span className="border"></span> */}
                        </label>
                    </div>
                    <div className="form-row-last">
                        <input type="submit" name="register" className="register" value="Đăng nhập" />
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_login: state.user_login_reducer
    }
}

export default connect(mapStateToProps, { login_action, clear_data, set_connect_socket_status_action })(Login);