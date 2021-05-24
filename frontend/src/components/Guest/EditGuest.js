import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
class EditGuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {},
            data: {
                "Id": '',
                "name": '',
                "phonenumber": '',
                "email": '',
                "country": '',
                "idNumber": '',
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalEditForm" + props.gid;
        modal.applyId = "modalEditApply" + props.gid;
        modal.cancelId = "modalEditCancel" + props.gid;
        return { modal };
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let data = { ...this.state.data }
        data[nam] = val;
        this.setState({ data })
    }

    openForm = async () => {
        try {
            let res = await api.getGuest(this.props.gid);
            if (res.status === 200) {
                console.log(res.data.data)
                let data = res.data.data
                this.setState({ data });
                $('#' + this.state.modal.formId).modal('show');
            } else {
                alert(res.status);
            }
        } catch (e) {
            alert(e);
        }
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

    acceptApply = async () => {
        try {
            let res = await api.updateGuest(this.props.gid, this.state.data);
            if (res.status === 200) {
                console.log(res.status, res.data);
                $('#' + this.state.modal.applyId).modal('hide');
                $('#' + this.state.modal.formId).modal('hide');
                $('#alert-content').html('Cập khách hàng thành công!');
                $('#alert').modal('show');
            } else {
                $('#alert-content').html('Có lỗi xảy ra, vui lòng thử lại sau!');
                $('#alert').modal('show');
            }
        } catch (e) {
            alert(e);
        } finally {
            await this.props.reloadpage();
        }
    }

    submiForm = (e) => {
        e.preventDefault();
        this.openApply();
    }

    render() {

        return (
            <div>
                <button
                    className="btn btn-warning btn-edit"
                    style={{ marginRight: '8px' }}
                    onClick={this.openForm}
                ><i className="fa fa-edit" ></i>&nbsp; Sửa</button>

                <div className="modal fade" id={this.state.modal.formId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Sửa thông tin khách hàng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <form onSubmit={this.submiForm}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Tên khách hàng</label>
                                        <input name="name" value={this.state.data.name} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập tên khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input name="phonenumber" value={this.state.data.phonenumber} onChange={this.myChangeHandler} type="tel" className="form-control" placeholder="Nhập số điện thoại khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input name="email" value={this.state.data.email} onChange={this.myChangeHandler} type="email" className="form-control" placeholder="Nhập email khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Quốc gia</label>
                                        <input name="country" value={this.state.data.country} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập quốc gia khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Số CMND/CCCD</label>
                                        <input name="idNumber" value={this.state.data.idNumber} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập CMND/CCCD khách hàng" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary col-2" onClick={this.openCancel}>Hủy</button>
                                    <button type="submit" className="btn btn-primary col-2">Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={this.state.modal.applyId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn cập nhật khách hàng này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.discardApply}>Không</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptApply}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade zindex-popover" id={this.state.modal.cancelId} data-keyboard="false" data-backdrop="static">
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

export default EditGuest;