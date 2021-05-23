import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import api from '../../Api/api';
import './../../css/searchguestmodal.css'
// import QuickBookingContext from '../../context/QuickBookingContext'

function formatDate(date) {
    date = new Date(date)
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;

}

class SearchStaff extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedStaff: -1,
        }
    }

    selectStaff = (id) => {
        this.setState({ selectedStaff: id })
    }

    select = () => {
        this.props.setStaff(this.state.selectedStaff)
        this.props.handleClose()
    }

    render() {
        let body = [];
        if (this.props.loading === true) {
            body = (
                <div className="d-flex justify-content-center text-primary">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            let StaffList = this.props.staffList
            for (let i = 0; i < StaffList.length; i++) {
                body.push(<div className={"row pt-2 pb-2 guest-modal-row" + (i === this.state.selectedStaff ? " guest-selected" : "")} onClick={() => this.selectStaff(i)} key={StaffList[i].Id} >
                    <div className="col"> {StaffList[i].name} </div>
                    <div className="col"> {StaffList[i].role} </div>
                    <div className="col"> {formatDate(StaffList[i].birthday)} </div>
                </div>)
            }
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} size="lg" scrollable={true} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Kết quả tìm kiếm</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row">
                        <div className="col"><b>Tên nhân viên</b></div>
                        <div className="col"><b>Vị trí</b></div>
                        <div className="col"><b>Ngày sinh</b></div>
                    </div>
                    <hr />
                    <div className="container-fluid">
                        {body}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={this.select}>
                        Chọn
                    </Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

// StaffInformation.contextType = QuickBookingContext

export default SearchStaff