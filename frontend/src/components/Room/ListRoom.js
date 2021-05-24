import React from 'react'
import { Redirect } from 'react-router-dom'
import api from '../../Api/api'
import Page500 from '../Page500/Page500'
import '../../css/listroom.css'
import AddRoom from './AddRoom'
import DetailRoom from './DetailRoom'
import EditRoom from './EditRoom'
import DeleteRoom from './DeleteRoom'
import Paginator from '../Paginator/paginator'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


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

    componentDidMount = async () => {
        document.title = "MyHotel - Quản lý phòng"
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

    clickSearch = async (e) => {
        await this.getData(1)
    }

    handleOnSearch = async (string, results) => {
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

    handleOnSelect = (item) => {
        this.setState({ 'search': item.name })
    }

    handleOnClear = async () => {
        await this.setState({ 'search': '' })
        this.reloadPage();
    }

    reloadPage = async () => {
        try {
            let result = '';
            if (this.state.search) {
                result = await api.searchListRoom(this.state.pagination.currentPage, this.state.search)
            } else {
                result = await api.getlistroom(this.state.pagination.currentPage)
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

    render() {
        if (!this.props.user) {
            return <Redirect
                to={{ pathname: "/login", state: { from: '/room' } }}
            ></Redirect>
        }
        if (this.props.user.acctype !== 'Quản trị viên') {
            return <Redirect to="/dashboard"></Redirect>
        }
        if (this.state.serverError === true) {
            return <Page500 />
        }
        if (this.state.unauthorized === true) {
            return <Redirect to={{ pathname: "/login", state: { from: 'room' } }} />
        }
        var roomList = [];
        roomList.push(
            <AddRoom reloadpage={this.reloadPage} key={-1} />
        )
        this.state.data.forEach((room, index) => {
            roomList.push(
                <div className="short-post row" key={index}>
                    <a>
                        <img src={'/room.jpg'} alt="Room views" style={{ imageResolution: '300dpi' }} height="140px" width="180px" />
                    </a>
                    <div className="short-info">
                        <a>
                            <p className="contest-name">{room.name}</p>
                        </a>
                        <div className="owner-option row">
                            <DetailRoom reloadpage={this.reloadPage} rid={room.Id} />
                            <EditRoom reloadpage={this.reloadPage} rid={room.Id} />
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
                                onSelect={this.handleOnSelect}
                                onClear={this.handleOnClear}
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
                <div className="modal fade" id="alert" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body" id='alert-content'>
                                <p>Thêm thành công!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}