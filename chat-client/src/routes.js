import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';

import './styles/sourcesanspro-font.css';
import './styles/layout.css';
import HomePage from './containers/HomePage';


const supportsHistory = 'pushState' in window.history;

class Routers extends Component {
	
	render() {
		return (
			<BrowserRouter forceRefresh={!supportsHistory} >
				<div className="wrapper">

					<Switch onUpdate={() => window.scrollTo(0, 0)}>
						{/* Timeline */}
						<Route exact path="/" component={HomePage} />


						{/* 404 page */}
						{/*<Route path="*" component={NotFound} />*/}
					</Switch>
					
				</div>
			</BrowserRouter>
		);
	}
}
export default Routers;