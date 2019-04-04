import React, { Component } from 'react';
import Contact from './Contact';
import Conversation from './Conversation';

class SideBarList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const data = this.props.listElement;
        if (this.props.isListConversation) {
            return (
                <Conversation data={data}/>
            );
        }
        else {
            return (
                <Contact data={data}/>
            );
        }
    }
}


export default SideBarList;