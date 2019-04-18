import React, { Component } from 'react';
import $ from 'jquery';
import Profile from '../components/Home/Profile';
import SideBar from '../components/Home/SideBar';
import ChatPannel from '../components/Chat/ChatPannel';
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

		$(".expand-button").click(function () {
			$("#profile").toggleClass("expanded");
			$("#contacts").toggleClass("expanded");
		});

		$("#status-options ul li").click(function () {
			$("#profile-img").removeClass();
			$("#status-online").removeClass("active");
			$("#status-away").removeClass("active");
			$("#status-busy").removeClass("active");
			$("#status-offline").removeClass("active");
			$(this).addClass("active");

			if ($("#status-online").hasClass("active")) {
				$("#profile-img").addClass("online");
			} else if ($("#status-away").hasClass("active")) {
				$("#profile-img").addClass("away");
			} else if ($("#status-busy").hasClass("active")) {
				$("#profile-img").addClass("busy");
			} else if ($("#status-offline").hasClass("active")) {
				$("#profile-img").addClass("offline");
			} else {
				$("#profile-img").removeClass();
			};

			$("#status-options").removeClass("active");
		});

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
				{(load_conversation === undefined || load_conversation === null || load_conversation === false) ? null : <ChatPannel />}
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