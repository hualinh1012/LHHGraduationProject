import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clear_data, search_contact_action } from '../../actions';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.searchContact = this.searchContact.bind(this);
    }

    componentWillMount() {
        this.timer = null;
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

    searchContact = (event) => {
        var value = event.target.value; 
        this.props.search_contact_action(value);
    }


    render() {
        return (
            <div id="search">
                <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                <input name="search_bar" type="text" placeholder="Tìm kiếm bạn bè..."
                    onChange={(e) => this.on_change_text(e.target.value)}
                    onKeyDown={(e) => this.handle_keydown(e)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, { search_contact_action, clear_data })(Search);
