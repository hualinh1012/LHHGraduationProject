import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PEER_CONFIG } from '../constant';
import { clear_data, send_message_action, get_user_info_action } from '../actions';
import { parseURLParams } from '../utils';

let peerConnection = null;
let localVideo = null;
let localStream = null;
let remoteVideo = null;
// msg data
let from = null;
let to = null;
let isCaller = null;
let msgId = null;

class VoiceVideoCall extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount = () => {
        from = JSON.parse(localStorage.getItem('user_id'));
        let params = parseURLParams(window.location.href);
        console.log(JSON.stringify(params))
        to = params.id;
        isCaller = params.is_caller
        msgId = params.msg_id
        this.props.get_user_info_action();
    }

    componentDidMount = () => {
        // this.pageReady();
    }

    async pageReady() {
        localVideo = document.getElementById('localVideo');
        remoteVideo = document.getElementById('remoteVideo');

        var constraints = {
            video: true,
            audio: true,
        };

        if (navigator.mediaDevices.getUserMedia) {
            try {
                navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                    localStream = stream;
                    localVideo.srcObject = stream;
                });
            } catch (err) {
                this.errorHandler(err)
            }
        } else {
            alert('Your browser does not support getUserMedia API');
        }
    }

    gotIceCandidate = (event) => {
        if (event.candidate != null) {
            this.props.send_message_action(null, to, 'ICE', JSON.stringify(event.candidate))
        }
    }

    gotRemoteStream = (event) => {
        remoteVideo.srcObject = event.streams[0];
    }


    start = (isCaller) => {

        peerConnection = new RTCPeerConnection(PEER_CONFIG);
        if ('onicecandidate' in peerConnection) {
            peerConnection.onicecandidate = (event) => this.gotIceCandidate(event);
        }
        if ('ontrack' in peerConnection) {
            peerConnection.ontrack = (event) => this.gotRemoteStream(event);
        }
        peerConnection.addStream(localStream);

        if (isCaller) {
            try {
                peerConnection.createOffer().then((description) => this.createdDescription(description));
            }
            catch (err) {
                this.errorHandler(err);
            }
        }
    }
   
    createdDescription = (description) => {
        peerConnection.setLocalDescription(description).then(() => {
            try {
                this.props.send_message_action(null, to, 'SDP', JSON.stringify(peerConnection.localDescription))
            }
            catch (err) {
                this.errorHandler(err)
            }
        })

    }

    gotMessageFromServer = (message) => {
        if (!peerConnection) this.start(false);

        // Ignore messages from ourself
        if (message.from === from) return;
        if (message.type === 'SDP') {
            try {
                let signal = JSON.parse(message.value)
                peerConnection.setRemoteDescription(new RTCSessionDescription(signal)).then(() => {
                    if (signal.type === 'offer') {
                        try {
                            peerConnection.createAnswer().then((description) => this.createdDescription(description));
                        }
                        catch (err) {
                            this.errorHandler(err)
                        }
                    }
                })
            }
            catch (err) {
                this.errorHandler(err)
            }
        } else if (message.type === 'ICE') {
            try {
                let signal = JSON.parse(message.value)
                peerConnection.addIceCandidate(new RTCIceCandidate(signal));
            }
            catch (err) {
                this.errorHandler(err)
            }
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.connect_status.data) {
            this.pageReady();
            if (isCaller === '1') {
                this.props.send_message_action(null, to, 'CALL', 'make_call');
            }
            else {
                this.props.send_message_action(msgId, to, 'CALL', 'start_call');
            }
        }
        if (nextProps.start_video.data){
            this.start(true)
        }
        if (nextProps.call_signal.data){
            this.gotMessageFromServer(nextProps.call_signal.data)
            this.props.clear_data()
        }
    }


    render() {
        return (
            <div id="video_call">
                <video id="remoteVideo" autoPlay /*srcobject={this.remoteVideo ? this.remoteVideo.srcObject : null}*/></video>
                <video id="localVideo" autoPlay muted /*srcobject={this.localVideo ? this.localVideo.srcObject : null}*/></video>

                {/* <br />

                <input type="button" id="start" onClick={() => this.start(true)} value="Start Video"></input> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        connect_status: state.connect_socket_status_reducer,
        start_video: state.start_video_call_reducer,
        call_signal: state.receive_call_signal_reducer
    }
}

export default connect(mapStateToProps, { clear_data, send_message_action, get_user_info_action })(VoiceVideoCall);