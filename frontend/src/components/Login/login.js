import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../css/login.css';
import api from '../../Api/api'
import Page500 from '../Page500/Page500'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    var successRegister = false
    if (this.props.location.state && this.props.location.state.successRegister) {
      successRegister = this.props.location.state.successRegister
    }
    this.state = {
      "serverError": false,
      "formData": {},
      "logInFailed": false,
      "successRegister": successRegister,
      "successLogin": false
    }
  }
  render() {
    var failedLogIn = ''
    var successRegister = ''
    if (this.props.user != null){
      return <Redirect to="/"></Redirect>
    }
    if (this.state.serverError === true) {
      return <Page500 />
    }

    if (this.state.successLogin === true){
      let returnPage = '/home'
      if (this.props.location.state && this.props.location.state.from){
        returnPage = this.location.state.from
      }
      return <Redirect to={returnPage}></Redirect>
    }


    if (this.state.successRegister === true) {
      successRegister = <div className="row success-register text-primary">
        Bạn đã đăng ký thành công và có thể đăng nhập
              </div>;
    }

    if (this.state.logInFailed === true) {
      failedLogIn = <div className="row failed-login">
        Tài khoản hoặc mật khẩu không đúng
      </div>;
      successRegister = '';
    }
    return (
      <div className="content-container container-fluid">
        <div className="login-form-container">
          <h1 className="login-heading">Nhập thông tin tài khoản để đăng nhập</h1>
          <form className="login-form" acction="/login" method="post" acceptCharset="UTF-8" onSubmit={e => this.logInUser(e)}>
            {failedLogIn}
            {successRegister}
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>Tên đăng nhập:</b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <input type="text" onChange={e => this.changeHandler(e)} className="form-control" required="required" name="username" placeholder="Nhập tên tài khoản" />
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>Mật khẩu:</b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <input type="password" onChange={e => this.changeHandler(e)} className="form-control" required="required" name="password" placeholder="Nhập mật khẩu" />
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Đăng nhập" className="btn btn-primary" style={{ margin: "auto", marginTop: "24px" }} />
            </div>
          </form>
        </div>
      </div>
    );
  }
  changeHandler(e) {
    let name = e.target.name;
    let value = e.target.value;
    let temp = this.state.formData;
    temp[name] = value;
    this.setState({ 'formData': temp })
  }
  componentDidMount() {
    document.title = "MyHotel - Đăng nhập"
  }
  logInUser = async (e) => {
    let data = this.state.formData
    e.preventDefault()
    try {
      var response = await api.login(data);
      if (response.status === 200) {
        this.setState({'successLogin': true})
        localStorage.setItem('accessToken', response.data.accessToken)
        await this.props.setToken(response.data.accessToken)
        return
      }
      if (response.status === 403){
        this.setState({'logInFailed': true})
      }
    } catch (err) {
      console.log(err)
      this.setState({ "serverError": true })
    }
  }
}

// async function loginUser(credentials) {
//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then((data) => data.json())
// }

// export default function Login({setToken}) {
//   const [username, setUserName] = useState();
//   const [password, setPassword] = useState();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = await loginUser({
//       username,
//       password
//     });
//     setToken(token);
//   }

//   return(
//     <div className="login-wrapper">
//       <h1>Please Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <p>Username</p>
//           <input type="text" onChange={e => setUserName(e.target.value)} />
//         </label>
//         <label>
//           <p>Password</p>
//           <input type="password" onChange={e => setPassword(e.target.value)} />
//         </label>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };