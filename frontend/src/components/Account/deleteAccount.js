import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class DeleteAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Id: '',
                name: '',
                birthday: '',
                address: '',
                description: ''
            },
        }
    }

    openDeleteForm = async () => {
        try {
            let res = await api.getAccount(this.props.aid);
            if (res.status === 200) {
                let data = res.data.data
                if(data.birthday) {              
                    data.birthday = data.birthday.split("T")[0];
                }
                this.setState({ data: res.data.data });

                $("#modalDeleteForm" + this.props.aid).modal('show');
            } else {
                alert(res.status);
            }
        } catch (e) {
            alert(e);
        }
    }

    cancelDelete = () => {
        $("#modalDeleteForm" + this.props.aid).modal('hide');
    }

    applyDelete = async () => {
        try {
            let res = await api.deleteAccount(this.props.aid);
            if (res.status === 200) {
                console.log(res.status, res.data);
                $("#modalDeleteForm" + this.props.aid).modal('hide');
                $('#alert-content').html('Xoá tài khoản thành công!')
                $('#alert').modal('show')
            } else {
                $('#alert-content').html('Đã xảy ra lỗi, vui lòng thử lại sau!')
                $('#alert').modal('show')
            }
        } catch (e) {
            alert(e);
        }
    }


    render() {
        return (
            <div>
                <button
                    className="btn btn-danger btn-del"
                    onClick={this.openDeleteForm}
                ><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Xoá</button>

                <div className="modal fade" id={"modalDeleteForm" + this.props.aid}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xóa tài khoản</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa tài khoản <b>{this.state.data.username}</b> không?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary col-2" onClick={this.cancelDelete}>Hủy</button>
                                <button className="btn btn-danger btn-del col-2" onClick={this.applyDelete}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteAccount;