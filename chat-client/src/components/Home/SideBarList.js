import React, { Component } from 'react';
import Contact from './Contact';

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
                <ul>
                    {data.map(function (d, idx) {
                        return (
                            <li className="message">
                                <div className="wrap">
                                    <span className="contact-status online"></span>
                                    <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                    <div className="meta">
                                        <p className="name">Louis Litt</p>
                                        <p className="preview">123123</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
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