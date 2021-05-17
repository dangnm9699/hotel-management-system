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
                                    <div className="form-group">
                                        <label>Tên nhân viên</label>
                                        <input name="name" type="text" disabled value={this.state.data.name} className="form-control" placeholder="Nhập tên nhân viên" />
                                    </div>
                                    <div className="form-group">
                                        <label>Ngày sinh</label>
                                        <input name="birthday" type="date" disabled value={this.state.data.birthday} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ</label>
                                        <input name="address" type="text" disabled value={this.state.data.address} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea name="description" disabled value={this.state.data.description} className="form-control" rows="3" placeholder="Nhập mô tả"></textarea>
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