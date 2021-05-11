import React from 'react';
import CheckInAndCheckOut from './CheckInAndCheckOut'
import RoomInfomation from './RoomInformation'
import GuestInformation from './GuestInformation'
import TotalAndAmount from './TotalAndAmount'
import api from '../../Api/api';
import { Modal } from 'react-bootstrap'
import { Redirect } from "react-router-dom"

class QuickBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            day: 1,
            bookingType: "confirm",
            checkInTime: this.getTimeString(new Date()),
            checkOutTime: this.getTimeString(new Date(new Date().getTime() + 86400000)),
            roomList: [],
            guestInformation: {
                type: "null"
            },
            total: 0,
            amountPaid: 0,
            loading: false,
            notificationShow: false,
            message: "",
            reload: false,
        }
    }

    getTimeString = (d) => {
        return d.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }).replace(" ", "T")
    }

    changeCheckInHandler = (checkInTime) => {
        //console.log(checkInTime)
        this.setState({ checkInTime: checkInTime })
    }

    changeCheckOutHandler = (checkOutTime) => {
        this.setState({ checkOutTime: checkOutTime })
    }

    bookingTypeChangeHandler = (bookingType) => {
        this.setState({ bookingType: bookingType })
    }

    changeRoomInformation = (roomList) => {
        // console.log(roomList)
        this.setState({ roomList: roomList })
        this.updateTotal(this.state.day)
    }

    changeGuestInformation = (guest) => {
        //console.log(this.state)
        this.setState({ guestInformation: guest })
    }

    changeDayHandler = (day) => {
        this.setState({ day: day })
        this.updateTotal(day)
    }

    changeAmountPaid = (amount) => {
        this.setState({ amountPaid: amount })
    }

    updateTotal = (day) => {
        let roomList = this.state.roomList
        let total = 0;
        for (let i = 0; i < roomList.length; i++) {
            total += roomList[i].room.price * day
        }
        //console.log(roomList, this.state.day)
        this.setState({ total: total })
    }

    booking = async () => {
        if (this.state.guestInformation.type === "null") {
            this.setState({ notificationShow: true, message: "Vui lòng nhập thông tin khách hàng" })
            return
        }
        //TODO
        this.setState({ loading: true })
        try {
            let data = {
                checkinTime: this.state.checkInTime,
                checkoutTime: this.state.checkOutTime,
                numday: this.state.day,
                guestType: this.state.guestInformation.type,
                guest: this.state.guestInformation.guest,
                type: this.state.bookingType,
                rooms: [],
                cost: this.state.total,
                paid: this.state.amountPaid
            }
            let roomList = this.state.roomList
            for (let i = 0; i < roomList.length; i++) {
                data.rooms.push({
                    roomId: roomList[i].room.Id,
                    numAdult: roomList[i].adult,
                    numChild: roomList[i].children,
                })
                if (roomList[i].room.Id === -1) {
                    this.setState({ notificationShow: true, message: "Vui lòng chọn phòng", loading: false })
                    return
                }
            }
            console.log(data)
            let res = await api.quickbooking(data)
            if (res.status === 200) {
                this.setState({ notificationShow: true, message: "Đặt phòng thành công" })
            } else {
                this.setState({ notificationShow: true, message: res.data.err })
                this.setState({ reload: true })
            }
            this.setState({ loading: false })

        } catch (err) {
            this.setState({ loading: false })
            this.setState({ notificationShow: true, message: err.toString() })
        }
    }

    hideNotification = () => {
        this.setState({ notificationShow: false })
    }

    render() {
        if (this.state.reload) {
            this.state.reload = false
            return (<Redirect to='/quickbooking' />)
        }
        return (
            <div className="container-fluid">
                <Loading show={this.state.loading} />
                <Notification show={this.state.notificationShow} hideNotification={this.hideNotification} message={this.state.message} />
                <hr />
                <CheckInAndCheckOut
                    checkInTime={this.state.checkInTime}
                    checkOutTime={this.state.checkOutTime}
                    changeCheckIn={this.changeCheckInHandler}
                    changeCheckOut={this.changeCheckOutHandler}
                    updateDay={this.changeDayHandler}
                />
                <hr />
                <RoomInfomation
                    day={this.state.day}
                    changeRoomInformation={this.changeRoomInformation}
                    changeBookingType={this.bookingTypeChangeHandler}
                />
                <hr />
                <GuestInformation changeGuestInformation={this.changeGuestInformation} />
                <hr />
                <TotalAndAmount total={this.state.total} booking={this.booking} changeAmountPaid={this.changeAmountPaid} />
            </div>
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
            <Modal show={this.props.show}>
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

export default QuickBooking