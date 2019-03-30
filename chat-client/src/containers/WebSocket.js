import React, { Component } from 'react';
import { SERVER_SOCKET } from '../constant';
import { isLogin } from '../utils';

let ws_local = false;

class WebSocket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready_state: false
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        try {
            const { ready_state } = this.state
            if (isLogin()) {
                console.log("conectttt")
                const ws = new WebSocket(SERVER_SOCKET);
                console.log("done")
                if (ready_state !== 1)
                    ws.onopen = () => {
                        // console.log("Its connected");
                        const messages = {
                            "msg_type": "AUTH",
                            "value": JSON.parse(localStorage.getItem('token')),
                            "from": JSON.parse(localStorage.getItem('user_id'))
                        }
                        // console.log('CLIENT SEND AUTH = ', JSON.stringify(messages));
                        ws.send(JSON.stringify(messages)); // send a message
                    };

                ws.onmessage = e => {
                    try {
                        const result_socket = JSON.parse(e.data);
                        /**
                         * AUTH
                         */
                        if (result_socket.msg_type === "AUTH") {
                            if (result_socket.value === "success") {
                                this.setState({
                                    ready_state: 1
                                })
                                ws_local = ws;
                            }
                        }
                    } catch (error) {
                        console.warn("Error socket connect!!");
                    }
                };
            }
        } catch (error) {
            console.warn("Error socket connect = ", error);
        }
    }


    render() {
        return (
            <div></div>
        );
    }
}

export default WebSocket;