import React, { Component } from 'react';
import $ from 'jquery';
import Profile from '../components/Home/Profile';
import SideBar from '../components/Home/SideBar';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {

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

		function newMessage() {
			var message = $(".message-input input").val();
			if ($.trim(message) === '') {
				return false;
			}
			$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
			$('.message-input input').val(null);
			$('.contact.active .preview').html('<span>You: </span>' + message);
			$(".messages").animate({ scrollTop: $(document).height() }, "fast");
		};

		$('.submit').click(function () {
			newMessage();
		});

		$(window).on('keydown', function (e) {
			if (e.which === 13) {
				newMessage();
				return false;
			}
		});
	}

	render() {
		return (
			<div id="frame">
				<div id="sidepanel">
					<Profile/>
					<SideBar/>					
				</div>
				<div className="content">
					<div className="contact-profile">
						<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
						<p>Harvey Specter</p>
						<div className="social-media">
							<i className="fa fa-facebook" aria-hidden="true"></i>
							<i className="fa fa-twitter" aria-hidden="true"></i>
							<i className="fa fa-instagram" aria-hidden="true"></i>
						</div>
					</div>
					<div className="messages">
						<ul>
							<li className="sent">
								<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
								<p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!
						</p>
							</li>
							<li className="replies">
								<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
								<p>When you're backed against the wall, break the god damn thing down.</p>
							</li>
							<li className="replies">
								<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
								<p>Excuses don't win championships.</p>
							</li>
							<li className="sent">
								<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
								<p>Oh yeah, did Michael Jordan tell you that?</p>
							</li>
							<li className="replies">
								<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
								<p>No, I told him that.</p>
							</li>
							<li className="replies">
								<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
								<p>What are your choices when someone puts a gun to your head?</p>
							</li>
							<li className="sent">
								<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
								<p>What are you talking about? You do what they say or they shoot you.</p>
							</li>
							<li className="replies">
								<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
								<p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do
									any one of a
							hundred and forty six other things.</p>
							</li>
						</ul>
					</div>
					<div className="message-input">
						<div className="wrap">
							<input type="text" placeholder="Write your message..." />
							<i className="fa fa-paperclip attachment" aria-hidden="true"></i>
							<button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;