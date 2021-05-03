import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
import '../../css/listroom.css'

class AddRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                status: "Đang sử dụng",
                type: "Phòng thường"
            },
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let data = { ...this.state.data }
        data[nam] = val;
        this.setState({ data })
    }

    openForm = () => {
        $('#modalAddForm').modal('show');
    }

    openCancel = () => {
        $('#modalAddCancel').modal('show');
    }

    discardCancel = () => {
        $('#modalAddCancel').modal('hide');
    }

    acceptCancel = () => {
        $('#modalAddCancel').modal('hide');
        $('#modalAddForm').modal('hide');
    }

    openApply = () => {
        $('#modalAddApply').modal('show');
    }

    discardApply = () => {
        $('#modalAddApply').modal('hide');
    }

    acceptApply = () => {
        api.createRoom(this.state.data)
            .then(res => {
                console.log(res.status, res.data)
                this.setState({ data: {} })
                $('#modalAddApply').modal('hide');
                $('#modalAddForm').modal('hide');
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {

        return (
            <div className="add-button-container">
                <button
                    className="btn btn-add btn-success"
                    onClick={this.openForm}
                ><i className="fas fa-plus" aria-hidden="true"></i>&nbsp; Thêm phòng mới</button>


                <div className="modal fade" id="modalAddForm">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm phòng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tên phòng</label>
                                        <input name="name" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập tên phòng" />
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Loại phòng</label>
                                            <select name="type" onChange={this.myChangeHandler} className="form-control">
                                                <option value="Phòng thường">Phòng thường</option>
                                                <option value="Phòng đôi">Phòng đôi</option>
                                                <option value="Phòng đơn">Phòng đơn</option>
                                            </select>
                                        </div>
                                        <div className="col form-group">
                                            <label>Trạng thái</label>
                                            <select name="status" onChange={this.myChangeHandler} className="form-control">
                                                <option value="Đang sử dụng">Đang sử dụng</option>
                                                <option value="Đang trống">Đang trống</option>
                                                <option value="Đang bảo trì">Đang bảo trì</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Giới hạn người lớn</label>
                                            <input name="maxadult" onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nhập giới hạn người lớn" min="1" />
                                        </div>
                                        <div className="col form-group">
                                            <label>Giới hạn trẻ em</label>
                                            <input name="maxchild" onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nhập giới hạn trẻ em" min="0" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Giá phòng</label>
                                        <input name="price" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập giá phòng" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea name="description" onChange={this.myChangeHandler} className="form-control" rows="3" placeholder="Nhập mô tả"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary col-2" onClick={this.openCancel}>Hủy</button>
                                <button className="btn btn-primary col-2" onClick={this.openApply}>Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalAddApply" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn thêm phòng này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.discardApply}>Không</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptApply}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade zindex-popover" id="modalAddCancel" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn hủy công việc hiện tại không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.discardCancel}>Không</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptCancel}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default AddRoom;