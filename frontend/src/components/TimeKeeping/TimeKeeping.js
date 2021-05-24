import React from 'react';
import api from '../../Api/api';
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Paginator from '../Paginator/paginator'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom'

class TimeKeeping extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            beginTime: this.beginTime(),
            endTime: this.endTime(),
            NVList: [],
            pagination: {
                currentPage: 1,
                lastPage: 1,
            },
            chamCongList: [],
            loading: true,
        }
    }

    beginTime = () => {
        let date = new Date();
        date.setDate(date.getDate() - 3)
        date.setHours(0, 0, 0, 0)
        return date
    }

    endTime = () => {
        let date = new Date();
        date.setDate(date.getDate() + 3)
        date.setHours(23, 59, 59, 999)
        return date
    }

    setBeginTime = (date) => {
        date.setHours(0, 0, 0, 0)
        let endTime = new Date(date)
        endTime.setDate(endTime.getDate() + 6)
        endTime.setHours(23, 59, 59, 999)
        this.setState({
            beginTime: date,
            endTime: endTime,
        })
        this.setState({ loading: true })
        this.getData(this.state.pagination.currentPage)
    }

    setEndTime = (date) => {
        date.setHours(23, 59, 59, 999)
        let beginTime = new Date(date)
        beginTime.setDate(beginTime.getDate() - 6)
        beginTime.setHours(0, 0, 0, 0)
        this.setState({
            endTime: date,
            beginTime: beginTime
        })
        this.setState({ loading: true })
        this.getData(this.state.pagination.currentPage)
    }

    async componentDidMount() {
        document.title = "MyHotel - Chấm công nhân viên"
        try {
            await this.getData(1)
        } catch (err) {
            console.log(err)
        }
    }

    getData = async (page) => {
        try {
            //this.setState({ loading: true })
            let res = await api.getliststaff(page)
            this.setState({ pagination: res.data.pagination, NVList: res.data.data })
            let list = [];
            for (let i = 0; i < this.state.NVList.length; i++) {
                list.push(this.state.NVList[i].Id)
            }
            res = await api.getChamCong(list, this.state.beginTime, this.state.endTime)
            this.setState({ chamCongList: res.data.data, loading: false })
        } catch (err) {
            Promise.reject(err)
        }
    }

    toDateString = (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        let dateString = mm + '/' + dd + '/' + yyyy;
        return dateString
    }

    getTableHead = () => {
        let header = [];
        header.push(<th scope="col" key="NV">Nhân Viên</th>)
        header.push(<th scope="col" key="NS">Ngày sinh</th>)
        let i = new Date(this.state.beginTime);
        while (i <= this.state.endTime) {
            header.push(<th className="text-center" scope="col" key={i.getDate()}>{this.toDateString(i)}</th>)
            i.setDate(i.getDate() + 1);
        }
        return header
    }

    getTableBody = () => {
        let body = [];
        let NVList = this.state.NVList;
        let data = {};

        for (let i = 0; i < NVList.length; i++) {
            data[NVList[i].Id] = {
                NV: NVList[i],
            }
            let date = new Date(this.state.beginTime);
            while (date <= this.state.endTime) {
                data[NVList[i].Id][this.toDateString(date)] = null;
                date.setDate(date.getDate() + 1);
            }
        }

        let chamCongList = this.state.chamCongList
        for (let i = 0; i < chamCongList.length; i++) {
            data[chamCongList[i].NVId][this.toDateString(new Date(chamCongList[i].date))] = chamCongList[i].Id
        }

        for (let key in data) {
            let row = [];

            row.push(
                <td className="text-primary" key={"name" + key}>
                    {data[key].NV.name}
                </td>
            )

            row.push(
                <td key={"birthday" + key}>
                    {this.toDateString(new Date(data[key].NV.birthday))}
                </td>
            )

            let date = new Date(this.state.beginTime);
            while (date <= this.state.endTime) {
                if (data[key][this.toDateString(date)]) {
                    let Id = data[key][this.toDateString(date)]
                    row.push(
                        <td className="text-center" key={this.toDateString(date) + key}>
                            <input
                                type="checkbox"
                                checked={true}
                                onChange={e => this.deleteTimeKeeping(Id)}
                            />
                        </td>
                    )
                } else {
                    let d = new Date(date)
                    row.push(
                        <td className="text-center" key={this.toDateString(date) + key}>
                            <input
                                type="checkbox"
                                checked={false}
                                onChange={e => this.addTimeKeeping(data[key].NV.Id, d)}
                            />
                        </td>
                    )
                }
                date.setDate(date.getDate() + 1);
            }

            body.push(
                <tr key={key}>
                    {row}
                </tr>
            )
        }
        return body
    }

    addTimeKeeping = async (NVId, time) => {
        try {
            //this.setState({ loading: true })
            let res = await api.addTimeKeeping(NVId, time)
            await this.getData(this.state.pagination.currentPage)
            this.setState({ loading: false })
        } catch (err) {
            console.log(err)
        }

    }

    deleteTimeKeeping = async (Id) => {
        try {
            //this.setState({ loading: true })
            let res = await api.deleteTimeKeeping(Id)
            this.getData(this.state.pagination.currentPage)
            this.setState({ loading: false })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        if (!this.props.user) {
            return <Redirect
                to={{ pathname: "/login", state: { from: '/timekeeping' } }}
            ></Redirect>
        }
        if (this.props.user.acctype !== 'Quản trị viên') {
            return <Redirect to="/dashboard"></Redirect>
        }
        if (this.state.loading) {
            return (
                <div className="container-fluid d-flex justify-content-center">
                    <div className="d-flex justify-content-center text-primary mt-auto mb-auto">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div >
            )
        }

        return (
            <div className="container-fluid" >
                <div className="h3 mt-3">
                    Chấm công
                </div>
                <div className="row mb-3">
                    <div className="col d-flex">
                        <div className="mr-3 align-self-center"> Từ ngày:</div>
                        <div>
                            <DatePicker className="form-control" selected={this.state.beginTime} onChange={date => this.setBeginTime(date)} />
                        </div>

                    </div>
                    <div className="col d-flex">
                        <div className="mr-3 align-self-center"> Đến ngày:</div>
                        <div>
                            <DatePicker className="form-control" selected={this.state.endTime} onChange={date => this.setEndTime(date)} />
                        </div>
                    </div>
                </div>
                <div style={{ "minHeight": "60vh" }}>
                    <table className="table table-striped table-hover table-bordered" >
                        <thead>
                            <tr>
                                {this.getTableHead()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTableBody()}
                        </tbody>
                    </table>
                </div>
                <div className="row justify-content-center mt-5">
                    <Paginator getData={(page) => { this.setState({ loading: true }); this.getData(page) }} pagination={this.state.pagination} />
                </div>
            </div >
        )
    }
}

class Notification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.hideNotification}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body >
                    <div className="text-center">
                        {this.props.message}
                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}

class Loading extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <Modal show={this.props.show} backdrop="static">
                <Modal.Body >
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        )
    }
}

export default withRouter(TimeKeeping)