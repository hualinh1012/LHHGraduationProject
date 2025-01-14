import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search_contact_action, get_list_contact_action, get_list_conversation_action, clear_data } from '../../actions';
import SideBarList from './SideBarList';

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isListConversation: true,
            listElement: []
        };
    }

    componentWillMount() {
        this.timer = null;
        this.props.get_list_conversation_action();
    }

    on_submit(event) {
        event.preventDefault();
    }

    on_change_text(text) {
        clearTimeout(this.timer);
        this.setState({ text });
        this.timer = setTimeout(() => this.trigger_change(), 500);
    }

    handle_keydown(e) {
        if (e.keyCode === 13) {
            this.trigger_change();
        }
    }

    trigger_change() {
        const { text } = this.state;
        this.props.search_contact_action(text);
    }

    get_list_contact() {
        this.props.get_list_contact_action();
    }

    get_list_conversation() {
        this.props.get_list_conversation_action();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list_conversation.data) {
            switch (nextProps.list_conversation.data.code) {
                case 0: {
                    this.setState({
                        isListConversation: true,
                        listElement: nextProps.list_conversation.data.data
                    })
                    this.props.clear_data();
                    break;
                }
                default: {
                    break;
                }
            }
        }
        else if (nextProps.list_contact.data) {
            switch (nextProps.list_contact.data.code) {
                case 0: {
                    this.setState({
                        isListConversation: false,
                        listElement: nextProps.list_contact.data.data
                    })
                    this.props.clear_data();   
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    render() {
        return (
            <div>
                <div id="search">
                    <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                    <input name="search_bar" type="text" placeholder="Tìm kiếm bạn bè..."
                        onChange={(e) => this.on_change_text(e.target.value)}
                        onKeyDown={(e) => this.handle_keydown(e)}
                    />
                </div>
                <div id="top-bar">
                    <button id="addcontact" onClick={() => this.get_list_conversation()}>
                        <i className="fa fa-weixin" aria-hidden="true"></i>
                        <span>Tin nhắn</span>
                    </button>
                    <button id="settings" onClick={() => this.get_list_contact()}>
                        <i className="fa fa-address-book-o" aria-hidden="true"></i>
                        <span>Danh bạ</span>
                    </button>
                </div>
                <div id="contacts" className="expanded">
                    <SideBarList isListConversation={this.state.isListConversation} listElement={this.state.listElement} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list_contact: state.list_contact_reducer,
        list_conversation: state.list_conversation_reducer
    }
}

export default connect(mapStateToProps, { search_contact_action, get_list_contact_action, get_list_conversation_action, clear_data })(SideBar);