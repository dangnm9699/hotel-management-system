import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class AddStaff extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                "status": "Đang làm việc",
                "role": "Lễ tân",
            }
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

    acceptApply = async () => {
        try {
            let res = await api.createStaff(this.state.data);
            if (res.status === 200) {
                console.log(res.status, res.data)
                this.setState({
                    data: {
                        "name": '',
                        "birthday": '',
                        'description': '',
                        'phonenumber': '',
                        'address': '',
                        'idNumber': '',
                        "status": "Đang làm việc",
                        "role": "Lễ tân"
                    }
                })
                $('#modalAddApply').modal('hide');
                $('#modalAddForm').modal('hide');
                $('#alert-content').html('Thêm nhân viên mới thành công!')
                $('#alert').modal('show')
            } else {
                $('#alert-content').html('Đã xảy ra lỗi, vui lòng thử lại sau!')
                $('#alert').modal('show')
            }
        } catch (e) {
            alert(e)
        }
    }
    submitForm = e => {
        e.preventDefault()
        this.openApply()
    }
    render() {
        return (
            <div className="add-button-container">
                <button
                    className="btn btn-add btn-success"
                    onClick={this.openForm}
                ><i className="fas fa-plus" aria-hidden="true"></i>&nbsp; Thêm nhân viên</button>


                <div className="modal fade" id="modalAddForm">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm nhân viên</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <form id='add-staff' onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Tên nhân viên</label>
                                        <input value={this.state.data.name}  required="required" name="name" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập tên nhân viên" />
                                    </div>
                                    <div className="form-group">
                                        <label>Vị trí</label>
                                        <select value={this.state.data.role}  required="required" name="role" onChange={this.myChangeHandler} className="form-control">
                                            <option value="Lễ Tân">Lễ Tân</option>
                                            <option value="Quản lý">Quản lý</option>
                                            <option value="Thử việc">Thử việc</option>
                                            <option value="Phục vụ">Phục vụ</option>
                                            <option value="Lao công">Lao công</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <input value={this.state.data.birthday}  required="required" name="birthday" onChange={this.myChangeHandler} type="date" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Số CMT/CCCD</label>
                                        <input value={this.state.data.idNumber}  required="required" name="idNumber" onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nhập số CMT/CCCD" />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input value={this.state.data.phonenumber} required="required" name="phonenumber" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập số điện thoại của nhân viên" />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ</label>
                                        <input value={this.state.data.address}  required="required" name="address" onChange={this.myChangeHandler} type="text" className="form-control" placeholder='Nhập địa chỉ nhân viên' />
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select value={this.state.data.status}  required="required" name="status" onChange={this.myChangeHandler} className="form-control">
                                            <option value="Đang làm việc">Đang làm việc</option>
                                            <option value="Đã thôi việc">Đã thôi việc</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea value={this.state.data.description}  name="description" onChange={this.myChangeHandler} className="form-control" rows="3" placeholder="Nhập mô tả"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary col-2" onClick={this.openCancel}>Hủy</button>
                                    <button type='submit' className="btn btn-primary col-2" >Thêm</button>
                                </div>
                            </form>
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
                                <p>Bạn có chắc chắn muốn thêm nhân viên này không?</p>
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

export default AddStaff;