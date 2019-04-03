import React, { Component } from 'react';
import $ from 'jquery';
import Profile from '../components/Home/Profile';
import SideBar from '../components/Home/SideBar';
import ChatPannel from '../components/Home/ChatPannel';
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

		$("#profile-img").click(function () {
			$("#status-options").toggleClass("active");
		});

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

		// function newMessage() {
		// 	var message = $(".message-input input").val();
		// 	if ($.trim(message) === '') {
		// 		return false;
		// 	}
		// 	$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
		// 	$('.message-input input').val(null);
		// 	$('.contact.active .preview').html('<span>You: </span>' + message);
		// 	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
		// };

		// $('.submit').click(function () {
		// 	newMessage();
		// });

		// $(window).on('keydown', function (e) {
		// 	if (e.which === 13) {
		// 		newMessage();
		// 		return false;
		// 	}
		// });
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.data)
		if (nextProps.data) {
			this.setState({
				load_conversation: nextProps.data.load_conversation
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
				<div className="content">
					{load_conversation === false ? null : <ChatPannel />}

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        data: state.load_conversation_reducer
    }
}

export default connect(mapStateToProps, { load_conversation_action })(HomePage);