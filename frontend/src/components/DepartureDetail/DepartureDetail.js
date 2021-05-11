import React from 'react';


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
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-3 h4">
                        Arrival list - Today
                    </div>
                    <div className="col-2 ml-auto">
                        <button type="button" className="btn btn-primary"> Check In</button>
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
                        <div>Folio</div>
                        <div>
                            {this.state.folio}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        General Information
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <div className="h5">
                            Arival
                        </div>
                        <div>
                            {this.state.arrivingAt.toDateString()}
                        </div>
                    </div>
                    <div className="col text-center">
                        <div className="h5">
                            Departure
                        </div>
                        <div>
                            {this.state.leavingAt.toDateString()}
                        </div>
                    </div>
                    <div className="col text-center">
                        <div className="h5">
                            Night
                        </div>
                        <div>
                            {this.state.nightStay}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Guest Information
                    </div>
                </div>
                <div className="row">
                    <div className="col ml-5">
                        <div className="row">
                            Phone Number: {this.state.phonenumber}
                        </div>
                        <div className="row">
                            Email: {this.state.email}
                        </div>
                        <div className="row">
                            Person Identification/Passport Number: {this.state.idnumber}
                        </div>
                        <div className="row">
                            Country: {this.state.country}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Summary
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        Total change: {this.state.totalchange} VND
                    </div>
                    <div className="col text-center">
                        Total credits: {this.state.totalcredits} VND
                    </div>
                    <div className="col text-center">
                        Banlance: {this.state.balance} VND
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col h3">
                        Detail
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex">
                        <div className="mx-auto w-75">
                            <table className="w-100">
                                <tr>
                                    <td>
                                        Room changes:
                                    </td>
                                    <td>
                                        {this.state.roomchanges} VND
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Tax:
                                    </td>
                                    <td>
                                        {this.state.tax} VND
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Extra changes:
                                    </td>
                                    <td>
                                        {this.state.extrachanges} VND
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="mx-auto w-75">
                            <table className="w-100">
                                <tr>
                                    <td>
                                        Amount paid:
                                    </td>
                                    <td>
                                        {this.state.amountpaid} VND
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Discount:
                                    </td>
                                    <td>
                                        {this.state.discount} VND
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col h3">
                        Other Information
                    </div>
                </div>
                <div className="row">
                    <div className="col ml-5">
                        Reservatio: {this.state.reservatio}
                    </div>
                </div>
                <div className="row mb-5">
                </div>
            </div>
        )
    }
}

export default DepartureDetail