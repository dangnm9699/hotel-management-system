import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class DeleteGuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Id: '',
                name: '',
                phonenumber: '',
                email: '',
                country: '',
                idNumber: '',
            },
        }
    }

    openDeleteForm = async () => {
        try {
            let res = await api.getGuest(this.props.gid);
            if (res.status === 200) {
                console.log(res.data.data);
                this.setState({ data: res.data.data });
                $('#modalDeleteForm').modal('show');
            } else {
                alert(res.status);
            }
        } catch (e) {
            alert(e);
        }
    }

    cancelDelete = () => {
        $('#modalDeleteForm').modal('hide');
    }

    applyDelete = async () => {
        try {
            let res = await api.deleteGuest(this.props.gid);
            if (res.status === 200) {
                console.log(res.status, res.data);
                $('#modalDeleteForm').modal('hide');
                await this.props.reloadpage();
                alert("Xóa khách hàng thành công");
            } else {
                alert(res.status);
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

                <div className="modal fade" id="modalDeleteForm">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xóa khách hàng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa khách hàng <b>{this.state.data.name}</b>, <b>#{this.state.data.Id}</b> không?</p>
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

export default DeleteGuest;