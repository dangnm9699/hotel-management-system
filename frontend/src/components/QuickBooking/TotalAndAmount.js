import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import QuickBookingContext from '../../context/QuickBookingContext'

class TotalAndAmount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    changeAmountPaid = (value) => {
        // let value = e.target.value
        this.context.setContext('amountPaid', parseInt(value))
    }
    formatMoney = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
    }

    render() {
        return (
            <div className="row mb-5 mt-3">
                <div className="col h3">
                    <div className="row">
                        <div className="col">
                            Tổng số tiền:
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            {this.formatMoney(this.context.getTotal())}
                        </div>
                    </div>
                </div>
                <div className="col h3">
                    <div className="row">
                        <div className="col">
                            Đã thanh toán:
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <CurrencyInput
                                id="input-example"
                                name="input-name"
                                className="form-control"
                                defaultValue={0}
                                decimalsLimit={2}
                                suffix=" ₫"
                                onValueChange={this.changeAmountPaid}
                                groupSeparator="."
                                maxLength={12}
                            />
                        </div>

                    </div>

                </div>
                <div className="col text-center mt-4">
                    <button className="btn btn-primary w-50" onClick={this.context.booking}>Đặt phòng ngay</button>
                </div>

            </div>
        )
    }
}

TotalAndAmount.contextType = QuickBookingContext

export default TotalAndAmount