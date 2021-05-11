import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import api from '../../Api/api';
import './../../css/searchguestmodal.css'
class GuestInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            },
            type: "new",
            guestInformationNew: {
                name: "",
                phonenumber: "",
                email: "",
                country: "",
                idNumber: "",
            },
            searchnumber: "",
            modalLoading: true,
            guestList: [],
            selectedGuest: -1,
        }
    }

    changeTypeNew = () => {
        this.setState({
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            },
            type: "new",
        })
        this.props.changeGuestInformation({
            type: "new",
            guest: this.state.guestInformationNew,
        })
    }

    changeTypeReturn = () => {
        this.setState({
            buttonColor: {
                buton1: "btn-secondary",
                buton2: "btn-primary",
            },
            type: "return",
        })
        if (this.state.selectedGuest != -1) {
            this.props.changeGuestInformation({
                type: "return",
                guest: this.state.guestList[this.state.selectedGuest]
            })
        } else {
            this.props.changeGuestInformation({
                type: "null",
                guest: {},
            })
        }
    }

    changeNewHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let guestInformationNew = this.state.guestInformationNew;
        guestInformationNew[nam] = val;
        //console.log(guestInformationNew)
        this.props.changeGuestInformation({
            type: "new",
            guest: this.state.guestInformationNew
        })
        this.setState({ guestInformationNew: guestInformationNew });
    }

    changeSearchHandler = (event) => {
        this.setState({ searchnumber: event.target.value })
    }

    handleCloseModal = () => {
        this.setState({ modalShow: false })
    }

    search = async () => {
        this.setState({ modalShow: true, modalLoading: true })
        try {
            const res = await api.searchGuestByPhoneNumber(this.state.searchnumber)
            //console.log(res.data)
            this.setState({ modalLoading: false, guestList: res.data.data, selectedGuest: -1 })
        } catch (err) {
            console.log(err)
            this.setState({ modalShow: false })
        }
    }

    setSelectedGuest = (index) => {
        if (index != -1) {
            this.props.changeGuestInformation({
                type: "return",
                guest: this.state.guestList[index]
            })
        } else {
            this.props.changeGuestInformation({
                type: "null",
                guest: {},
            })
        }
        this.setState({ selectedGuest: index })
    }

    render() {
        const type1 = (<div className="row justify-content-center">
            <div className="col-11">
                <div className="form-group">
                    <label >Tên khách hàng</label>
                    <input type="email" className="form-control" name="name" value={this.state.guestInformationNew.name} onChange={this.changeNewHandler} placeholder="Nhập tên khách hàng" />
                </div>
                <div className="form-group">
                    <label >Quốc tịch</label>
                    <input type="text" className="form-control" name="country" value={this.state.guestInformationNew.country} onChange={this.changeNewHandler} placeholder="Nhập quốc tịch" />
                </div>
                <div className="form-group">
                    <label >Số CMT/CCCD/Hộ chiếu</label>
                    <input type="text" className="form-control" name="idNumber" value={this.state.guestInformationNew.idNumber} onChange={this.changeNewHandler} placeholder="Nhập số CMT/CCCD/Hộ chiếu" />
                </div>
                <div className="form-group">
                    <label >Số điện thoại</label>
                    <input type="text" className="form-control" name="phonenumber" value={this.state.guestInformationNew.phonenumber} onChange={this.changeNewHandler} placeholder="Nhập số điện thoại" />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="text" className="form-control" name="email" value={this.state.guestInformationNew.email} onChange={this.changeNewHandler} placeholder="Nhập email" />
                </div>
            </div>
        </div>
        )

        let type2;
        if (this.state.selectedGuest === -1) {
            type2 = (<div className="row justify-content-center">
                <div className="col-11">
                    <div className="form-group">
                        <label >Số điện thoại</label>
                        <div className="row">
                            <div className="col-10">
                                <input type="text" className="form-control" name="searchnumber" value={this.state.searchnumber} onChange={this.changeSearchHandler} placeholder="Nhập số điện thoại" />
                            </div>
                            <div className="col">
                                <button className="btn btn-info" onClick={this.search}>Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            let guest = this.state.guestList[this.state.selectedGuest]
            type2 = (<div className="row justify-content-center">
                <div className="col-9">
                    <div className="form-group">
                        <label >Tên khách hàng</label>
                        <input type="email" className="form-control" name="name" value={guest.name} placeholder="Nhập tên khách hàng" readOnly />
                    </div>
                    <div className="form-group">
                        <label >Quốc tịch</label>
                        <input type="text" className="form-control" name="country" value={guest.country} placeholder="Nhập quốc tịch" readOnly />
                    </div>
                    <div className="form-group">
                        <label >Số CMT/CCCD/Hộ chiếu</label>
                        <input type="text" className="form-control" name="idNumber" value={guest.idNumber} placeholder="Nhập số CMT/CCCD/Hộ chiếu " readOnly />
                    </div>
                    <div className="form-group">
                        <label >Số điện thoại</label>
                        <input type="text" className="form-control" name="phonenumber" value={guest.phonenumber} placeholder="Nhập số điện thoại" readOnly />
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input type="text" className="form-control" name="email" value={guest.email} placeholder="Nhập email" readOnly />
                    </div>
                </div>
                <div className="text-center col-1 d-flex justify-content-center">
                    <div className="mt-auto mb-auto">
                        <button className="btn btn-danger" onClick={() => this.setSelectedGuest(-1)}>X</button>
                    </div>
                </div>
            </div>
            )
        }

        return (
            <div className="row">
                <Search
                    setGuest={this.setSelectedGuest}
                    show={this.state.modalShow}
                    handleClose={this.handleCloseModal}
                    loading={this.state.modalLoading}
                    guestList={this.state.guestList}
                />
                <div className="col-12">
                    <div className="row">
                        <div className="h2 col-8">Thông tin khách hàng</div>
                        <div className="col-4 mt-2">
                            <div className="btn-group btn-group-toggle w-75" data-toggle="buttons">
                                <label onClick={this.changeTypeNew} className={this.state.buttonColor.buton1 + " btn w-50"}>
                                    <input type="radio" /> Khách mới
                                </label>
                                <label onClick={this.changeTypeReturn} className={this.state.buttonColor.buton2 + " btn w-50"}>
                                    <input type="radio" /> Khách cũ
                                </label>
                            </div>
                        </div>
                    </div>
                    {this.state.type === "new" ? type1 : type2}
                </div>
            </div>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGuest: -1,
        }
    }

    selectGuest = (id) => {
        this.setState({ selectedGuest: id })
    }

    select = () => {
        this.props.setGuest(this.state.selectedGuest)
        this.props.handleClose()
    }

    render() {
        let body = [];
        if (this.props.loading === true) {
            body = (
                <div className="d-flex justify-content-center text-primary">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        } else {
            let guestList = this.props.guestList
            for (let i = 0; i < guestList.length; i++) {
                body.push(<div className={"row pt-2 pb-2 guest-modal-row" + (i === this.state.selectedGuest ? " guest-selected" : "")} onClick={() => this.selectGuest(i)} key={guestList[i].Id} >
                    <div className="col"> {guestList[i].phonenumber} </div>
                    <div className="col"> {guestList[i].name} </div>
                    <div className="col"> {guestList[i].country} </div>
                </div>)
            }
        }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} size="lg" scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Results</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row">
                        <div className="col">Phone Number</div>
                        <div className="col">Name</div>
                        <div className="col">Country</div>
                    </div>
                    <hr />
                    <div className="container-fluid">
                        {body}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.select}>
                        Select
                    </Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default GuestInformation