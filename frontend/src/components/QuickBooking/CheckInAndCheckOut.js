import React from 'react';
import QuickBookingContext from '../../context/QuickBookingContext'
import api from '../../Api/api';

class CheckInAndCheckOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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

    async reloadListRoomCandidate() {
        this.context.setContext('loadingRoom', true)
        try {
            let res = await api.getIdleRoomByType(this.context.roomType, this.context.checkInTime, this.context.checkOutTime)
            if (res.data.length) {
                for (let i = 0; i < this.context.listRoomSelected.length; i++) {
                    this.context.listRoomSelected[i] = {
                        room: res.data[0],
                        adult: 0,
                        children: 0,
                        index: 0,
                    }
                }
                this.context.setContext('listRoomCandidate', res.data)
            } else {
                for (let i = 0; i < this.state.listRoomSelected.length; i++) {
                    this.state.listRoomSelected[i] = {
                        room: {
                            Id: -1,
                            name: "",
                            maxchild: 0,
                            maxadult: 0,
                            price: 0,
                        },
                        adult: 0,
                        children: 0,
                        index: 0,
                    }
                }
                this.context.setContext('listRoomCandidate', [{
                    Id: -1,
                    name: "",
                    maxchild: 0,
                    maxadult: 0,
                    price: 0,
                }])
            }
            this.context.setContext('loadingRoom', false)
            //console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    changeCheckIn = (e) => {
        let d1 = new Date(e.target.value)
        let d2 = new Date(this.context.checkOutTime)
        if (d1 > d2) {
            d2 = d1;
            this.context.setContext('checkOutTime', this.getTimeString(d2))
        }
        this.context.setContext('checkInTime', e.target.value)
        this.reloadListRoomCandidate()
    }

    changeCheckOut = (e) => {
        let d1 = new Date(this.context.checkInTime)
        let d2 = new Date(e.target.value)
        if (d1 > d2) {
            d2 = d1;
            this.context.setContext('checkOutTime', this.getTimeString(d2))
        } else {
            this.context.setContext('checkOutTime', e.target.value)
        }
        this.reloadListRoomCandidate()
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <label className="h2">Check-in và Check-out</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 d-flex justify-content-center">
                        <div className="col-8 border rounded">
                            <div className="text-center font-weight-bold">
                                Thời gian check-in
                            </div>
                            <input type="datetime-local" className="form-control border-0 mb-3" onChange={this.changeCheckIn} value={this.context.checkInTime} />
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <div className="col-8 border border-dark rounded">
                            <input type="number" className="form-control mt-3" min="1" value={this.context.getDay()} readOnly></input>
                            <div className="text-center">
                                Số ngày
                            </div>
                        </div>
                    </div>
                    <div className="col-5 d-flex justify-content-center">
                        <div className="col-8 border rounded">
                            <div className="text-center font-weight-bold">
                                Thời gian check-out
                            </div>
                            <input type="datetime-local" className="form-control  border-0 mb-3" onChange={this.changeCheckOut} value={this.context.checkOutTime} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

CheckInAndCheckOut.contextType = QuickBookingContext

export default CheckInAndCheckOut