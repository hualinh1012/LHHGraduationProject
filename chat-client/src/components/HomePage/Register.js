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
            <form class="form-detail" action="#" method="post">
                <div class="tabcontent" id="sign-in">
                    <div class="form-row">
                        <label class="form-row-inner">
                            <input type="text" name="full_name_1" id="full_name_1" class="input-text" required />
                            <span class="label">Username</span>
                            <span class="border"></span>
                        </label>
                    </div>
                    <div class="form-row">
                        <label class="form-row-inner">
                            <input type="text" name="your_email_1" id="your_email_1" class="input-text" required />
                            <span class="label">E-Mail</span>
                            <span class="border"></span>
                        </label>
                    </div>
                    <div class="form-row">
                        <label class="form-row-inner">
                            <input type="password" name="password_1" id="password_1" class="input-text" required />
                            <span class="label">Password</span>
                            <span class="border"></span>
                        </label>
                    </div>
                    <div class="form-row">
                        <label class="form-row-inner">
                            <input type="password" name="comfirm_password_1" id="comfirm_password_1" class="input-text" required />
                            <span class="label">Comfirm Password</span>
                            <span class="border"></span>
                        </label>
                    </div>
                    <div class="form-row-last">
                        <input type="submit" name="register" class="register" value="Sign In" />
                    </div>
                </div>
            </form>
        )
    }
}

export default Register;