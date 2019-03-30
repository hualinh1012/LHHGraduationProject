import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../components/LoginRegister/Login';
import Register from '../components/LoginRegister/Register';
import { isLogin } from '../utils';

class LoginRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_login: isLogin()
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        var defaultOpen = document.getElementById("defaultOpen");
        if (defaultOpen !== null) {
            defaultOpen.click();
        }
    }

    changeTab = (evt, name) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        if (tablinks !== null) {
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(name).style.display = "block";
            evt.currentTarget.className += " active";
        }
    }

    render() {
        const { is_login } = this.state;
        if (is_login) {
            // redirect_page(BASE_URL);
            return (<Redirect to='/home' />);
        }
        return (
            <div>
                <div className="page-content">
                    <div className="form-v8-content">
                        {/* <div className="form-left">
                            <img src="/banner.jpg" alt="form" />
                        </div> */}
                        <div className="form-right">
                            <div className="tab">
                                <div className="tab-inner">
                                    <button className="tablinks" onClick={(event) => this.changeTab(event, 'sign-in')} id="defaultOpen">Đăng nhập</button>
                                </div>
                                <div className="tab-inner">
                                    <button className="tablinks" onClick={(event) => this.changeTab(event, 'sign-up')}>Đăng ký</button>
                                </div>
                            </div>
                            <Login />
                            <Register />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginRegisterPage;