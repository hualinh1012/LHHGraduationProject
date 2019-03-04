import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount = () => {

	}

	render() {
		return (
			<form className="form-detail" action="#" method="post">
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
							<span className="label">User name</span>
							<span className="border"></span>
						</label>
					</div>
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

export default Register;