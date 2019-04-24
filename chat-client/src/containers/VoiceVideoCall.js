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
        this.pageReady();
    }

    pageReady = () => {
        localVideo = document.getElementById('localVideo');
        remoteVideo = document.getElementById('remoteVideo');
        // serverConnection = new WebSocket(MEDIA_SOCKET);
        // serverConnection.onmessage = (event) => this.gotMessageFromServer(event);

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
            // serverConnection.send(JSON.stringify({ 'ice': event.candidate, 'uuid': uuid }));
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

    gotMessageFromServer = (message) => {
        if (!peerConnection) this.start(false);

        var signal = JSON.parse(message.data);

        // Ignore messages from ourself
        if (signal.uuid === from) return;

        if (signal.sdp) {
            try {
                peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
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
        } else if (signal.ice) {
            try {
                peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
            }
            catch (err) {
                this.errorHandler(err)
            }
        }
    }

    createdDescription = (description) => {
        peerConnection.setLocalDescription(description).then(() => {
            try {
                this.props.send_message_action(null, to, 'SDP', JSON.stringify(peerConnection.localDescription))
                // serverConnection.send(JSON.stringify({ 'sdp': peerConnection.localDescription, 'uuid': from }));
            }
            catch (err) {
                this.errorHandler(err)
            }
        })

    }

    componentWillReceiveProps(nextProps) {
        console.log(isCaller)
        if (nextProps.connect_status.data) {
            if (isCaller === '1') {
                console.log("callerrrrrrrrrr")
                this.props.send_message_action(null, to, 'CALL', 'start_call');
            }
            else {
                console.log("receiverrrrrrrr")
                this.props.send_message_action(msgId, to, 'CALL', 'make_call');
            }
        }
        if (nextProps.start_video.data){
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // this.gotMessageFromServer()
        }
    }


    render() {
        return (
            <div id="video_call">
                <video id="localVideo" autoPlay muted /*srcobject={this.localVideo ? this.localVideo.srcObject : null}*/></video>
                <video id="remoteVideo" autoPlay /*srcobject={this.remoteVideo ? this.remoteVideo.srcObject : null}*/></video>

                {/* <br />

                <input type="button" id="start" onClick={() => this.start(true)} value="Start Video"></input> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        connect_status: state.connect_socket_status_reducer,
        start_video: state.start_video_call_reducer
    }
}

export default connect(mapStateToProps, { clear_data, send_message_action, get_user_info_action })(VoiceVideoCall);