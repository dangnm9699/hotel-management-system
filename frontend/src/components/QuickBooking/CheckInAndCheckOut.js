import React from 'react';

class CheckInAndCheckOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            day: 1
        }
    }

    componentDidMount() {

    }

    getDateTimeLocal(d) {
        return (new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()).slice(0, -5)
    }

    changeCheckIn = (e) => {
        this.props.changeCheckIn(e.target.value)
        let d1 = new Date(e.target.value)
        let d2 = new Date(this.props.checkOutTime)

        let day = Math.floor((d2 - d1 - 1) / (1000 * 60 * 60 * 24)) + 1
        //console.log(day)
        this.props.updateDay(day)
        this.setState({ day: day })
    }

    changeCheckOut = (e) => {
        this.props.changeCheckOut(e.target.value)
        let d1 = new Date(this.props.checkInTime)
        let d2 = new Date(e.target.value)

        let day = Math.floor((d2 - d1 - 1) / (1000 * 60 * 60 * 24)) + 1
        //console.log(day)
        this.props.updateDay(day)
        this.setState({ day: day })
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
                            <input type="datetime-local" className="form-control border-0 mb-3" onChange={this.changeCheckIn} value={this.props.checkInTime} />
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <div className="col-8 border border-dark rounded">
                            <input type="number" className="form-control mt-3" min="1" value={this.state.day} readOnly></input>
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
                            <input type="datetime-local" className="form-control  border-0 mb-3" onChange={this.changeCheckOut} value={this.props.checkOutTime} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default CheckInAndCheckOut