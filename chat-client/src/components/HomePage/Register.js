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
                <div className="tabcontent" id="sign-in">
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="text" name="full_name_1" id="full_name_1" className="input-text" required />
                            <span className="label">Username</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="text" name="your_email_1" id="your_email_1" className="input-text" required />
                            <span className="label">E-Mail</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="password" name="password_1" id="password_1" className="input-text" required />
                            <span className="label">Password</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="form-row">
                        <label className="form-row-inner">
                            <input type="password" name="comfirm_password_1" id="comfirm_password_1" className="input-text" required />
                            <span className="label">Comfirm Password</span>
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

export default Register;