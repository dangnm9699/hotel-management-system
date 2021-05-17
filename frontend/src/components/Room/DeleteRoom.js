import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class DeleteRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Id: '',
                name: '',
                type: '',
                status: '',
                maxchild: '',
                maxadult: '',
                description: '',
                price: ''
            },
        }
    }

    openDeleteForm = async () => {
        try {
            let res = await api.getRoom(this.props.rid);
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
            let res = await api.deleteRoom(this.props.rid)
            if (res.status === 200) {
                console.log(res.status, res.data);
                $('#modalDeleteForm').modal('hide');
                await this.props.reloadpage();
                alert("Xóa phòng thành công");
            } else {
                alert(res.status);
            }
        } catch (e) {
            alert(e)
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
                                <h4 className="modal-title">Xóa phòng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa phòng <b>{this.state.data.name}</b>, <b>#{this.state.data.Id}</b> không?</p>                            </div>
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

export default DeleteRoom;