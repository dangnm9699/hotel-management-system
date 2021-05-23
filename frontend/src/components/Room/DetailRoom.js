import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
class DetailRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {},
            data: {
                Id: '',
                name: '',
                type: '',
                status: '',
                maxchild: '',
                maxadult: '',
                description: '',
                price: ''
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalDetailForm" + props.rid;
        return { modal };
    }

    openForm = async () => {
        try {
            let res = await api.getRoom(this.props.rid)
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
                                <h4 className="modal-title">Chi tiết thông tin phòng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Tên phòng</label>
                                        <input disabled name="name" value={this.state.data.name} type="text" className="form-control" placeholder="Nhập tên phòng" />
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Loại phòng</label>
                                            <select disabled name="type" value={this.state.data.type} className="form-control">
                                                <option value="Standard">Standard</option>
                                                <option value="Deluxe">Deluxe</option>
                                                <option value="Superior">Superior</option>
                                                <option value="Suite">Suite</option>
                                                <option value="Connecting Room">Connecting Room</option>
                                            </select>
                                        </div>
                                        <div className="col form-group">
                                            <label>Trạng thái</label>
                                            <select disabled name="status" value={this.state.data.status} className="form-control">
                                                <option value="Đang sử dụng">Đang sử dụng</option>
                                                <option value="Đã đặt trước">Đã đặt trước</option>
                                                <option value="Trống">Trống</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Giới hạn người lớn</label>
                                            <input disabled name="maxadult" value={this.state.data.maxadult} type="number" className="form-control" placeholder="Nhập giới hạn người lớn" min="1" />
                                        </div>
                                        <div className="col form-group">
                                            <label>Giới hạn trẻ em</label>
                                            <input disabled name="maxchild" value={this.state.data.maxchild} type="number" className="form-control" placeholder="Nhập giới hạn trẻ em" min="0" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Giá phòng</label>
                                        <input disabled name="price" value={this.state.data.price} type="text" className="form-control" placeholder="Nhập giá phòng" />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <textarea disabled name="description" value={this.state.data.description} className="form-control" rows="3" placeholder="Nhập mô tả"></textarea>
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

export default DetailRoom;