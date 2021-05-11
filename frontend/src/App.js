import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Redirect } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home'
import Login from './components/Login/login'
import Header from './components/Header/header'
import Footer from './components/Footer/footer'
import Page404 from './components/Page404/Page404'
import Menu from './components/SideMenu/sideMenu'
import Page500 from './components/Page500/Page500'
import jwt_decode from "jwt-decode";
import QuickBooking from './components/QuickBooking/QuickBooking'
import DepartureList from './components/DepartureList/DepartureList'
import DepartureDetail from './components/DepartureDetail/DepartureDetail'
import ListGuest from './components/Guest/ListGuest'
import ListRoom from './components/Room/ListRoom'

class App extends React.Component {
  constructor(props) {
    super(props)
    let token = localStorage.getItem('accessToken');
    let user = null
    if (token) {
      try {
        user = jwt_decode(token)
      } catch (err) {
        console.log(err)
      }
    }
    this.state = {
      user: user,
      token: token,
    }
  }

  setToken = (newValue) => {
    this.setState({ 'token': newValue, 'user': jwt_decode(newValue) })
  }


  render() {
    return (
      <div className="wrapper">
        <Header user={this.state.user} setToken={this.setToken} />
        <div className='content-wrapper'>
          <BrowserRouter>
            <Menu setPage={this.setPage} />
            <Switch>

              <Route path="/login" render={(props) => <Login setToken={this.setToken} user={this.state.user} {...props} />} />
              <Route path="/home" render={(props) => <Home user={this.state.user} {...props} />} />
              <Route path="/room" render={(props) => <ListRoom user={this.state.user} {...props} />} />
              <Route path="/guest" render={(props) => <ListGuest user={this.state.user} {...props} />} />
              <Route path="/quickbooking" render={(props) => <QuickBooking user={this.state.user} {...props} />} />
              <Route path="/checkin" render={(props) => <DepartureList user={this.state.user} {...props} />} />
              <Route path="/departuredetail/:id" render={(props) => <DepartureDetail user={this.state.user} {...props} />} />
              <Route path="/:unknown">
                <Page404 />
              </Route>

              <Route path="/" render={(props) => <Home user={this.state.user} {...props} />}>
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <Footer user={this.state.user} />
      </div>
    );
  }
}

export default App;
