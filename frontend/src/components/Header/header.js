import '../../css/header.css'
import React from 'react'
import api from '../../Api/api'

export default class Header extends React.Component {
    render() {
        var user = this.props.user
        var  login, userProfile = ''
        if (user != null) {

            userProfile = <div className="dropdown show">
                <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user" style={{ "fontSize": "24px" }}></i> &nbsp;<span>{user.username}</span> &nbsp;
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#" onClick={this.logOut}>
                        <p><i className="fas fa-sign-out-alt"></i>&nbsp; Đăng xuất</p>
                    </a>
                </div>
            </div>
        } else {
            login = <a className="login no-user" href="/login">
                <p>Đăng nhập</p>
            </a>;
        }
        return (
            <div className="header">
                <div className="Logo">
                    <a className="home" style={{    marginTop: 0}} href="/">
                        <p className="logo-name"><i className="fas fa-home"></i>&nbsp;MyHotel</p>
                    </a>
                </div>
                <div className="user-navigation">

                </div>
                <div className="user">
                    {login}
                    {userProfile}
                </div>
            </div>
        );
    }
    logOut = async () => {
        localStorage.removeItem('accessToken')
        try {
            await api.logout()
        } catch (err) {
            console.log(err)
        }
        window.location.replace("/");
    }
}

