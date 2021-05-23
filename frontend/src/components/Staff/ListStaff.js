import React from 'react'
import { Redirect } from 'react-router'
import api from '../../Api/api'
import Page500 from '../Page500/Page500'
import '../../css/liststaff.css'
import AddStaff from './AddStaff'
import DetailStaff from './DetailStaff'
import EditStaff from './EditStaff'
import DeleteStaff from './DeleteStaff'
import Paginator from '../Paginator/paginator'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import $ from 'jquery'

class ListStaff extends React.Component {
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
        document.title = "MyHotel - Quản lý nhân viên"
        await this.getData(1)
        $('#alert').on('hide.bs.modal', (e) => {
            if (e.target.id === 'alert') {
                console.log('reloading')
                this.getData(this.state.pagination.currentPage)
            }
        })
    }

    getData = async (page) => {
        try {
            let result = '';
            if (this.state.search) {
                result = await api.searchliststaff(page, this.state.search)
            } else {
                result = await api.getliststaff(page)
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
            let result = await api.searchStaffName(1, string)
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
                result = await api.searchliststaff(this.state.pagination.currentPage, this.state.search)
            } else {
                result = await api.getliststaff(this.state.pagination.currentPage)
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
        if (this.state.serverError === true) {
            return <Page500 />
        }
        if (this.state.unauthorized === true) {
            return <Redirect to={{ pathname: "/login", state: { from: 'room' } }} />
        }
        var staffList = [];
        staffList.push(
            <AddStaff reloadpage={this.reloadPage} key={-1} />
        )
        if (this.state.data.length === 0) {
            staffList.push(
                <div className="row text-center" key={-2}>
                    <div className="col" style={{ marginTop: '54px' }}>
                        <h3>Chưa có nhân viên nào</h3>
                    </div>
                </div>
            )
        }
        this.state.data.forEach((staff, index) => {
            staffList.push(
                <div className="short-post staff row" key={index}>
                    <a href="/>">
                        <img src={'/staff.png'} alt="Room views" style={{ imageResolution: '300dpi' }} width="180px" />
                    </a>
                    <div className="short-info staff">
                        <a href="/detailpost?postid=<?php echo $post->postid ?>">
                            <p className="contest-name">{staff.name}</p>
                        </a>
                        <div className="owner-option row">
                            <DetailStaff reloadpage={this.reloadPage} sid={staff.Id} />
                            <EditStaff reloadpage={this.reloadPage} sid={staff.Id} />
                            <DeleteStaff reloadpage={this.reloadPage} sid={staff.Id} />
                        </div>
                        <p><b>Vị trí làm việc:</b> {staff.role}</p>
                        <p><b>Ngày sinh:</b> {new Date(staff.birthday).toLocaleDateString()}</p>
                        <p><b>Số CMT/CCCD:</b> {staff.idNumber}</p>
                        <p><b>Số điện thoại:</b> {staff.phonenumber}</p>
                        <p><b>Địa chỉ:</b> {staff.address}</p>
                        <p><b>Trạng thái:</b> <span className={(staff.status === "Đã thôi việc") ? "text-warning" : ''}> {staff.status}</span></p>
                    </div>
                </div>
            )
        });
        return (
            <div className="content-container container-fluid">
                <div className="search-bar">
                    <p className="search-bar-header" style={{ marginLeft: '16px' }}><b>Tìm kiếm nhân viên:</b></p>
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
                                placeholder='Nhập tên nhân viên cần tìm kiếm'
                            />

                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary text-search" onClick={this.clickSearch}><i className="fas fa-search"></i>
                                    &nbsp;Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div className="post-list">
                    {staffList}
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
export default ListStaff