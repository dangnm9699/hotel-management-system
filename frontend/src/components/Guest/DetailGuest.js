import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class DetailGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: {},
            data: {
                Id: '',
                name: '',
                phonenumber: '',
                email: '',
                country: '',
                idNumber: ''
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalDetailForm" + props.gid;
        return { modal };
    }

    openForm = async () => {
        try {
            let res = await api.getGuest(this.props.gid)
            if (res.status === 200) {
                console.log(res.data.data)
                this.setState({ data: res.data.data });
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


                <div className="modal fade" id={this.state.modal.formId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Chi tiết khách hàng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tên khách hàng</label>
                                        <input disabled name="name" value={this.state.data.name} type="text" className="form-control" placeholder="Nhập tên khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input disabled name="phonenumber" value={this.state.data.phonenumber} type="tel" className="form-control" placeholder="Nhập số điện thoại khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input disabled name="email" value={this.state.data.email} type="email" className="form-control" placeholder="Nhập email khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Quốc gia</label>
                                        <input disabled name="country" value={this.state.data.country} type="text" className="form-control" placeholder="Nhập quốc gia khách hàng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Số CMND/CCCD</label>
                                        <input disabled name="idNumber" value={this.state.data.idNumber} type="text" className="form-control" placeholder="Nhập CMND/CCCD khách hàng" required />
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

export default DetailGuest;