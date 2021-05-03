import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
class EditRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {},
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

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalEditForm" + props.rid;
        modal.applyId = "modalEditApply" + props.rid;
        modal.cancelId = "modalEditCancel" + props.rid;
        return { modal };
    }

    getRoom = (id) => {
        api.getRoom(id)
            .then(res => {
                console.log(res.data.data)
                let data = res.data.data
                this.setState({ data });
            })
            .catch(e => {
                console.log(e);
            })
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let data = { ...this.state.data }
        data[nam] = val;
        this.setState({ data })
    }

    openForm = () => {
        this.getRoom(this.props.rid)
        $('#' + this.state.modal.formId).modal('show');
    }

    openCancel = () => {
        $('#' + this.state.modal.cancelId).modal('show');
    }

    discardCancel = () => {
        $('#' + this.state.modal.cancelId).modal('hide');
    }

    acceptCancel = () => {
        $('#' + this.state.modal.cancelId).modal('hide');
        $('#' + this.state.modal.formId).modal('hide');
    }

    openApply = () => {
        $('#' + this.state.modal.applyId).modal('show');
    }

    discardApply = () => {
        $('#' + this.state.modal.applyId).modal('hide');
    }

    acceptApply = () => {
        api.updateRoom(this.props.rid, this.state.data)
            .then(res => {
                console.log(res.status, res.data);
                $('#' + this.state.modal.applyId).modal('hide');
                $('#' + this.state.modal.formId).modal('hide');
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {

        return (
            <div>
                <button
                    className="btn btn-warning btn-edit"
                    style={{ marginRight: '8px' }}
                    onClick={this.openForm}
                ><i className="fa fa-edit" ></i>&nbsp; Sửa</button>


                <div className="modal fade" id={this.state.modal.formId}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Sửa thông tin phòng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tên phòng</label>
                                        <input name="name" value={this.state.data.name} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập tên phòng" />
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Loại phòng</label>
                                            <select name="type" value={this.state.data.type} onChange={this.myChangeHandler} className="form-control">
                                                <option value="Phòng thường">Phòng thường</option>
                                                <option value="Phòng đôi">Phòng đôi</option>
                                                <option value="Phòng đơn">Phòng đơn</option>
                                            </select>
                                        </div>
                                        <div className="col form-group">
                                            <label>Trạng thái</label>
                                            <select name="status" value={this.state.data.status} onChange={this.myChangeHandler} className="form-control">
                                                <option value="Đang sử dụng">Đang sử dụng</option>
                                                <option value="Đang trống">Đang trống</option>
                                                <option value="Đang bảo trì">Đang bảo trì</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Giới hạn người lớn</label>
                                            <input name="maxadult" value={this.state.data.maxadult} onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nhập giới hạn người lớn" min="1" />
                                        </div>
                                        <div className="col form-group">
                                            <label>Giới hạn trẻ em</label>
                                            <input name="maxchild" value={this.state.data.maxchild} onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nhập giới hạn trẻ em" min="0" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Giá phòng</label>
                                        <input name="price" value={this.state.data.price} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập giá phòng" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea name="description" value={this.state.data.description} onChange={this.myChangeHandler} className="form-control" rows="3" placeholder="Nhập mô tả"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary col-2" onClick={this.openCancel}>Hủy</button>
                                <button className="btn btn-primary col-2" onClick={this.openApply}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={this.state.modal.applyId} data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn cập nhật phòng này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.discardApply}>Không</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptApply}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade zindex-popover" id={this.state.modal.cancelId} data-backdrop="static">
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

export default EditRoom;