import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';

import './styles/sourcesanspro-font.css';
import './styles/layout.css';
import LoginRegisterPage from './containers/LoginRegisterPage';
import HomePage from './containers/HomePage';

const supportsHistory = 'pushState' in window.history;

class Routers extends Component {
	
	render() {
		return (
			<BrowserRouter forceRefresh={!supportsHistory} >
				<div className="wrapper">

					<Switch onUpdate={() => window.scrollTo(0, 0)}>

						<Route exact path="/home" component={HomePage} />

						<Route path="/" component={LoginRegisterPage} />
					</Switch>
					
				</div>
			</BrowserRouter>
		);
	}
}
export default Routers;