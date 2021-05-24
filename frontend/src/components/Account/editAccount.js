import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
import "../../css/createaccount.css";

class EditAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "invalidConfirm": false,
            "errorCount": 0,
            modal: {},
            data: {
                Id: '',
                name: '',
                birthday: '',
                address: '',
                description: ''
            },

            password: '',
            confirmPassword: '',

        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalEditForm" + props.aid;
        modal.applyId = "modalEditApply" + props.aid;
        modal.cancelId = "modalEditCancel" + props.aid;
        return { modal };
    }
    changeHandler = (event) => {
        // console.log(event);
        let temp = this.state
        let newValue = {}
        var name = event.target.name;
        let value = event.target.value;
        newValue[name] = value;
        if (name === "confirmPassword") {
            if (value !== temp["password"]) {
                let errorCount = this.state.errorCount;
                if (this.state.invalidConfirm === false) {
                    this.setState({ "invalidConfirm": true, errorCount: errorCount + 1 });
                }
            } else if (this.state.invalidConfirm === true) {
                this.setState({
                    "invalidConfirm": false,
                    errorCount: this.state.errorCount - 1,
                });
            }
        }
        if (name === "password") {
            if (
                this.state.invalidConfirm === false &&
                temp["confirmPassword"] !== ""
            ) {
                this.setState({
                    "invalidConfirm": true,
                    errorCount: this.state.errorCount + 1,
                });
            } else {
                if (value === temp["confirmPassword"] && this.state.invalidConfirm === true) {
                    this.setState({
                        "invalidConfirm": false,
                        errorCount: this.state.errorCount - 1,
                    });
                }
            }
        }
        this.setState(newValue);
    };

    openForm = async () => {
        try {
            let res = await api.getAccount(this.props.aid);
            if (res.status === 200) {
                console.log(res.data.data)
                this.setState({
                    data: res.data.data,
                    password: '',
                    confirmPassword: '',
                });
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
        if(!this.state.errorCount){
            $('#' + this.state.modal.applyId).modal('show');     
        }

    }

    discardApply = () => {
        $('#' + this.state.modal.applyId).modal('hide');
    }

    acceptApply = async () => {
        try {
 
            let data = {};
            data.password  = this.state.password
            let res = await api.updatePassword(this.props.aid, data);
            if (res.status === 200) {
                // console.log(res.status, res.data);
                $('#' + this.state.modal.applyId).modal('hide');
                $('#' + this.state.modal.formId).modal('hide');
                $('#alert-content').html('Đổi mật khẩu thành công!')
                $('#alert').modal('show')
            } else {
                $('#alert-content').html('Đã xảy ra lỗi, vui lòng thử lại sau!')
                $('#alert').modal('show')
            }
        } catch (e) {
            alert(e);
        }
    }
    submitForm = e => {
        e.preventDefault()
        this.openApply()
    }
    render() {
        var confirmPassword = (
            <div className="row" style={{ marginTop: "14px" }}>
                <div className="col-3" style={{ marginLeft: "auto" }}>
                    <b>
                        Xác nhận mật khẩu (
            <i className="fa fa-asterisk require" aria-hidden="true"></i>):{" "}
                    </b>
                </div>
                <div className="col-6" style={{ marginRight: "auto" }}>
                    <input
                        onChange={(e) => this.changeHandler(e)}
                        type="password"
                        className="form-control"
                        required="required"
                        name="confirmPassword"
                        placeholder="Xác nhận lại mật khẩu"
                        value={this.state.confirmPassword}
                    />
                </div>
            </div>
        );
        var invalidConfirm;
        if (this.state.invalidConfirm === true) {
            invalidConfirm = (
                <div className="row error-notifi">
                    <div className="col-3" style={{ marginLeft: "auto" }}></div>
                    <div
                        className="col-5 register-failed"
                        style={{ marginRight: "auto" }}
                    >
                        Mật khẩu xác nhận phải giống mật khẩu phía trên!
          </div>
                </div>
            );
            confirmPassword = (
                <div className="row" style={{ marginTop: "14px" }}>
                    <div className="col-3" style={{ marginLeft: "auto" }}>
                        <b>
                            Xác nhận mật khẩu (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):{" "}
                        </b>
                    </div>
                    <div className="col-6" style={{ marginRight: "auto" }}>
                        <input
                            onChange={(e) => this.changeHandler(e)}
                            type="password"
                            className="form-control error"
                            required="required"
                            name="confirmPassword"
                            placeholder="Xác nhận lại mật khẩu"
                            value={this.state.confirmPassword}
                        />
                    </div>
                </div>
            );
        }
        return (
            <div>
                <button
                    className="btn btn-warning btn-edit"
                    style={{ marginRight: '8px' }}
                    onClick={this.openForm}
                ><i className="fa fa-edit" ></i>&nbsp; Đổi mật khẩu</button>


                <div className="modal fade" id={this.state.modal.formId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Đổi mật khẩu tài khoản {this.state.data.username}</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <form onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <h4 className="register-heading">
                                        Nhập mật khẩu mới để đổi mật khẩu
                                    </h4>
                                    <div className="row" style={{ marginTop: "24px" }}>
                                        <div className="col-3" style={{ marginLeft: "auto" }}>
                                            <b>
                                                Mật khẩu mới (<i className="fa fa-asterisk require" aria-hidden="true"></i>):
                                            </b>
                                        </div>
                                        <div className="col-6" style={{ marginRight: "auto" }}>
                                            <input
                                                onChange={(e) => this.changeHandler(e)}
                                                type="password"
                                                className="form-control"
                                                required="required"
                                                name="password"
                                                placeholder="Nhập mật khẩu"
                                                value={this.state.password}
                                            />
                                        </div>
                                    </div>
                                    {confirmPassword}
                                    {invalidConfirm}
                                </div>
                                <div className="modal-footer" style={{ marginTop: "48px" }}>
                                    <button type='button' className="btn btn-secondary col-2" onClick={this.openCancel}>Hủy</button>
                                    <button type='submit' className="btn btn-primary col-2" >Đổi mật khẩu</button>
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
                                <p>Bạn có chắc chắn muốn cập nhật nhân viên này không?</p>
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
                            <div className="modal-footer" >
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

export default EditAccount;