import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_history: null,
            conversation_detail: null
        };
    }

    componentWillMount(){
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.conversation_detail.data) {
            switch (nextProps.conversation_detail.data.code) {
                case 0: {
                    this.setState({
                        conversation_detail: nextProps.conversation_detail.data.data
                    });
                    
                    break;
                }
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <div className="messages">
                <ul>
                    <li className="sent">
                        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                        <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!
						</p>
                    </li>
                    <li className="replies">
                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                        <p>Whjhj</p>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        conversation_detail: state.get_conversation_detail_reducer
    }
}

export default connect(mapStateToProps, {})(ChatHistory);