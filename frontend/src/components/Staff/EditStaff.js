import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';

class EditStaff extends React.Component {
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
        modal.formId = "modalEditForm" + props.sid;
        modal.applyId = "modalEditApply" + props.sid;
        modal.cancelId = "modalEditCancel" + props.sid;
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
            let res = await api.updateStaff(this.props.sid, this.state.data);
            if (res.status === 200) {
                // console.log(res.status, res.data);
                $('#' + this.state.modal.applyId).modal('hide');
                $('#' + this.state.modal.formId).modal('hide');
                $('#alert-content').html('C???p nh???t th??ng tin nh??n vi??n th??nh c??ng!')
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
                                <h4 className="modal-title">C???p nh???t th??ng tin nh??n vi??n</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">??</button>
                            </div><div className="container"></div>
                            <form onSubmit={this.submitForm}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>T??n nh??n vi??n</label>
                                        <input value={this.state.data.name} required="required" name="name" onChange={this.myChangeHandler} type="text" className="form-control" placeholder="Nh???p t??n nh??n vi??n" />
                                    </div>
                                    <div className="form-group">
                                        <label>V??? tr??</label>
                                        <select value={this.state.data.role} required="required" name="role" onChange={this.myChangeHandler} className="form-control">
                                            <option value="L??? T??n">L??? T??n</option>
                                            <option value="Qu???n l??">Qu???n l??</option>
                                            <option value="Th??? vi???c">Th??? vi???c</option>
                                            <option value="Ph???c v???">Ph???c v???</option>
                                            <option value="Lao c??ng">Lao c??ng</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Ng??y sinh</label>
                                        <input value={this.state.data.birthday} required="required" name="birthday" onChange={this.myChangeHandler} type="date" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>S??? CMT/CCCD</label>
                                        <input value={this.state.data.idNumber} required="required" name="idNumber" onChange={this.myChangeHandler} type="number" className="form-control" placeholder="Nh???p s??? CMT/CCCD" />
                                    </div>
                                    <div className="form-group">
                                        <label>S??? ??i???n tho???i</label>
                                        <input value={this.state.data.phonenumber} required="required" pattern='((09|03|07|08|05|02)+([0-9]{8})\b)' name="phonenumber" onChange={this.myChangeHandler} type="tel" className="form-control" placeholder="Nh???p s??? ??i???n tho???i c???a nh??n vi??n" />
                                    </div>
                                    <div className="form-group">
                                        <label>?????a ch???</label>
                                        <input value={this.state.data.address} required="required" name="address" onChange={this.myChangeHandler} type="text" className="form-control" placeholder='Nh???p ?????a ch??? nh??n vi??n' />
                                    </div>
                                    <div className="form-group">
                                        <label>Tr???ng th??i</label>
                                        <select value={this.state.data.status} required="required" name="status" onChange={this.myChangeHandler} className="form-control">
                                            <option value="??ang l??m vi???c">??ang l??m vi???c</option>
                                            <option value="???? th??i vi???c">???? th??i vi???c</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>M?? t???</label>
                                        <textarea value={this.state.data.description} name="description" onChange={this.myChangeHandler} className="form-control" rows="3" placeholder="Nh???p m?? t???"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type='button' className="btn btn-secondary col-2" onClick={this.openCancel}>H???y</button>
                                    <button type='submit' className="btn btn-primary col-2" >C???p nh???t</button>
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

export default EditStaff;