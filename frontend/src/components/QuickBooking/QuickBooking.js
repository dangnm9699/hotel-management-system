import React from 'react';
import CheckInAndCheckOut from './CheckInAndCheckOut'
import RoomInfomation from './RoomInformation'
import GuestInformation from './GuestInformation'
import TotalAndAmount from './TotalAndAmount'
import api from '../../Api/api';
import { Modal } from 'react-bootstrap'
import { Redirect } from "react-router-dom"
import QuickBookingContext from "../../context/QuickBookingContext"

class QuickBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            notificationShow: false,
            message: "",
            reload: false,
            context: {
                bookingType: "confirm",
                checkInTime: this.getTimeString(new Date()),
                checkOutTime: this.getTimeString(new Date(new Date().getTime() + 86400000)),
                guestInformation: {
                    type: "null"
                },
                amountPaid: 0,

                amountRoom: 1,
                roomType: "Standard",
                listRoomSelected: [{
                    adult: 0,
                    children: 0,
                    room: {
                        Id: -1,
                        name: "",
                        maxchild: 0,
                        maxadult: 0,
                        price: 0,
                    },
                    index: 0,
                }],
                listRoomCandidate: [{
                    Id: -1,
                    name: "",
                    maxchild: 0,
                    maxadult: 0,
                    price: 0,
                }],
                loadingRoom: true,

                getDay: this.getDay,
                getTotal: this.getTotal,
                booking: this.booking,
                setContext: this.setContext,
            }
        }
    }

    setContext = (prop, value) => {
        let c = this.state.context;
        c[prop] = value;
        this.setState({ context: c })
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

    changeAmountPaid = (amount) => {
        this.setState({ amountPaid: amount })
    }

    getDay = () => {
        let d1 = new Date(this.state.context.checkInTime)
        let d2 = new Date(this.state.context.checkOutTime)
        return Math.floor((d2 - d1 - 1) / (1000 * 60 * 60 * 24)) + 1
    }

    getTotal = () => {
        let roomList = this.state.context.listRoomSelected
        let total = 0;
        for (let i = 0; i < roomList.length; i++) {
            total += roomList[i].room.price * this.getDay()
        }
        return total
    }

    booking = async () => {
        if (this.state.context.guestInformation.type === "null") {
            this.setState({ notificationShow: true, message: "Vui lòng nhập thông tin khách hàng" })
            return
        }
        //TODO
        this.setState({ loading: true })
        try {
            let data = {
                checkinTime: this.state.context.checkInTime,
                checkoutTime: this.state.context.checkOutTime,
                numday: this.state.context.getDay(),
                guestType: this.state.context.guestInformation.type,
                guest: this.state.context.guestInformation.guest,
                type: this.state.context.bookingType,
                rooms: [],
                cost: this.state.context.getTotal(),
                paid: this.state.context.amountPaid
            }
            let roomList = this.state.context.listRoomSelected
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
                this.setState({ reload: true })
            } else {
                this.setState({ notificationShow: true, message: res.data.err })
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
            <QuickBookingContext.Provider value={this.state.context}>
                <div className="container-fluid">
                    <Loading show={this.state.loading} />
                    <Notification show={this.state.notificationShow} hideNotification={this.hideNotification} message={this.state.message} />
                    <hr />
                    <CheckInAndCheckOut />
                    <hr />
                    <RoomInfomation />
                    <hr />
                    <GuestInformation />
                    <hr />
                    <TotalAndAmount />
                </div>
            </QuickBookingContext.Provider>
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