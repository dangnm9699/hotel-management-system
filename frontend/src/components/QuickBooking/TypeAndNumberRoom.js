import React from 'react';

class TypeAndNumberRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            },
            amount: 1

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

    changeAmountHandler = (e) => {
        this.setState({ amount: e.target.value })
        this.props.changeAmount(e.target.value)
    }



    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <div className="h2">Booking Type</div>
                    <div class="btn-group btn-group-toggle w-50" data-toggle="buttons">
                        <label onClick={this.changeType1} className={this.state.buttonColor.buton1 + " btn w-50"}>
                            <input type="radio" name="options" id="option1" autocomplete="off" checked /> Confirm
                        </label>
                        <label onClick={this.changeType2} className={this.state.buttonColor.buton2 + " btn w-50"}>
                            <input type="radio" name="options" id="option2" autocomplete="off" /> Hold
                        </label>
                    </div>
                </div>
                <div className="col-6 d-flex justify-content-center">
                    <div className="w-25">
                        <div className="h2">Room</div>
                        <input onChange={(e) => this.changeAmountHandler(e)} type="number" className="form-control" value={this.state.amount} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TypeAndNumberRoom