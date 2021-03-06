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
                $('#alert-content').html('?????i m???t kh???u th??nh c??ng!')
                $('#alert').modal('show')
            } else {
                $('#alert-content').html('???? x???y ra l???i, vui l??ng th??? l???i sau!')
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
                        X??c nh???n m???t kh???u (
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
                        placeholder="X??c nh???n l???i m???t kh???u"
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
                        M???t kh???u x??c nh???n ph???i gi???ng m???t kh???u ph??a tr??n!
          </div>
                </div>
            );
            confirmPassword = (
                <div className="row" style={{ marginTop: "14px" }}>
                    <div className="col-3" style={{ marginLeft: "auto" }}>
                        <b>
                            X??c nh???n m???t kh???u (
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
                            placeholder="X??c nh???n l???i m???t kh???u"
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
                ><i className="fa fa-edit" ></i>&nbsp; ?????i m???t kh???u</button>


                <div className="modal fade" id={this.state.modal.formId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">?????i m???t kh???u t??i kho???n {this.state.data.username}</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">??</button>
                            </div><div className="container"></div>
                            <form onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <h4 className="register-heading">
                                        Nh???p m???t kh???u m???i ????? ?????i m???t kh???u
                                    </h4>
                                    <div className="row" style={{ marginTop: "24px" }}>
                                        <div className="col-3" style={{ marginLeft: "auto" }}>
                                            <b>
                                                M???t kh???u m???i (<i className="fa fa-asterisk require" aria-hidden="true"></i>):
                                            </b>
                                        </div>
                                        <div className="col-6" style={{ marginRight: "auto" }}>
                                            <input
                                                onChange={(e) => this.changeHandler(e)}
                                                type="password"
                                                className="form-control"
                                                required="required"
                                                name="password"
                                                placeholder="Nh???p m???t kh???u"
                                                value={this.state.password}
                                            />
                                        </div>
                                    </div>
                                    {confirmPassword}
                                    {invalidConfirm}
                                </div>
                                <div className="modal-footer" style={{ marginTop: "48px" }}>
                                    <button type='button' className="btn btn-secondary col-2" onClick={this.openCancel}>H???y</button>
                                    <button type='submit' className="btn btn-primary col-2" >?????i m???t kh???u</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={this.state.modal.applyId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">X??c nh???n</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">??</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>B???n c?? ch???c ch???n mu???n c???p nh???t nh??n vi??n n??y kh??ng?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.discardApply}>Kh??ng</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptApply}>C??</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade zindex-popover" id={this.state.modal.cancelId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">X??c nh???n</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">??</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>B???n c?? ch???c ch???n mu???n h???y c??ng vi???c hi???n t???i kh??ng?</p>
                            </div>
                            <div className="modal-footer" >
                                <button type="button" className="btn btn-secondary" onClick={this.discardCancel}>Kh??ng</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptCancel}>C??</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default EditAccount;