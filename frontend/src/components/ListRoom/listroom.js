import React from 'react'
import { Redirect } from 'react-router'
import api from '../../Api/api'
import Page500 from '../Page500/Page500'
import '../../css/listroom.css'
import AddRoom from '../Room/AddRoom'
import DetailRoom from '../Room/DetailRoom'
import EditRoom from '../Room/EditRoom'
import DeleteRoom from '../Room/DeleteRoom'
import Paginator from '../Paginator/paginator'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const SERVER = 'http://localhost:3001/'
export default class ListRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'hideRecommend': true,
            'recommends': [
                {
                    id: 0,
                    name: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'
                },
            ],
            'unauthorized': false,
            'editId': '',
            'search': '',
            'serverError': false,
            'data': [], // Lưu thông tin danh sách các phòng
            'pagination': {  // Lưu thông tin phân trang
                "total": 0,
                "perPage": 8,
                "to": 0,
                "lastPage": 0,
                "currentPage": 1,
                "from": 0
            },
        }
    }

    handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results)
        this.setState({ 'search': string })
        try {
            let result = await api.searchRoomName(1, string)
            let recommends = [];
            if (result.status === 200) {
                result.data.data.forEach((item, index) => {
                    recommends.push({
                        "id": index,
                        "name": item.name
                    })
                });
                this.setState({ 'recommends': recommends })
                this.setState({ 'hideRecommend': false })
            } else {
                console.log(result)
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }

    handleOnHover = (result) => {
        // the item hovered
        // console.log(result)
    }

    handleOnSelect = (item) => {
        // the item selected
        // console.log(item)
        this.setState({ 'search': item.name })
    }
    handleOnFocus = () => {
        // console.log('Focused')
    }

    clickEdit = (e) => {
        let value = e.target.value
        this.setState({ editId: value })
        console.log(this.state)
    }
    clickDelete = async (e) => {
        let roomId = e.target.value
        try {
            let response = await api.deleteroom(roomId);
            if (response.status === 200) {
                await this.reloadPage()
            } else if (response.status === 401) {
                localStorage.removeItem('accessToken')
                this.setState({ 'unauthorized': true })
            } else {
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ serverError: true })
        }
    }
    reloadPage = async () => {
        try {
            let result = await api.getlistroom(this.state.pagination.currentPage)
            if (result.status === 200) {
                this.setState({ 'data': result.data.data, 'pagination': result.data.pagination })
            } else {
                console.log(result)
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }
    render() {
        if (this.state.serverError === true) {
            return <Page500 />
        }
        if (this.state.unauthorized === true) {
            return <Redirect to={{ pathname: "/login", state: { from: 'room' } }} />
        }
        var roomList = [];
        roomList.push(
            <AddRoom key={-1} />
        )
        this.state.data.forEach((room, index) => {
            roomList.push(
                <div className="short-post row" key={index}>
                    <a href="/>">
                        <img src={'/room.jpg'} alt="Room Image" style={{ imageResolution: '300dpi' }} height="140px" width="180px" />
                    </a>
                    <div className="short-info">
                        <a href="/detailpost?postid=<?php echo $post->postid ?>">
                            <p className="contest-name">{room.name}</p>
                        </a>
                        <div className="owner-option row">
                            <DetailRoom rid={room.Id} />
                            <EditRoom rid={room.Id} />
                            <DeleteRoom reloadpage={this.reloadPage} rid={room.Id} />
                        </div>
                        <p><b>Giá:</b> {room.price}</p>
                        <p><b>Loại phòng:</b> {room.type}</p>
                        <p><b>Sức chứa:</b></p>
                        <p>Người lớn: {room.maxadult} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Trẻ em: {room.maxchild}</p>
                        <p><b>Trạng thái:</b> <span className={(room.status === "Đang sử dụng") ? "text-warning" : ''}>{room.status}</span></p>
                    </div>
                </div>
            )
        });
        return (
            <div className="content-container container-fluid">
                <div className="search-bar">
                    <p className="search-bar-header" style={{ marginLeft: '16px' }}><b>Tìm kiếm phòng khách sạn:</b></p>
                    <div className="row">
                        <div className={"col-10 search-container " + (this.state.hideRecommend ? 'hide-recommend' : '')} id="autoComplete">
                            <ReactSearchAutocomplete
                                className={'hide-recommend'}
                                items={this.state.recommends}
                                onSearch={this.handleOnSearch}
                                onHover={this.andleOnHover}
                                onSelect={this.handleOnSelect}
                                onFocus={this.handleOnFocus}
                                styling={
                                    {
                                        borderRadius: "6px",
                                        // boxShadow: "none"
                                        zIndex: "2",
                                    }
                                }
                                name='search'
                                inputSearchString={this.state.search}
                                placeholder='Tìm kiếm phòng của khách sạn'
                            />

                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary text-search" onClick={this.clickSearch}><i className="fas fa-search"></i>
                                    &nbsp;Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div className="post-list">
                    {roomList}
                </div>
                <Paginator pagination={this.state.pagination} getData={this.getData} />
            </div >
        );

    }
    clickSearch = async (e) => {
        await this.getData(1)
    }
    getData = async (page) => {
        try {
            let result = '';
            if (this.state.search) {
                result = await api.searchListRoom(page, this.state.search)
            } else {
                result = await api.getlistroom(page)
            }
            if (result.status === 200) {
                this.setState({ 'data': result.data.data, 'pagination': result.data.pagination })
            } else if (result.status === 401) {
                localStorage.removeItem('accessToken')
                this.setState({ 'unauthorized': true })
            } else {
                console.log(result)
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }
    componentDidMount = async () => {
        await this.getData(1)
    }
}