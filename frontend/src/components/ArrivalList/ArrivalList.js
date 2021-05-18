import React from 'react';
import api from '../../Api/api';
import Arrival from './Arrival'
import Paginator from '../Paginator/paginator'
import '../../css/departurelist.css'

class ArrivalList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonColor: {
                buttonToday: "btn-primary",
                buttonTomorrow: "btn-secondary",
                buttonThisWeek: "btn-secondary"
            },
            type: "Today",
            list: [],
            loading: true,
            pagination: {
                currentPage: 1,
                lastPage: 1,
            }
        }
    }

    async componentDidMount() {
        try {
            let res = await api.getOrderArrivalToday()
            this.setState({ list: res.data.data, pagination: res.data.pagination })
            console.log(res.data.data)
            this.setState({ loading: false })
        } catch (err) {
            console.log(err)
        }
    }


    clickButtonToday = async () => {
        this.setState({
            buttonColor: {
                buttonToday: "btn-primary",
                buttonTomorrow: "btn-secondary",
                buttonThisWeek: "btn-secondary",
            },
            type: "Today",
            loading: true,
        })
        try {
            let res = await api.getOrderArrivalToday(1)
            this.setState({
                list: res.data.data,
                loading: false,
                pagination: res.data.pagination
            })
        } catch (err) {
            console.log(err)
        }
    }

    clickButtonTomorrow = async () => {
        this.setState({
            buttonColor: {
                buttonToday: "btn-secondary",
                buttonTomorrow: "btn-primary",
                buttonThisWeek: "btn-secondary",
            },
            type: "Tomorrow",
            loading: true
        })
        try {
            let res = await api.getOrderArrivalTomorrow(1)
            this.setState({
                list: res.data.data,
                loading: false,
                pagination: res.data.pagination
            })
        } catch (err) {
            console.log(err)
        }
    }

    clickButtonThisWeek = async () => {
        this.setState({
            buttonColor: {
                buttonToday: "btn-secondary",
                buttonTomorrow: "btn-secondary",
                buttonThisWeek: "btn-primary",
            },
            type: "This Week",
            loading: true,
        })
        try {
            let res = await api.getOrderArrivalThisWeek(1)
            this.setState({
                list: res.data.data,
                loading: false,
                pagination: res.data.pagination
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    paging = async (page) => {
        this.setState({ loading: true })
        try {
            let res;
            switch (this.state.type) {
                case "Today":
                    res = await api.getOrderArrivalToday(page);
                    break;

                case "Tomorrow":
                    res = await api.getOrderArrivalToday(page);
                    break;

                case "This Week":
                    res = await api.getOrderArrivalThisWeek(page);
                    break;
                default:
            }
            this.setState({ list: res.data.data, loading: false, pagination: res.data.pagination });
            console.log(res.data)
            //return res.data
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        let listOrder = [];
        if (this.state.loading) {
            listOrder = (
                <div className="d-flex justify-content-center text-primary">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            let list = this.state.list
            for (let i = 0; i < list.length; i++) {
                listOrder.push(
                    [<Arrival key={list[i].order.Id} from={this.state.type} {...list[i]} />, <hr key={"hr" + i} />]
                )
            }
            if (list.length === 0) {
                listOrder.push(
                    <div className="row text-center">
                        <div className="col" style={{ marginTop: '48px' }}>
                            <h3>Không có đơn đặt phòng trong khoảng thời gian này</h3>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className="container-fluid">
                <div className="row" id="departure-list">
                    <div className="col" >
                        <div className="row h2 mt-3 ml-3">
                            Danh sách khách đến
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col text-center">
                                <button className={"btn w-50 " + this.state.buttonColor.buttonToday} onClick={this.clickButtonToday}>Hôm nay</button>
                            </div>
                            <div className="col  text-center">
                                <button className={"btn w-50 " + this.state.buttonColor.buttonTomorrow} onClick={this.clickButtonTomorrow}>Ngày mai</button>
                            </div>
                            <div className="col  text-center">
                                <button className={"btn w-50 " + this.state.buttonColor.buttonThisWeek} onClick={this.clickButtonThisWeek}>Tuần này</button>
                            </div>
                        </div>
                        <hr />
                        {listOrder}
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <Paginator getData={this.paging} pagination={this.state.pagination} />
                </div>
            </div >
        )
    }
}

export default ArrivalList