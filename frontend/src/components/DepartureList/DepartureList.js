import React from 'react';
import Departure from './Departure'

class DepartureList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row h2 mt-3 ml-3">
                    Departure List
                </div>
                <hr />
                <div className="row">
                    <div className="col text-center">
                        <button className="btn btn-primary w-50">Today</button>
                    </div>
                    <div className="col  text-center">
                        <button className="btn btn-secondary w-50">Tomorrow</button>
                    </div>
                    <div className="col  text-center">
                        <button className="btn btn-secondary w-50">This Week</button>
                    </div>

                </div>
                <hr />
                {/* {list} */}
                <Departure />
                <hr></hr>
                <Departure />
                <hr></hr>
                <Departure />
                <hr></hr>
            </div>
        )
    }
}

export default DepartureList