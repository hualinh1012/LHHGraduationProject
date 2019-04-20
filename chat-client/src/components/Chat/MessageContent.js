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
                if (data.value === 'wt'){
                    return (
                        <p>...</p>
                    );
                }    
                break;            
            default:
                return null;
        }

    }
}

export default MessageContent;