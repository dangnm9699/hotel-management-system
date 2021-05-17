import React from 'react';
import api from '../../Api/api';

class RoomInfomation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            },
            amountRoom: 1,
            roomType: "Standard",
            listRoomSelected: [{
                adult: 0,
                children: 0,
                room: {
                    Id: -1,
                    name: "",
                    maxchild: 0,
                    maxadult: 0,
                    price: 0,
                },
                index: 0,
            }],
            listRoom: [{
                Id: -1,
                name: "",
                maxchild: 0,
                maxadult: 0,
                price: 0,
            }],
            loading: true
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        try {
            let res = await api.getIdleRoomByType(this.state.roomType)
            if (res.data.length) {
                for (let i = 0; i < this.state.listRoomSelected.length; i++) {
                    this.state.listRoomSelected[i].room = res.data[0]
                }
                this.setState({ listRoom: res.data })
            } else {
                for (let i = 0; i < this.state.listRoomSelected.length; i++) {
                    this.state.listRoomSelected[i].room = {
                        Id: -1,
                        name: "",
                        maxchild: 0,
                        maxadult: 0,
                        price: 0,
                    }
                }
                this.setState({
                    listRoom: [{
                        Id: -1,
                        name: "",
                        maxchild: 0,
                        maxadult: 0,
                        price: 0,
                    }]
                })
            }
            this.props.changeRoomInformation(this.state.listRoomSelected)
            this.setState({ loading: false })
            //console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    changeTypeConfirm = () => {
        this.props.changeBookingType("confirm")
        this.setState({
            buttonColor: {
                buton1: "btn-primary",
                buton2: "btn-secondary",
            }
        })
    }
    changeTypeHold = () => {
        this.props.changeBookingType("hold")
        this.setState({
            buttonColor: {
                buton1: "btn-secondary",
                buton2: "btn-primary",
            }
        })
    }

    changeAmountRoomHandler = (e) => {
        this.setState({ amountRoom: e.target.value })
        let listRoom = this.state.listRoomSelected
        while (e.target.value > listRoom.length) {
            listRoom.push({
                adult: 0,
                children: 0,
                room: this.state.listRoom[0],
                index: 0,
            })
        }
        listRoom.length = e.target.value
        this.props.changeRoomInformation(listRoom)
        this.setState({ listRoomSelected: listRoom })
    }

    changeRoomType = async (event) => {
        //console.log(event.target.value)
        this.setState({ roomType: event.target.value, loading: true });
        try {
            let res = await api.getIdleRoomByType(event.target.value)
            if (res.data.length) {
                for (let i = 0; i < this.state.listRoomSelected.length; i++) {
                    this.state.listRoomSelected[i].room = res.data[0]
                }
                this.setState({ listRoom: res.data })
            } else {
                for (let i = 0; i < this.state.listRoomSelected.length; i++) {
                    this.state.listRoomSelected[i].room = {
                        Id: -1,
                        name: "",
                        maxchild: 0,
                        maxadult: 0,
                    }
                }
                this.setState({
                    listRoom: [{
                        Id: -1,
                        name: "",
                        maxchild: 0,
                        maxadult: 0,
                    }]
                })
            }
            this.props.changeRoomInformation(this.state.listRoomSelected)
            this.setState({ loading: false })

        } catch (e) {
            console.log(e)
        }
    }

    changeRoomInformation = (event) => {
        let i = parseInt(event.target.getAttribute('index'))
        let value = event.target.value
        let name = event.target.name
        let listRoomSelected = this.state.listRoomSelected
        if (name === 'index') {
            value = parseInt(value)
            listRoomSelected[i]["children"] = 0;
            listRoomSelected[i]["adult"] = 0;
        }
        listRoomSelected[i][name] = value
        listRoomSelected[i]["room"] = this.state.listRoom[listRoomSelected[i].index]
        this.props.changeRoomInformation(listRoomSelected)
        this.setState({ listRoomSelected: listRoomSelected })
    }

    getNameOptionList = () => {
        let listOption = [];
        let availableRoom = this.state.listRoom
        for (let i = 0; i < availableRoom.length; i++) {
            listOption.push(<option key={i} value={i}>{availableRoom[i].name}</option>)
        }
        return listOption
    }

    getAdultOptionList = (index) => {
        let listOption = [];
        let room = this.state.listRoom[index];
        for (let i = 0; i <= room.maxadult; i++) {
            listOption.push(<option key={i} value={i}>{i}</option>)
        }
        return listOption
    }

    getChildrenOptionList = (index) => {
        let listOption = [];
        let room = this.state.listRoom[index];
        for (let i = 0; i <= room.maxchild; i++) {
            listOption.push(<option key={i} value={i}>{i}</option>)
        }
        return listOption
    }

    render() {
        //console.log(this.state.listRoomSelected)
        let listRoom = [];
        if (this.state.loading) {
            listRoom = <div className="d-flex justify-content-center text-primary">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        } else {
            for (let i = 0; i < this.state.amountRoom; i++) {
                //console.log(this.state.listRoomSelected[i].room.price, this.props.day)
                listRoom.push(
                    <div className="row" key={i}>
                        <div className="col">
                            <div className="form-group">
                                <label >Phòng</label>
                                <select className="form-control" index={i} name="index" onChange={this.changeRoomInformation} >
                                    {this.getNameOptionList()}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label >Số người lớn</label>
                                <select className="form-control" index={i} name="adult" onChange={this.changeRoomInformation} value={this.state.listRoomSelected[i].adult}>
                                    {this.getAdultOptionList(this.state.listRoomSelected[i].index)}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label >Số trẻ em</label>
                                <select className="form-control" index={i} name="children" onChange={this.changeRoomInformation} value={this.state.listRoomSelected[i].children}>
                                    {this.getChildrenOptionList(this.state.listRoomSelected[i].index)}
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label >Đơn giá</label>
                                <input type="text" className="form-control" value={this.state.listRoomSelected[i].room.price * this.props.day} readOnly />
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-6">
                            <div className="h2">Kiểu đặt phòng</div>
                            <div className="btn-group btn-group-toggle w-50" data-toggle="buttons">
                                <label onClick={this.changeTypeConfirm} className={this.state.buttonColor.buton1 + " btn w-50"}>
                                    <input type="radio" /> Xác nhận
                        </label>
                                <label onClick={this.changeTypeHold} className={this.state.buttonColor.buton2 + " btn w-50"}>
                                    <input type="radio" /> Giữ phòng
                        </label>
                            </div>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <div className="w-50">
                                <div className="h2">Số lượng phòng</div>
                                <input onChange={(e) => this.changeAmountRoomHandler(e)} type="number" className="form-control w-50" value={this.state.amountRoom} min="1" max="50" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12">
                            <div className="h2">Thông tin phòng</div>
                            <div className="row justify-content-center">
                                <div className="col-11">
                                    <div className="h4 row border rounded border-dark">
                                        <div className="col-8 mt-2">
                                            Loại phòng
                                </div>
                                        <div className="col-4">
                                            <select className="form-control border-0  mt-1 mb-1" onChange={this.changeRoomType}>
                                                <option value="Standard">Standard</option>
                                                <option value="Deluxe">Deluxe</option>
                                                <option value="Superior">Superior</option>
                                                <option value="Suite">Suite</option>
                                            </select>
                                        </div>

                                    </div>
                                    <hr />
                                    <div>
                                        {listRoom}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomInfomation