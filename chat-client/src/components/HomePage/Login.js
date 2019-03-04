import React, { Component } from 'react';
import {clear_data, login_action} from '../../actions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

    render() {
        return (
            <form className="form-detail" onSubmit={this.handleLogin} method="post" autoComplete="on">
                <div className="tabcontent" id="sign-in">
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="text" name="l_email" className="input-text" required />
                            <span className="label">E-mail</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="password" name="l_password" className="input-text" required />
                            <span className="label">Password</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="form-row-last">
                        <input type="submit" name="register" className="register" value="Sign In" />
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

export default connect(mapStateToProps, { login_action, clear_data })(Login);