import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Page404 from "./components/Page404/Page404";
import Page500 from "./components/Page500/Page500";
import jwt_decode from "jwt-decode";
import AuthContext from "./context/authContext";
class App extends React.Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("accessToken");
    let user = null;
    if (token) {
      try {
        user = jwt_decode(token);
      } catch (err) {
        console.log(err);
      }
    }
    this.state = {
      user: user,
      token: token,
      authContext: {
        updateAuth: this.updateAuth,
        auth: null,
      },
    };
  }
  setToken = (newValue) => {
    this.setState({ token: newValue, user: jwt_decode(newValue) });
  };
  render() {
    return (
      <AuthContext.Provider value={this.state.authContext}>
        <div className="wrapper">
          <Header user={this.state.user} setToken={this.setToken} />
          <BrowserRouter>
            <Switch>
              <Route
                path="/login"
                render={(props) => (
                  <Login
                    setToken={this.setToken}
                    user={this.state.user}
                    {...props}
                  />
                )}
              />
              <Route
                path="/home"
                render={(props) => <Home user={this.state.user} {...props} />}
              />
              <Route path="/:unknown">
                <Page404 />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
          <Footer user={this.state.user} />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
