import React from 'react';


class Departure extends React.Component {
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
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="row">
                <div className="col-3">
                    <div className="row align-items-center justify-content-center h-50">
                        <div className="col-8  border text-center d-flex flex-column justify-content-center h-75">
                            {this.state.leavingAt.getDate()}
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center h-50">
                        <div className="col-8  border text-center d-flex flex-column justify-content-center h-75">
                            {this.state.leavingAt.getDate()}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row h4">
                        {this.state.name}
                    </div>
                    <div className="row">
                        <div class="col font-weight-bold">
                            <div> ResID</div>
                            <div>{this.state.resid}</div>
                        </div>
                        <div class="col font-weight-bold">
                            <div> Folio</div>
                            <div>{this.state.folio}</div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <div>{this.state.nightStay} Night Stay</div>
                            <div>Arriving At {this.state.arrivingAt.getHours()}:{this.state.arrivingAt.getMinutes()}</div>
                        </div>
                        <div className="col">
                            <div>Adult: {this.state.adult}</div>
                            <div>Child: {this.state.children}</div>
                        </div>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center">
                    <a href="javascript:void(0)">
                        Click for more detail
                    </a>
                </div>
            </div>
        )
    }
}

export default Departure