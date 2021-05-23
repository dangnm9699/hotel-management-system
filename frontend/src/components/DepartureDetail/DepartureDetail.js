import React from 'react';
import api from '../../Api/api';
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'


class DepartureDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Nguyễn Thế Đức',
            resid: '1234567',
            folio: '1234567',
            nightStay: 1,
            arrivingAt: new Date(),
            leavingAt: new Date(),
            adult: 2,
            children: 2,
            phonenumber: "0123456789",
            email: "ntd275@gmail.com",
            idnumber: "123456789",
            country: "Vietnam",
            totalchange: 1000000,
            totalcredits: 1000000,
            balance: 1000000,
            roomchanges: 1000000,
            tax: 0,
            extrachanges: 0,
            amountpaid: 0,
            discount: 0,
            reservatio: "Confirm booking",
            loading: true,
            modalShow: false,
            message: "",
            modalLoading: false,
        }
    }

    async componentDidMount() {
        try {
            let id = this.props.match.params.id
            //console.log(this.props, id)
            let res = await api.getOrder(id)

            //console.log(res.data)

            let totalChildCount = (room) => {
                let total = 0;
                for (let i = 0; i < room.length; i++) {
                    total += room[i].numChild
                }
                return total
            }
            let totalAdultCount = (room) => {
                let total = 0;
                for (let i = 0; i < room.length; i++) {
                    total += room[i].numAdult
                }
                return total
            }
            res = res.data
            //console.log(res)
            this.setState({
                loading: false,
                name: res.data.Khach.name,
                resid: res.data.Khach.Id,
                folio: res.data.order.Id,
                nightStay: res.data.order.numday,
                arrivingAt: new Date(res.data.order.checkinTime),
                leavingAt: new Date(res.data.order.checkoutTime),
                adult: totalAdultCount(res.data.rooms),
                children: totalChildCount(res.data.rooms),
                phonenumber: res.data.Khach.phonenumber,
                email: res.data.Khach.email,
                idnumber: res.data.Khach.idNumber,
                country: res.data.Khach.country,
                totalchange: res.data.order.cost,
                totalcredits: 0,
                balance: res.data.order.cost - res.data.order.paid,
                roomchanges: res.data.order.cost,
                tax: 0,
                extrachanges: 0,
                amountpaid: res.data.order.paid,
                discount: 0,
                reservatio: res.data.order.type === "confirm" ? "Xác nhận" : "Giữ phòng",
                room: res.data.rooms

            })
        } catch (err) {
            console.log(err)
        }
    }

    getRoomList = () => {
        let roomList = this.state.room
        let list = [];
        for (let i = 0; i < roomList.length; i++) {
            list.push(
                <tr key={i}>
                    <td>{roomList[i].name}</td>
                    <td>{roomList[i].type}</td>
                    <td>{roomList[i].numAdult}</td>
                    <td>{roomList[i].numChild}</td>
                    <td>{this.formatMoney(roomList[i].price * this.state.nightStay)}</td>

                </tr>
            )
        }
        return list
    }

    checkout = async () => {
        this.setState({ modalLoading: true })
        try {
            await api.checkout(this.state.folio)
            this.setState({
                modalShow: true,
                message: "Checkout thành công",
                modalLoading: false,
            })
        } catch (err) {
            this.setState({
                modalShow: true,
                message: err.data.data.toString(),
                modalLoading: false,
            })
            console.log(err)
        }
    }

    formatMoney = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
    }

    hideModal = () => {
        this.setState({ modalShow: false })
        this.props.history.push('/checkout')
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container-fluid d-flex justify-content-center">
                    <div className="d-flex justify-content-center text-primary mt-auto mb-auto">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div >
            )
        }
        return (
            <div className="container-fluid" >
                <Notification show={this.state.modalShow} message={this.state.message} hideNotification={this.hideModal} />
                <Loading show={this.state.modalLoading} />
                <div className="row mt-3">
                    <div className="col-6 h4">
                        Danh sách khách đi {this.props.location.state.from && "- " + this.props.location.state.from}
                    </div>
                    <div className="col-2 ml-auto">
                        <button type="button" className="btn btn-primary" onClick={this.checkout}> Check Out</button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3 ml-3">
                        {this.state.name}
                    </div>
                    <div className="col">
                        <div>ResID</div>
                        <div>
                            {this.state.resid}
                        </div>
                    </div>
                    <div className="col">
                        <div>FolioID</div>
                        <div>
                            {this.state.folio}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Thông tin chung
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <div className="h5">
                            Giờ đến:
                        </div>
                        <div>
                            {this.state.arrivingAt.toDateString()}
                        </div>
                    </div>
                    <div className="col text-center">
                        <div className="h5">
                            Giờ đi:
                        </div>
                        <div>
                            {this.state.leavingAt.toDateString()}
                        </div>
                    </div>
                    <div className="col text-center">
                        <div className="h5">
                            Ngày đêm
                        </div>
                        <div>
                            {this.state.nightStay}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Thông tin khách hàng
                    </div>
                </div>
                <div className="row">
                    <div className="col ml-5">
                        <div className="row">
                            Số điện thoại: {this.state.phonenumber}
                        </div>
                        <div className="row">
                            Email: {this.state.email}
                        </div>
                        <div className="row">
                            Số CMT/CCCD/Hộ chiếu: {this.state.idnumber}
                        </div>
                        <div className="row">
                            Quốc tịch: {this.state.country}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-hover table-bordered" >
                            <thead>
                                <tr>
                                    <th>Phòng</th>
                                    <th>Loại phòng</th>
                                    <th>Số người lớn</th>
                                    <th>Số trẻ con</th>
                                    <th>Giá tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getRoomList()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Tổng quan
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        Tổng số tiền: {this.formatMoney(this.state.totalchange)}
                    </div>
                    <div className="col text-center">
                    </div>
                    <div className="col text-center">
                        Còn phải thanh toán: {this.formatMoney(this.state.balance)}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Chi tiết
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex">
                        <div className="mx-auto w-75">
                            <table className="w-100">
                                <tbody>
                                    <tr>
                                        <td>
                                            Tiền phòng:
                                    </td>
                                        <td>
                                            {this.formatMoney(this.state.roomchanges)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Thuế:
                                    </td>
                                        <td>
                                            {this.formatMoney(this.state.tax)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Các khoản khác:
                                    </td>
                                        <td>
                                            {this.formatMoney(this.state.extrachanges)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="mx-auto w-75">
                            <table className="w-100">
                                <tbody>
                                    <tr>
                                        <td>
                                            Đã thanh toán:
                                    </td>
                                        <td>
                                            {this.formatMoney(this.state.amountpaid)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Giảm giá:
                                    </td>
                                        <td>
                                            {this.formatMoney(this.state.discount)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col h3">
                        Thông tin khác
                    </div>
                </div>
                <div className="row">
                    <div className="col ml-5">
                        Kiểu đặt phòng: {this.state.reservatio}
                    </div>
                </div>
                <div className="row mb-5">
                </div>
            </div>
        )
    }
}

class Notification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.hideNotification}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body >
                    <div className="text-center">
                        {this.props.message}
                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {

        return (
            <Modal show={this.props.show} backdrop="static">
                <Modal.Body >
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}

export default withRouter(DepartureDetail)