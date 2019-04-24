import React, { Component } from 'react';
import { connect } from 'react-redux';
import { } from '../../actions';

class CallRequestPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        
    }

    componentWillReceiveProps(nextProps) {

    }

    accept_call = (conversation_id, msg_id) => {
        window.open('call?id=' + conversation_id + '&is_caller=0&msg_id=' + msg_id, '_blank', 'toolbar=no,width=1200,height=800');
    }
    
    render() {
        return (
            <div className='popup'>
                <div className='popup_call_request'>
                    <div className="popup_header">
                        <h1>Bạn có cuộc gọi đến</h1>
                    </div>
                    <div className="popup_body">
                        <img src={this.props.message.from_info.avatar_url ? this.props.message.from_info.avatar_url : '/default_ava.png'} alt="" className="online" />
                        <h4>{this.props.message.from_info.user_name} đang gọi đến</h4>
                        <button id="call-accept" onClick={() => {
                            this.accept_call(this.props.message.to, this.props.message.msg_id);
                            this.props.close();
                            }}>Chấp nhận</button>
                        <button id="call-refuse" onClick={this.props.close}>Từ chối</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {  })(CallRequestPopup);