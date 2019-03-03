import React, { Component } from 'react';
import Login from '../components/HomePage/Login';
import Register from '../components/HomePage/Register';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
    }
    componentDidMount = () => {
		window.scrollTo(0, 0);
	}

    changeTab = (evt, name) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(name).style.display = "block";
        evt.currentTarget.className += " active";
    }

	render() {
		return (
			<div>
                <div className="page-content">
                    <div className="form-v8-content">
                        <div className="form-left">
                            <img src="/banner.jpg" alt="form"/>
                        </div>
                        <div className="form-right">
                            <div className="tab">
                                <div className="tab-inner">
                                <button className="tablinks" onClick={(event) => this.changeTab(event, 'sign-up')} id="defaultOpen">Sign Up</button>
                                </div>
                                <div className="tab-inner">
                                    <button className="tablinks" onClick={(event) => this.changeTab(event, 'sign-in')}>Sign In</button>
                                </div>
                            </div>
                            <Login/>
                            <Register/>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default HomePage;