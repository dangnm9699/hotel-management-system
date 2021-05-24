import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class DeleteStaff extends React.Component {
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
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalDeleteForm" + props.sid;
        return { modal };
    }

    openDeleteForm = async () => {
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

    cancelDelete = () => {
        $('#' + this.state.modal.formId).modal('hide');
    }

    applyDelete = async () => {
        let content = '';

        try {
            let res = await api.deleteStaff(this.props.sid);
            if (res.status === 200) {
                console.log(res.status, res.data);
                $('#' + this.state.modal.formId).modal('hide');
                content = 'Xóa nhân viên thành công!';
            } else {
                content = 'Có lỗi xảy ra, vui lòng thử lại sau!';
            }
        } catch (e) {
            content = 'Sập chưa, chưa sập à, sắp sập rồi đấy!'
        } finally {
            $('#alert-content').html(content);
            $('#alert').modal('show');
            await this.props.reloadpage();
        }
    }


    render() {
        return (
            <div>
                <button
                    className="btn btn-danger btn-del"
                    onClick={this.openDeleteForm}
                ><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Xoá</button>

                <div className="modal fade" id={this.state.modal.formId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xóa nhân viên</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa nhân viên <strong>{this.state.data.name}</strong> không?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary col-2" onClick={this.cancelDelete}>Hủy</button>
                                <button className="btn btn-danger btn-del col-2" onClick={this.applyDelete}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteStaff;