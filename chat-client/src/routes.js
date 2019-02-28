import React, { Component } from 'react';
// import { connect } from 'react-redux';
import platform from 'platform';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import { is_login } from './utils';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WebSocketConnect from './containers/Websocket';
import Timeline from './containers/Timeline';
import NotFound from './containers/NotFound';
import Profile from './containers/Profile';
import Terms from './containers/Terms';
import About from './containers/About';
import Login from './containers/Login';
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import EditPassword from './containers/EditPassword';
// import EditProfile from './containers/EditProfile';
import BuzzDetail from './containers/BuzzDetail';
import Search from './containers/Search';
// import FollowersPage from './containers/Followers';
import FollowingPage from './containers/Following';
import AlbumTimeline from './containers/AlbumTimeline';
import Livestream from './containers/Livestream';
import Livestreamfile from './containers/Livestreamfile';
// import AlbumVideo from './containers/AlbumVideo';
import NotificationPage from './containers/Notification';
import BlockPage from './containers/BlockPage';
import ConfigNoti from './containers/ConfigNoti';
// import MessagesPage from './containers/MessagesPage';
import AlbumPage from './containers/AlbumPage';
import AlbumImageDetail from './containers/AlbumImageDetail';
import ErrorPage from './containers/ErrorPage';
import AboutPage from './containers/AboutPage';
import ProfileSetting from './containers/ProfileSetting';

import GroupRouter from './containers/GroupRouter';
// import GroupCreate from './containers/GroupCreate';
import GroupOwner from './containers/GroupOwner';
import GroupJoined from './containers/GroupJoined';
// import GroupTimeline from './containers/GroupTimeline';
// import GroupMember from './containers/GroupMember';
// import GroupEdit from './containers/GroupEdit';
// import GroupAdminReviewMember from './containers/GroupAdminReviewMember';
// import GroupAdminReviewPost from './containers/GroupAdminReviewPost';

import WebServiceWorker from './service_worker/WebServiceWorker';
// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/messaging';

import { get_upload_setting_action, get_noti_setting_action } from './actions';

import './styles/animate.css';
import './styles/layout.css';
import './styles/livestream.css';
import './styles/loading.css';
import './styles/notification.css';
import './styles/register_login.css';
import './styles/content/index.css';
import './styles/messages.css';
import './styles/group_page.css';
import './styles/responsive.css';


const supportsHistory = 'pushState' in window.history;

class Routers extends Component {
	
	render() {
		return (
			<BrowserRouter forceRefresh={!supportsHistory} >
				<div className="wrapper">
					<Header />

					<Switch onUpdate={() => window.scrollTo(0, 0)}>
						{/* Timeline */}
						<Route exact path="/" component={Timeline} />


						{/* 404 page */}
						<Route path="*" component={NotFound} />
					</Switch>
					
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}
export default Routers;