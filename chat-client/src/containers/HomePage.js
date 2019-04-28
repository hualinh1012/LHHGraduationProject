import React, { Component } from 'react';
import $ from 'jquery';
import Profile from '../components/Home/Profile';
import SideBar from '../components/Home/SideBar';
import ChatPannel from '../components/Chat/ChatPannel';
import Home from '../components/Home/Home';
import { load_conversation_action } from '../actions';
import { connect } from 'react-redux';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			load_conversation: false
		};
	}

	componentDidMount() {
		$(".messages").animate({ scrollTop: $(document).height() }, "fast");
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.load_data.data) {
			this.setState({
				load_conversation: nextProps.load_data.data.load_conversation
			})
		}
	}

	render() {
		const { load_conversation } = this.state;
		return (
			<div id="frame">
				<div id="sidepanel">
					<Profile />
					<SideBar />
				</div>
				{(load_conversation === undefined || load_conversation === null || load_conversation === false) ? <Home/> : <ChatPannel />}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        load_data: state.load_conversation_reducer
    }
}

export default connect(mapStateToProps, { load_conversation_action })(HomePage);