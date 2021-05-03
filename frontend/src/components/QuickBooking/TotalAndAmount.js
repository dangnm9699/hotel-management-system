import React from 'react';

class TotalAndAmount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="row mb-3">
                <div className="col h2">
                    Total:
                </div>
                <div className="col h2">
                    Amount:
                </div>
                <div className="col d-flex justify-content-center">
                    <button className="btn btn-primary">Book Now</button>
                </div>

            </div>
        )
    }
}

export default TotalAndAmount