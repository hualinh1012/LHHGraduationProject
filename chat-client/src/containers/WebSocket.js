// import React, { PureComponent } from 'react';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { encode, decode } from 'utf8';
import { SERVER_SOCKET } from '../constant';
import { isLogin, utc_time_local } from '../utils';
import { show_message_action, clear_data, start_video_call_action, connect_socket_status_action } from '../actions';
import CallRequestPopup from '../components/PopUp/CallRequestPopup'

class WebSocketConnect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ws_local: null,
            send_message: '',
            user_info: null,
            show_call_request: false,
            call_request_info: false,
        };
    }

    componentWillMount = () => {
    }

    closeWS = () => {
        const { ws_local } = this.state;
        if (ws_local !== null) {
            ws_local.close();
            this.setState({ ws_local: null });
        }
    }

    initilizeWS = () => {
        const ws = new WebSocket(SERVER_SOCKET);

        const { ws_local } = this.state;
        if (ws_local === null || (!ws_local.readyState && ws_local.readyState !== 1)) {
            ws.onopen = () => {
                const messages = {
                    "type": "AUTH",
                    "value": JSON.parse(localStorage.getItem('token')),
                    "from": JSON.parse(localStorage.getItem('user_id'))
                }
                ws.send(JSON.stringify(messages));
            };
        }

        ws.onmessage = e => {
            console.log(e.data)
            const message = JSON.parse(e.data);
            if (message) {
                switch (message.type) {
                    case "AUTH": {
                        if (message.value === 'success') {
                            this.setState({
                                ws_local: ws
                            })
                            this.props.connect_socket_status_action(true);
                        }
                        break;
                    }
                    case "TEXT":
                    case "FILE": {
                        this.props.show_message_action(message);
                        break;
                    }
                    case "PRC": {
                        this.props.show_message_action(message);
                        break;
                    }
                    case "CALL": {
                        if (message.value === 'start_call' && !message.is_owned) {
                            this.setState({
                                show_call_request: true,
                                call_request_info: message
                            })
                        }
                        else if (message.value === 'make_call' && !message.is_owned) {
                            this.props.start_video_call_action(true)
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }

        ws.onclose = e => {
            console.log("Disconnect socket = ", utc_time_local());
            this.setState({ status_ready: false, disabled: false });
            ws.close();
        };

        ws.onerror = e => {
            console.log('Error socket = ', utc_time_local());
            ws.close();
        }
    }

    componentDidMount = () => {
        try {
            if (isLogin()) {
                this.initilizeWS();
            }
        } catch (error) {
            console.log("Error socket connect = ", error);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { ws_local } = this.state;
        // if (ws_local === null || (!ws_local.readyState && ws_local.readyState !== 1)){
        //     this.initilizeWS();
        // }
        if (nextProps.connect_socket.data) {
            if (nextProps.connect_socket.data.connect === true) {
                this.initilizeWS();
                this.props.clear_data();
            }
            else {
                this.closeWS();
                this.props.clear_data();
            }
        }
        if (nextProps.send_message.data) {
            let message = nextProps.send_message.data;
            message.from_info = this.state.user_info;
            ws_local.send(JSON.stringify(message));
            this.props.clear_data();
        }
        if (nextProps.user_info.data) {
            switch (nextProps.user_info.data.code) {
                case 0:
                    this.setState({
                        user_info: nextProps.user_info.data.data
                    });
                    break;
                default:
                    break;
            }
        }
    }

    decline_call_request() {
        this.setState({
            show_call_request: false, 
            call_request_info: false
        })
    }

    render() {
        const { show_call_request, call_request_info } = this.state;
        if (show_call_request) {
            return (
                <CallRequestPopup message={call_request_info} close={this.decline_call_request.bind(this)}/>
            );
        }
        else {
            return (
                null
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        connect_socket: state.connect_socket_reducer,
        send_message: state.send_message_reducer,
        user_info: state.user_info_reducer
    }
}

export default connect(mapStateToProps, { show_message_action, clear_data, start_video_call_action, connect_socket_status_action })(WebSocketConnect);