import React, { Component } from 'react';
import { get_conversation_detail_action, send_message_action, upload_file_action } from '../../actions';
import { connect } from 'react-redux';
import { isLogin } from '../../utils';

class ChatInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_login: isLogin(),
            conversation_detail: '',
            message_content: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.conversation_detail.data) {
            switch (nextProps.conversation_detail.data.code) {
                case 0:
                    this.setState({
                        conversation_detail: nextProps.conversation_detail.data.data
                    });
                    break;

                case 1:
                    this.setState({
                        errorMessage: 'Lỗi không xác định'
                    });
                    break;

                default:
                    this.setState({
                        disabled_btn_login: false,
                        message_error: 'Không thể kết nối tới máy chủ!'
                    });
                    break;
            }
        }
    }

    change_text = (text) => {
        this.setState({
            message_content: text
        })
    }

    handle_key_down = (e) => {
        if (e.keyCode === 13) {
            this.send_text();
        }
    }

    send_text = () => {
        const { message_content, conversation_detail } = this.state;
        if (message_content && message_content.trim() !== '') {
            this.props.send_message_action(conversation_detail.conversation_id, 'TEXT', message_content)
            this.setState({
                message_content: ''
            })
        }
    }

    open_file_selector = () => {
        document.getElementById('file-selector').click();
    }

    send_file = (e) => {
        const { conversation_detail } = this.state;
        let file = e.target.files;
        if (file[0]) {
            upload_file_action(file[0]).then(res => {
                if (res && res.code === 0 && res.data) {
                    const file_id = res.data.file_id;
                    this.props.send_message_action(conversation_detail.conversation_id, 'FILE', file_id)
                }
            })
        }
    }

    render() {
        return (
            <div className="message-input">
                <div className="wrap">
                    <input type="text" placeholder="Write your message..."
                        value={this.state.message_content}
                        onChange={(e) => this.change_text(e.target.value)}
                        onKeyDown={(e) => this.handle_key_down(e)} />
                    <i className="fa fa-paperclip attachment" aria-hidden="true" onClick={(e) => this.open_file_selector()}></i>
                    <input type="file" className="file-selector" id="file-selector" onChange={(e) => this.send_file(e)}></input>
                    <button className="submit" onClick={(e) => this.send_text()}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        conversation_detail: state.get_conversation_detail_reducer
    }
}

export default connect(mapStateToProps, { get_conversation_detail_action, send_message_action, upload_file_action })(ChatInput);