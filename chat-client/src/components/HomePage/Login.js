import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount = () => {

	}

	render() {
		return (
			<form class="form-detail" action="#" method="post">
				<div class="tabcontent" id="sign-up">
					<div class="form-row">
						<label class="form-row-inner">
							<input type="text" name="full_name" id="full_name" class="input-text" required />
							<span class="label">Username</span>
							<span class="border"></span>
						</label>
					</div>
					<div class="form-row">
						<label class="form-row-inner">
							<input type="text" name="your_email" id="your_email" class="input-text" required />
							<span class="label">E-Mail</span>
							<span class="border"></span>
						</label>
					</div>
					<div class="form-row">
						<label class="form-row-inner">
							<input type="password" name="password" id="password" class="input-text" required />
							<span class="label">Password</span>
							<span class="border"></span>
						</label>
					</div>
					<div class="form-row">
						<label class="form-row-inner">
							<input type="password" name="comfirm_password" id="comfirm_password" class="input-text" required />
							<span class="label">Comfirm Password</span>
							<span class="border"></span>
						</label>
					</div>
					<div class="form-row-last">
						<input type="submit" name="register" class="register" value="Register" />
					</div>
				</div>
			</form>
		)
	}
}

export default Login;