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
    openDeleteForm = () => {
        $('#modalDeleteForm').modal('show');
        this.getRoom(this.props.rid);
    }

    cancelDelete = () => {
        $('#modalDeleteForm').modal('hide');
    }

    applyDelete = () => {
        api.deleteRoom(this.props.rid)
            .then(res => {
                console.log(res.status, res.data);
                $('#modalDeleteForm').modal('hide');
            })
            .catch(e => {
                console.log(e)
            })
    }

    getRoom = (id) => {
        api.getRoom(id)
            .then(res => {
                console.log(res.data.data)
                this.setState({ data: res.data.data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        let content = <p>Bạn có chắc chắn muốn xóa phòng <b>{this.state.data.name}</b>, <b>#{this.state.data.Id}</b> không?</p>
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
                                {content}
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

export default DeleteRoom;