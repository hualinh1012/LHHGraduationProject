import React, { Component } from 'react';

class MessageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const data = this.props.message;
        switch (data.type) {
            case "TEXT":
                return (
                    <p>{data.value}</p>
                );
            case "FILE":
                let file_name = data.value.slice(data.value.lastIndexOf("\\") + 1);
                return (
                    <p><i className="fa fa-paperclip attachment" aria-hidden="true"></i> <a href={data.value}>{file_name}</a></p>
                );
            case "PRC":
                if (data.value === 'wt') {
                    return (
                        <p>...</p>
                    );
                }
                break;
            case "CALL":
                if (data.value === 'make_call') {
                    if (data.is_owned) {
                        return (
                            <p className="miss_call"><i className="fa fa-phone" aria-hidden="true"></i> Người kia đã lỡ mất cuộc gọi của bạn</p>
                        );
                    }
                    else {
                        return (
                            <p className="miss_call"><i className="fa fa-phone" aria-hidden="true"></i> {data.from_info.user_name} đã gọi bạn </p>
                        );
                    }
                }
                else if (data.value === 'start_call') {
                    if (data.is_owned) {
                        return (
                            <p className="receive_call"><i className="fa fa-phone" aria-hidden="true"></i> Cuộc gọi thành công</p>
                        );
                    }
                    else {
                        return (
                            <p className="receive_call"><i className="fa fa-phone" aria-hidden="true"></i> Bạn đã nhận cuộc gọi từ {data.from_info.user_name} </p>
                        );
                    }
                }
                break;
            default:
                return null;
        }

    }
}

export default MessageContent;