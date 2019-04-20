// import React, { PureComponent } from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { encode, decode } from 'utf8';
import { SERVER_SOCKET } from '../constant';
import { isLogin, utc_time_local } from '../utils';
import { send_message_action, show_message_action } from '../actions';

class WebSocketConnect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ws_local: null,
            send_message: '',
            isLogin: isLogin(),
            user_info: false
        };
    }

    componentWillMount = () => {
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
            const { isLogin } = this.state;
            if (isLogin) {
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
        if (nextProps.send_message.data) {
            console.log("my info => "+ this.state.user_info.user_name + " " + this.state.user_info.avatar_url)
            let message = nextProps.send_message.data;
            message.from_info = this.state.user_info;
            ws_local.send(JSON.stringify(message));
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


    render() {
        return (
            null
        );
    }
}

const mapStateToProps = (state) => {
    return {
        send_message: state.send_message_reducer,
        user_info: state.user_info_reducer
    }
}

export default connect(mapStateToProps, { send_message_action, show_message_action })(WebSocketConnect);