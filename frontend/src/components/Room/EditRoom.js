import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
class EditRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {},
            data: {
                "Id": '',
                "name": '',
                "type": '',
                "status": '',
                "maxchild": '',
                "maxadult": '',
                "description": '',
                "price": ''
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        let modal = {}
        modal.formId = "modalEditForm" + props.rid;
        modal.applyId = "modalEditApply" + props.rid;
        modal.cancelId = "modalEditCancel" + props.rid;
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
            let res = await api.getRoom(this.props.rid);
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
            let res = await api.updateRoom(this.props.rid, this.state.data);
            if (res.status === 200) {
                console.log(res.status, res.data);
                $('#' + this.state.modal.applyId).modal('hide');
                $('#' + this.state.modal.formId).modal('hide');
                $('#alert-content').html('C???p ph??ng th??nh c??ng!');
                $('#alert').modal('show');
            } else {
                $('#alert-content').html('C?? l???i x???y ra, vui l??ng th??? l???i sau!');
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
            <div>
                <button
                    className="btn btn-warning btn-edit"
                    style={{ marginRight: '8px' }}
                    onClick={this.openForm}
                ><i className="fa fa-edit" ></i>&nbsp; S???a</button>

                <div className="modal fade" id={this.state.modal.formId} data-keyboard="false" data-backdrop="static">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">S???a th??ng tin ph??ng</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">??</button>
                            </div><div className="container"></div>
                            <form onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>T??n ph??ng</label>
                                        <input name="name" value={this.state.data.name} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nh???p t??n ph??ng" required />
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Lo???i ph??ng</label>
                                            <select name="type" value={this.state.data.type} onChange={this.myChangeHandler} className="form-control" required>
                                                <option value="Standard">Standard</option>
                                                <option value="Deluxe">Deluxe</option>
                                                <option value="Superior">Superior</option>
                                                <option value="Suite">Suite</option>
                                                <option value="Connecting Room">Connecting Room</option>
                                            </select>
                                        </div>
                                        <div className="col form-group">
                                            <label>Tr???ng th??i</label>
                                            <select name="status" value={this.state.data.status} onChange={this.myChangeHandler} className="form-control" required>
                                                <option value="??ang s??? d???ng">??ang s??? d???ng</option>
                                                <option value="???? ?????t tr?????c">???? ?????t tr?????c</option>
                                                <option value="Tr???ng">Tr???ng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label>Gi???i h???n ng?????i l???n</label>
                                            <input name="maxadult" value={this.state.data.maxadult} onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nh???p gi???i h???n ng?????i l???n" min="1" required />
                                        </div>
                                        <div className="col form-group">
                                            <label>Gi???i h???n tr??? em</label>
                                            <input name="maxchild" value={this.state.data.maxchild} onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nh???p gi???i h???n tr??? em" min="0" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Gi?? ph??ng</label>
                                        <input name="price" value={this.state.data.price} onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nh???p gi?? ph??ng" required />
                                    </div>
                                    <div className="form-group">
                                        <label>M?? t???</label>
                                        <textarea name="description" value={this.state.data.description} onChange={this.myChangeHandler} className="form-control" rows="3" placeholder="Nh???p m?? t???" ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary col-2" onClick={this.openCancel}>H???y</button>
                                    <button type="submit" className="btn btn-primary col-2">C???p nh???t</button>
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
                                <p>B???n c?? ch???c ch???n mu???n c???p nh???t ph??ng n??y kh??ng?</p>
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
                            <div className="modal-footer">
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

export default EditRoom;