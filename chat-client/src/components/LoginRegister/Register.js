import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { clear_data, register_action } from '../../actions';
import { connect } from 'react-redux';
import { isLogin } from '../../utils';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
            is_login: isLogin()
		};
		this.handerRegister = this.handerRegister.bind(this);
	}

	componentWillMount() {
        this.props.clear_data();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
	}

	handerRegister(event){
		event.preventDefault();
		const { r_email, r_username, r_dob, r_password, r_comfirm_password } = event.target;
		if (r_comfirm_password.value === r_password.value){
			//need gender here
			this.props.register_action(r_email.value, r_username.value, r_dob.value, 0, r_password.value);
		}        
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user_register.data) {
			switch (nextProps.user_register.data.code) {
				case 0:
					this.setState({ is_login: true });
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
		const { is_login } = this.state;
		if (is_login) {
			// redirect_page(BASE_URL);
			return (<Redirect to='/home' />);
        }
		return (
			<form className="form-detail" onSubmit={this.handerRegister} method="post" autoComplete="on">
			<div className="error-message"><span>{this.state.errorMessage}</span></div>
				<div className="tabcontent" id="sign-up">
					<div className="form-row">
						<label className="form-row-inner">
							<input type="text" name="r_email" className="input-text" required />
							<span className="label">E-Mail</span>
							<span className="border"></span>
						</label>
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="text" name="r_username" className="input-text" required />
							<span className="label">Tên người dùng</span>
							<span className="border"></span>
						</label>
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="date" name="r_dob" required />
						</label>
					</div>
					{/* <div >
						<label className="form-row-inner">
							<input type="radio" name="gender" value="1"/> Nam
							<input type="radio" name="gender" value="2"/> Nữ
						</label>
					</div> */}
					<div className="form-row">
						<label className="form-row-inner">
							<input type="password" name="r_password" className="input-text" required />
							<span className="label">Password</span>
							<span className="border"></span>
						</label>
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="password" name="r_comfirm_password" className="input-text" required />
							<span className="label">Comfirm Password</span>
							<span className="border"></span>
						</label>
					</div>
					<div className="form-row-last">
						<input type="submit" name="register" className="register" value="Register" />
					</div>
				</div>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        user_register: state.user_register_reducer
    }
}

export default connect(mapStateToProps, { register_action, clear_data })(Register);