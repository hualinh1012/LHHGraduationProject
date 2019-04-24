import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clear_data, get_group_conversation_detail_action, change_group_conversation_name_action, change_group_conversation_avatar_action, upload_file_action } from '../../actions'

class GroupInfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_info: false,
            edit: false,
            new_group_name: ''
        };
    }

    componentWillMount() {
        this.props.get_group_conversation_detail_action(this.props.conversation_id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.group_detail.data) {
            switch (nextProps.group_detail.data.code) {
                case 0:
                    this.setState({
                        group_info: nextProps.group_detail.data.data
                    })
                    break;
                default:
                    break;
            }
        }
    }

    on_change_group_name(text) {
        if (text !== ''){
            this.setState({
                new_group_name: text
            })
        }
    }

    change_group_name = () => {
        const { edit, group_info, new_group_name } = this.state;
        this.setState({ 
            edit: !edit 
        });
        this.props.change_group_conversation_name_action(group_info.conversation_id, new_group_name);
    }

    change_group_avatar = (e) => {
        const { group_info } = this.state;
        let file = e.target.files;
        if (file[0]) {
            upload_file_action(file[0]).then(res => {
                if (res && res.code === 0 && res.data) {
                    const file_id = res.data.file_id;
                    this.props.change_group_conversation_avatar_action(group_info.conversation_id, file_id)
                }
            })
        }
    }

    choose_new_avatar = () => {
        document.getElementById('group-avatar-selector').click();
    }

    render() {
        const { edit, group_info } = this.state;
        if (!group_info) {
            return null;
        }
        return (
            <div className='popup'>
                <div className='popup_group_info'>
                    <div className="popup_header">
                        <h1>Thông tin nhóm</h1>
                        <label className="close"><i className="fa fa-times" aria-hidden="true" onClick={this.props.close}></i></label>
                    </div>
                    <div className="popup_body">
                        <div className="avatar">
                            <img id="group_avatar" src={group_info.avatar_url ? group_info.avatar_url : '/default-group-avatar.png'} alt="" />
                            <div id="edit_group_avatar"onClick={(e) => this.choose_new_avatar()}>
                                <span id="edit_group_avatar_img"><i className="fa fa-pencil" aria-hidden="true" /></span>
                                <span id="edit_group_avatar_label">edit</span>
                            </div>
                            <input type="file" id="group-avatar-selector" onChange={(e) => this.change_group_avatar(e)}></input>
                        </div>
                        {edit === true ?
                            <div id="edit_group">
                                <input type="text" defaultValue={group_info.conversation_name ? group_info.conversation_name : "Nhóm không tên"}
                                onChange={(e) => this.on_change_group_name(e.target.value)}></input>
                                <label><i className="fa fa-check" aria-hidden="true" onClick={(e) => this.change_group_name()}></i></label>
                            </div>
                            :
                            <div id="group_info">
                                <input type="text" defaultValue={group_info.conversation_name ? group_info.conversation_name : "Nhóm không tên"} disabled></input>
                                <label><i className="fa fa-pencil" aria-hidden="true" onClick={(e) => {
                                    this.setState({ edit: !edit });
                                }}></i></label>
                            </div>
                        }
                        <h3>Thành viên trong nhóm</h3>
                        <ul className="group_member">
                            {group_info.lst_user.map((item) => {
                                return (
                                    <li key={item.user_id}>
                                        <img src={item.avatar_url ? item.avatar_url : '/default_ava.png'} alt="" className="online" />
                                        <p className="name">{item.user_name}</p>
                                        {/* <input type="checkbox" className="choose_contact" onChange={(e) => this.choose_contact(e, item.friend_id)}></input> */}
                                    </li>
                                )
                            })}
                        </ul>
                        {/* <div className="info">
                            <div className="i-row-info">
                                <label className="i-row-label">Tên người dùng:</label>
                                <label className="i-row-label">{friend_info.user_name}</label>
                            </div>
                            <div className="i-row-info">
                                <label className="i-row-label">Ngày sinh:</label>
                                <label className="i-row-label">{friend_info.dob}</label>
                            </div>
                            <div className="i-row-info">
                                <label className="i-row-label">Giới tính:</label>
                                <label className="i-row-label">{gender}</label>
                            </div>
                            <div className="i-row-info">
                                <label className="i-row-label">Số điện thoại:</label>
                                <label className="i-row-label">{friend_info.phone_number}</label>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        group_detail: state.get_group_conversation_detail_reducer
    }
}

export default connect(mapStateToProps, { clear_data, get_group_conversation_detail_action, change_group_conversation_name_action, change_group_conversation_avatar_action, upload_file_action })(GroupInfoPopup);