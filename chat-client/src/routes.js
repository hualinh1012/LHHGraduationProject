import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';

import './styles/sourcesanspro-font.css';
import './styles/main-layout.css';
import './styles/lr-layout.css';

import LoginRegisterPage from './containers/LoginRegisterPage';
import HomePage from './containers/HomePage';
import WebSocket from './containers/WebSocket';
import VoiceVideoCall from './containers/VoiceVideoCall';

const supportsHistory = 'pushState' in window.history;

class Routers extends Component {
	
	render() {
		return (
			<BrowserRouter forceRefresh={!supportsHistory} >
				<div className="wrapper">

					<Switch onUpdate={() => window.scrollTo(0, 0)}>

						<Route exact path="/home" component={HomePage} />
						<Route exact path="/call" component={VoiceVideoCall} />
						<Route path="/" component={LoginRegisterPage} />
					</Switch>
					
					<WebSocket/>
				</div>
			</BrowserRouter>

		);
	}
}
export default Routers;