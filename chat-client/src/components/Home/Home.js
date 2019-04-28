import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="content">
                <h1 className="welcome">Xin chào, đây là trang chủ</h1>
                <h1 className="welcome">Tạm thời ở đây chưa có gì cả</h1>
            </div>
        );
    }
}

export default Home;