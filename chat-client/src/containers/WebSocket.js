import React, { PureComponent } from 'react';
import { SERVER_SOCKET } from '../constant';
import { isLogin, utc_time_local } from '../utils';

let ws_local = false;

class WebSocketConnect extends PureComponent {
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
            if (isLogin()) {

                const ws = new WebSocket(SERVER_SOCKET);
                
                if (!ws_local.readyState && ws_local.readyState !== 1) {
                    ws.onopen = () => {
                        const messages = {
                            "type": "AUTH",
                            "value": JSON.parse(localStorage.getItem('token')),
                            "from": JSON.parse(localStorage.getItem('user_id'))
                        }
                        ws.send(JSON.stringify(messages)); 
                    };
                }
                
                // console.log("dsfgsdfg")
                // ws.onmessage = e => {
                //     try {
                //         console.log("dsfgsdfg")
                //         const result_socket = JSON.parse(e.data);
                //         /**
                //          * AUTH
                //          */
                //         if (result_socket.msg_type === "AUTH") {
                //             if (result_socket.value === "success") {
                //                 this.setState({
                //                     ready_state: 1
                //                 })
                //                 ws_local = ws;
                //             }
                //         }
                //     } catch (error) {
                //         console.log("Error socket connect!!");
                //     }
                // };

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
        } catch (error) {
            console.log("Error socket connect = ", error);
        }
    }


    render() {
        return (
            <div></div>
        );
    }
}

export default WebSocketConnect;