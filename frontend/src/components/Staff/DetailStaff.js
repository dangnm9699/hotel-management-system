import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class DetailStaff extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: {},
            data: {
                Id: '',
                name: '',
                birthday: '',
                address: '',
                description: ''
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalDetailForm" + props.sid;
        return { modal };
    }

    openForm = async () => {
        try {
            let res = await api.getStaff(this.props.sid);
            if (res.status === 200) {
                console.log(res.data.data)
                this.setState({ data: res.data.data });
                let data = { ...this.state.data }
                data.birthday = data.birthday.split("T")[0];
                this.setState({ data })
                $('#' + this.state.modal.formId).modal('show');
            } else {
                alert(res.status);
            }
        } catch (e) {
            alert(e);
        }
    }

    closeForm = () => {
        $('#' + this.state.modal.formId).modal('hide');
    }

    render() {
        return (
            <div>
                <button
                    style={{ marginRight: '8px' }}
                    className="btn btn-detail"
                    onClick={this.openForm}
                ><i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp; Chi tiết</button>


                <div className="modal fade" id={this.state.modal.formId}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Chi tiết nhân viên</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <form id="myform" onSubmit={this.openApply}>
                                    <label>Tên nhân viên</label>
                                    <div>
                                        <input value={this.state.data.name} disabled required="required" name="name" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập tên nhân viên" />
                                    </div>
                                    <div className="form-group">
                                        <label>Vị trí</label>
                                        <select value={this.state.data.role} disabled required="required" name="role" onChange={this.myChangeHandler} className="form-control">
                                            <option value="Lễ Tân">Lễ Tân</option>
                                            <option value="Quản lý">Quản lý</option>
                                            <option value="Thử việc">Thử việc</option>
                                            <option value="Phục vụ">Phục vụ</option>
                                            <option value="Lao công">Lao công</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <input value={this.state.data.birthday}  disabled required="required" name="birthday" onChange={this.myChangeHandler} type="date" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Số CMT/CCCD</label>
                                        <input value={this.state.data.idNumber}  disabled required="required" name="idNumber" onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nhập số CMT/CCCD" />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input value={this.state.data.phonenumber} disabled required="required" name="phonenumber" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập số điện thoại của nhân viên" />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ</label>
                                        <input value={this.state.data.address} disabled required="required" name="address" onChange={this.myChangeHandler} type="text" className="form-control" placeholder='Nhập địa chỉ nhân viên' />
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select value={this.state.data.status} disabled required="required" name="status" onChange={this.myChangeHandler} className="form-control">
                                            <option value="Đang làm việc">Đang làm việc</option>
                                            <option value="Đã thôi việc">Đã thôi việc</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea value={this.state.data.description} disabled name="description" onChange={this.myChangeHandler} className="form-control" rows="3"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary col-2" onClick={this.closeForm}>Thoát</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default DetailStaff;