import React from 'react';

class GuestInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            }
        }
    }

    componentDidMount() {

    }

    changeType1 = () => {
        this.setState({
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            }
        })
    }

    changeType2 = () => {
        this.setState({
            buttonColor: {
                buton1: "btn-secondary",
                buton2: "btn-primary",
            }
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="h2 col-9">Guest Infomation</div>
                        <div className="col-3">
                            <div class="btn-group btn-group-toggle w-75" data-toggle="buttons">
                                <label onClick={this.changeType1} className={this.state.buttonColor.buton1 + " btn w-50"}>
                                    <input type="radio" name="options" id="option1" autocomplete="off" checked /> New
                                </label>
                                <label onClick={this.changeType2} className={this.state.buttonColor.buton2 + " btn w-50"}>
                                    <input type="radio" name="options" id="option2" autocomplete="off" /> Returning
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div class="form-group">
                                <label >Guest Name</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter guest name" />
                            </div>
                            <div class="form-group">
                                <label >Country</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter country" />
                            </div>
                            <div class="form-group">
                                <label >Person identification number/Passport number</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Person identification number/Passport number" />
                            </div>
                            <div class="form-group">
                                <label >Mobile number</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter mobile number" />
                            </div>
                            <div class="form-group">
                                <label >Mail ID</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter mail ID" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GuestInformation