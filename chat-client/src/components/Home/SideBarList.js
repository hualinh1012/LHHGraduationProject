import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isLogin } from '../../utils';
import Contact from './Contact';
import Conversation from './Conversation';
import CreateConversationPopup from '../PopUp/CreateConversationPopup'

class SideBarList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    toggleCreateConversationPopup() {
        this.setState({
            create_conversation_popup: !this.state.create_conversation_popup
        });
    }

    render() {
        if (!isLogin()) {
            return (<Redirect to='/' />);
        }
        const data = this.props.listElement;
        if (this.props.isListConversation) {
            return (
                <div>
                    <div className="conversation-option">
                        <span>Sắp xếp theo: </span>
                        <select>
                            <option value="1">Thời gian</option>
                            <option value="2">Chưa đọc</option>
                        </select>
                        <button onClick={this.toggleCreateConversationPopup.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i> Trò chuyện</button>
                    </div>
                    <Conversation data={data} />
                    {this.state.create_conversation_popup ?
                        <CreateConversationPopup close={this.toggleCreateConversationPopup.bind(this)} /> : null
                    }
                </div>
            );
        }
        else {
            return (
                <Contact data={data} />
            );
        }
    }
}


export default SideBarList;