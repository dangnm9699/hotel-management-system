import "../../css/createaccount.css";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom'
import React from "react";
import api from "../../Api/api";
import Page500 from "../Page500/Page500";
import SearchStaff from './searchStaff'
export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "serverError": false,
            "invalidUsername": false,
            "invalidConfirm": false,
            "registerState": "",
            "errorCount": 0,
            "editorState": "",
            "searchname": '',
            "staffList": [],
            "selectedStaff": -1,
            formData: {
                "username": "",
                "password": "",
                "confirmPassword": "",
                "acctype": "Lễ tân",
            },
        };
    }
    changeSearchHandler = (event) => {
        this.setState({ searchname: event.target.value })
    }
    changeHandler = (event) => {
        console.log(event);
        var name = event.target.name;
        let temp = this.state.formData;
        let value = event.target.value;
        temp[name] = value;
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
        this.setState({ "formData": temp });
    };
    search = async () => {
        this.setState({ modalShow: true, modalLoading: true })
        try {
            const res = await api.searchAllStaffByName(this.state.searchname)
            //console.log(res.data)
            this.setState({ modalLoading: false, staffList: res.data.data, selectedStaff: -1 })
        } catch (err) {
            console.log(err)
            this.setState({ modalShow: false })
        }
    }
    setSelectedStaff = (index) => {
        this.setState({ selectedStaff: index })
    }
    handleCloseModal = () => {
        this.setState({ modalShow: false })
    }
    render() {
        if (this.state.serverError === true) {
            return <Page500 />;
        }
        if (this.state.registerState === "success") {
            return (
                <Redirect
                    to={{ pathname: "/accountmanager", state: { from: 'createstaffaccount' } }}
                ></Redirect>
            );
        }
        var owner = '';
        let selectIndex = this.state.selectedStaff
        if (selectIndex > -1) {
            owner = <div style={{ marginTop: '48px' }}>

                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Tên Nhân viên:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên nhân viên"
                            value={this.state.staffList[selectIndex].name}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Vị trí:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input
                            disabled
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên nhân viên"
                            value={this.state.staffList[selectIndex].role}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Ngày sinh:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input value={new Date(this.state.staffList[selectIndex].birthday).toISOString().slice(0, 10)}  required="required"   disabled  type="date" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Số CMT/CCCD:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input value={this.state.staffList[selectIndex].idNumber} disabled type="number" className="form-control" placeholder="Nhập số CMT/CCCD" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Số điện thoại:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input value={this.state.staffList[selectIndex].phonenumber} disabled type="text" className="form-control" placeholder="Nhập số điện thoại của nhân viên" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Địa chỉ:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input value={this.state.staffList[selectIndex].address} className="form-control"  disabled placeholder='Nhập địa chỉ nhân viên' />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Trạng thái:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <select disabled value={this.state.staffList[selectIndex].status} className="form-control">
                            <option value="Đang làm việc">Đang làm việc</option>
                            <option value="Đã thôi việc">Đã thôi việc</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Mô tả:
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                    <textarea value={this.state.staffList[selectIndex].description} disabled className="form-control" rows="3"></textarea>
                    </div>
                </div>
            </div>
        }
        var invalidUsername,
            invalidConfirm;
        var userName = (
            <div className="row">
                <div className="col-2" style={{ marginLeft: "auto" }}>
                    <b>
                        Tên đăng nhập (
            <i className="fa fa-asterisk require" aria-hidden="true"></i>):
          </b>
                </div>
                <div className="col-4" style={{ marginRight: "auto" }}>
                    <input
                        onChange={(e) => this.changeHandler(e)}
                        type="text"
                        className="form-control"
                        required="required"
                        name="username"
                        placeholder="Nhập tên tài khoản"
                    />
                </div>
            </div>
        );
        var confirmPassword = (
            <div className="row">
                <div className="col-2" style={{ marginLeft: "auto" }}>
                    <b>
                        Xác nhận mật khẩu (
            <i className="fa fa-asterisk require" aria-hidden="true"></i>):{" "}
                    </b>
                </div>
                <div className="col-4" style={{ marginRight: "auto" }}>
                    <input
                        onChange={(e) => this.changeHandler(e)}
                        type="password"
                        className="form-control"
                        required="required"
                        name="confirmPassword"
                        placeholder="Xác nhận lại mật khẩu"
                    />
                </div>
            </div>
        );
        if (this.state.invalidUsername === true) {
            invalidUsername = (
                <div className="row error-notifi">
                    <div
                        className="col-2 failed-register"
                        style={{ marginLeft: "auto" }}
                    ></div>
                    <div
                        className="col-4 register-failed"
                        style={{ marginRight: "auto" }}
                    >
                        Tài khoản đã được sử dụng, vui lòng chọn tài khoản khác!
          </div>
                </div>
            );
            userName = (
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Tên đăng nhập (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):
            </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input
                            onChange={(e) => this.changeHandler(e)}
                            type="text"
                            className="form-control error"
                            required="required"
                            name="username"
                            placeholder="Nhập tên tài khoản"
                        />
                    </div>
                </div>
            );
        }
        if (this.state.invalidConfirm === true) {
            invalidConfirm = (
                <div className="row error-notifi">
                    <div className="col-2" style={{ marginLeft: "auto" }}></div>
                    <div
                        className="col-4 register-failed"
                        style={{ marginRight: "auto" }}
                    >
                        Mật khẩu xác nhận phải giống mật khẩu phía trên!
          </div>
                </div>
            );
            confirmPassword = (
                <div className="row">
                    <div className="col-2" style={{ marginLeft: "auto" }}>
                        <b>
                            Xác nhận mật khẩu (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):{" "}
                        </b>
                    </div>
                    <div className="col-4" style={{ marginRight: "auto" }}>
                        <input
                            onChange={(e) => this.changeHandler(e)}
                            type="password"
                            className="form-control error"
                            required="required"
                            name="confirmPassword"
                            placeholder="Xác nhận lại mật khẩu"
                        />
                    </div>
                </div>
            );
        }


        return (
            <div className="content-container container-fluid">
                <div className="register-form-container">
                    <h1 className="register-heading">
                        Nhập các thông tin để mở tài khoản
          </h1>
                    <form
                        className="register-form"
                        method="post"
                        acceptCharset="UTF-8"
                        action="/register"
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        {userName}
                        {invalidUsername}
                        <div className="row">
                            <div className="col-2" style={{ marginLeft: "auto" }}>
                                <b>
                                    Mật khẩu (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):{" "}
                                </b>
                            </div>
                            <div className="col-4" style={{ marginRight: "auto" }}>
                                <input
                                    onChange={(e) => this.changeHandler(e)}
                                    type="password"
                                    className="form-control"
                                    required="required"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                />
                            </div>
                        </div>
                        {confirmPassword}
                        {invalidConfirm}

                        <div className="row">
                            <div className="col-2" style={{ marginLeft: "auto" }}>
                                <b>Loại tài khoản  (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):</b>
                            </div>
                            <div className="col-4" style={{ marginRight: "auto" }}>
                                <select
                                    onChange={(e) => this.changeHandler(e)}
                                    className="form-control"
                                    name="acctype"
                                    value={this.state.formData.acctype}
                                >
                                    <option value="Lễ tân">Lễ tân</option>
                                    <option value="Quản trị viên">Quản trị viên</option>

                                </select>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '42px' }}>
                            <div className="col-4" style={{ marginLeft: "auto" }}>
                                <h6><b>Bàn giao tài khoản (tuỳ chọn):</b></h6>
                            </div>
                            <div className="col-2" style={{ marginRight: "auto" }}>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4" style={{ marginLeft: "auto" }}>
                                <input type="text" className="form-control" name="searchname" value={this.state.searchname} onChange={this.changeSearchHandler} placeholder="Nhập tên nhân viên để tìm" />
                            </div>
                            <div className="col-1" style={{ marginRight: "auto" }}>
                                <button type='button' className="btn btn-info" onClick={this.search}>Tìm kiếm</button>
                            </div>
                        </div>
                        <SearchStaff
                            setStaff={this.setSelectedStaff}
                            show={this.state.modalShow}
                            handleClose={this.handleCloseModal}
                            loading={this.state.modalLoading}
                            staffList={this.state.staffList}
                        />
                        {owner}
                        <div className="row" style={{marginTop:"36px"}}>
                            <button type="submit" className="btn btn-primary" style={{ 'marginLeft': 'auto', 'marginTop': '24px' }}>
                                <i className="fas fa-check"></i>&nbsp; Tạo tài khoản
                            </button>
                            <Link to='/accountmanager' style={{ marginTop: '24px', marginRight: 'auto', marginLeft: '12px' }}>
                                <button type="button" className="btn btn-danger cancel" >
                                    <i className="fas fa-times" style={{ fontSize: '18px' }}></i> &nbsp;&nbsp;Huỷ
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.errorCount > 0) {
            return;
        }
        // const data = await register()
        let data = this.state.formData;
        delete data.confirmPassword;
        if(this.state.selectedStaff > -1){
            data.NVID = this.state.staffList[this.state.selectedStaff].Id
        }
        try {
            
            var response = await api.register(data);
            if (response.status === 200) {
                this.setState({
                    "registerState": "success",
                });
            }
            if (response.status === 409) {
                this.setState({
                    "invalidUsername": true,
                });
            }
            return;
        } catch (err) {
            this.setState({ serverError: true });
            return;
        }
    };
    componentDidMount() {
        document.title = "MyHotel - Mở tài khoản cho nhân viên";
    }
}
