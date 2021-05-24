import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class AddGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                "name": '',
                "phonenumber": '',
                "email": '',
                "country": '',
                "idNumber": ''
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

    openApply = (e) => {
        $('#modalAddApply').modal('show');
    }

    discardApply = () => {
        $('#modalAddApply').modal('hide');
    }

    acceptApply = async () => {
        try {
            let res = await api.createGuest(this.state.data);
            if (res.status === 200) {
                console.log(res.status, res.data)
                this.setState({
                    data: {
                        "name": '',
                        "phonenumber": '',
                        "email": '',
                        "country": '',
                        "idNumber": ''
                    }
                })
                $('#modalAddApply').modal('hide');
                $('#modalAddForm').modal('hide');
                $('#alert-content').html('Thêm khách hàng thành công!');
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

    submitForm = (e) => {
        e.preventDefault();
        this.openApply();
    }

    render() {
        return (
            <div className="add-button-container">
                <button
                    className="btn btn-add btn-success"
                    onClick={this.openForm}
                ><i className="fas fa-plus" aria-hidden="true"></i>&nbsp; Thêm khách hàng</button>

                <div className="modal fade" id="modalAddForm" data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm khách hàng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <form onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Tên khách hàng</label>
                                        <input value={this.state.data.name} name="name" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập tên khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input value={this.state.data.phonenumber} name="phonenumber" onChange={this.myChangeHandler} type="tel" className="form-control" placeholder="Nhập số điện thoại khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={this.state.data.email} name="email" onChange={this.myChangeHandler} type="email" className="form-control" placeholder="Nhập email khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Quốc gia</label>
                                        <input value={this.state.data.country} name="country" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập quốc gia khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Số CMND/CCCD</label>
                                        <input value={this.state.data.idNumber} name="idNumber" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nhập CMND/CCCD khách hàng" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary col-2" onClick={this.openCancel}>Hủy</button>
                                    <button className="btn btn-primary col-2" type="submit">Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modalAddApply" data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn thêm khách hàng này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.discardApply}>Không</button>
                                <button type="button" className="btn btn-primary" onClick={this.acceptApply}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade zindex-popover" id="modalAddCancel" data-keyboard="false" data-backdrop="static">
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

export default AddGuest;