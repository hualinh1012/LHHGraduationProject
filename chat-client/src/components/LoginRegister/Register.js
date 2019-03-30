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

	handerRegister(event) {
		event.preventDefault();
		const { r_email, r_username, r_dob, r_gender, r_password, r_comfirm_password } = event.target;
		if (r_comfirm_password.value === r_password.value) {
			this.props.register_action(r_email.value, r_username.value, r_dob.value, r_gender.value, r_password.value);
		}
		else {
			this.setState({
				errorMessage: 'Mật khẩu xác nhận không khớp'
			})
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
		var r = { "marginLeft": "80px" };
		return (
			<form className="form-detail" onSubmit={this.handerRegister} method="post" autoComplete="on">
				<div className="tabcontent" id="sign-up">
					<div className="error-message"><span>{this.state.errorMessage}</span></div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="text" name="r_email" className="input-text" required placeholder="E-mail" />
							{/* <span className="label">E-Mail</span>
							<span className="border"></span> */}
						</label>
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="text" name="r_username" className="input-text" required placeholder="Tên người dùng" />
							{/* <span className="label">Tên người dùng</span>
							<span className="border"></span> */}
						</label>
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="date" name="r_dob" className="input-text" required />
						</label>
					</div>
					<div className="form-row">
						{/* <label className="form-row-inner"> */}
						{/* <span className="label">Giới tính</span> */}
						<input type="radio" name="r_gender" className="input-radio" value="0" /> Nam
							<input type="radio" name="r_gender" className="input-radio" value="1" style={r} /> Nữ
						{/* </label> */}
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="password" name="r_password" className="input-text" required placeholder="Mật khẩu" />
							{/* <span className="label">Password</span>
							<span className="border"></span> */}
						</label>
					</div>
					<div className="form-row">
						<label className="form-row-inner">
							<input type="password" name="r_comfirm_password" className="input-text" required placeholder="Xác nhận mật khẩu" />
							{/* <span className="label">Comfirm Password</span>
							<span className="border"></span> */}
						</label>
					</div>
					<div className="form-row-last">
						<input type="submit" name="register" className="register" value="Đăng ký" />
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