import React from 'react';
import api from '../../Api/api';
import Departure from './Departure'
import Paginator from '../Paginator/paginator'
import '../../css/departurelist.css'
import {Redirect} from 'react-router-dom'

class DepartureList extends React.Component {
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
        document.title = "MyHotel - Check Out"
        try {
            let res = await api.getOrderDepartureToday()
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
            type: "Hôm nay",
            loading: true,
        })
        try {
            let res = await api.getOrderDepartureToday(1)
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
            type: "Ngày mai",
            loading: true
        })
        try {
            let res = await api.getOrderDepartureTomorrow(1)
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
            type: "Tuần này",
            loading: true,
        })
        try {
            let res = await api.getOrderDepartureThisWeek(1)
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
                    res = await api.getOrderDepartureToday(page);
                    break;

                case "Tomorrow":
                    res = await api.getOrderDepartureToday(page);
                    break;

                case "This Week":
                    res = await api.getOrderDepartureThisWeek(page);
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
        if (!this.props.user) {
            return <Redirect
                to={{ pathname: "/login", state: { from: '/checkout' } }}
            ></Redirect>
        }
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
                    [<Departure key={list[i].order.Id} {...list[i]} from={this.state.type} />, <hr key={"hr" + i} />]
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
                            Danh sách khách đi
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

export default DepartureList