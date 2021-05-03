import React from 'react'
import { Redirect } from 'react-router'
import api from '../../Api/api'
import Page500 from '../Page500/Page500'
import '../../css/listroom.css'
import AddRoom from '../Popup/AddRoom'
import DetailRoom from '../Popup/DetailRoom'
import EditRoom from '../Popup/EditRoom'
import DeleteRoom from '../Popup/DeleteRoom'

const SERVER = 'http://localhost:3001/'
export default class ListRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'unAuth': false,
            'editId': '',
            'search': '',
            'serverError': false,
            'data': [], // Lưu thông tin danh sách các phòng
            'pagination': {  // Lưu thông tin phân trang
                "total": 0,
                "perPage": 8,
                "to": 0,
                "lastPage": 0,
                "currentPage": 0,
                "from": 0
            },
        }
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
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState({ name: value })
        console.log(this.state)
    }
    render() {
        if (this.state.serverError === true) {
            return <Page500 />
        }
        if (this.state.unAuth === true) {
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
                            <DeleteRoom rid={room.Id} />
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
        var doubleBack = '', back = '', next = '', doubleNext = '';
        var currentPage = this.state.pagination.currentPage;
        var lastPage = this.state.pagination.lastPage;
        if (currentPage > 2) {
            doubleBack = <li className="page-item">
                <a className="page-link" href="#">{currentPage - 2}</a>
            </li>
        }
        if (currentPage > 1) {
            back = <li className="page-item">
                <a className="page-link" href="#">{currentPage - 1}</a>
            </li>
        }
        if (lastPage > currentPage) {
            next = <li className="page-item">
                <a className="page-link" href="#">{currentPage + 1}</a>
            </li>
        }
        if (lastPage - currentPage > 1) {
            doubleNext = <li className="page-item">
                <a className="page-link" href="#">{currentPage + 2}</a>
            </li>
        }
        return (
            <div className="content-container container-fluid">
                <div className="search-bar">
                    <p className="search-bar-header" style={{ marginLeft: '16px' }}><b>Tìm kiếm phòng khách sạn:</b></p>
                    <form method="get">
                        <div className="row">
                            <div className="col-10 autoComplete" id="autoComplete">
                                <input value={this.state.search} onChange={e => this.changeHandler(e)} id="inp" autoComplete="off" type="text" name="search" placeholder="Nhập tên phòng" className="form-control" autoComplete="off" />
                            </div>
                            <div className="col-2">
                                <button className="btn btn-primary text-search" type="submit"><i className="fas fa-search"></i>
                                    &nbsp;Tìm kiếm</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="post-list">
                    {roomList}
                </div>
                <div className="paging" style={{ position: "relative" }}>
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item ">
                                <a className={'page-link' + (currentPage === 1) ? 'disable' : ''} href="#">
                                    &#10094;&#10094;
                                 </a>
                            </li>
                            <li className="page-item">
                                <a className={'page-link' + (currentPage === 1) ? 'disable' : ''} href="#">
                                    &#10094;
                                </a>
                            </li>
                            {doubleBack}
                            {back}
                            <li className="page-item  active">
                                <a className="page-link">{currentPage}</a>
                            </li>
                            {next}
                            {doubleNext}
                            <li className="page-item">
                                <a className={'page-link' + (currentPage === lastPage) ? 'disable' : ''} href="/<?<?php echo $currentPage + 1 ?>"> &#10095;</a>
                            </li>
                            <li className="page-item ">
                                <a className={'page-link' + (currentPage === lastPage) ? 'disable' : ''} href="/<?<?php echo $lastPage ?>">&#10095;&#10095;</a>
                            </li>
                        </ul >
                    </nav >
                </div >
            </div >
        );

    }
    componentDidMount = async () => {
        try {
            let result = await api.getlistroom(1)
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
}