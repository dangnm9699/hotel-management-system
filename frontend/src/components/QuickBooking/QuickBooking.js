import React from 'react';
import CheckInAndCheckOut from './CheckInAndCheckOut'
import TypeAndNumberRoom from './TypeAndNumberRoom'
import RoomInfomation from './RoomInformation'
import GuestInformation from './GuestInformation'
import TotalAndAmount from './TotalAndAmount'

class QuickBooking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 1
        }
    }

    componentDidMount() {

    }

    amountChangeHandler = (amount) => {
        this.setState({ amount: amount })
    }

    render() {
        return (
            <div className="container-fluid">
                <hr />
                <CheckInAndCheckOut />
                <hr />
                <TypeAndNumberRoom changeAmount={this.amountChangeHandler} />
                <hr />
                <RoomInfomation amount={this.state.amount} />
                <hr />
                <GuestInformation />
                <hr />
                <TotalAndAmount />
            </div>
        )
    }
}

export default QuickBooking