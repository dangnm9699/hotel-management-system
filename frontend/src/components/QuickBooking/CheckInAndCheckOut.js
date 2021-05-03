import React from 'react';

class CheckInAndCheckOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <label className="h2">Check-in and Check-out</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                        <div className="col-8 border border-primary rounded">
                            <div className="text-center">
                                Check-in
                            </div>
                            <input type="datetime-local" className="form-control border-0" />
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <div className="col-6 border border-primary rounded">

                            <input type="number" className="form-control "></input>
                            <div className="text-center">
                                Day
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <div className="col-8 border border-primary rounded">
                            <div className="text-center">
                                Check-out
                            </div>
                            <input type="datetime-local" className="form-control  border-0" />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default CheckInAndCheckOut