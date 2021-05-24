import '../../css/home.css'
import React from "react"
import api from '../../Api/api'
import {Redirect} from 'react-router-dom'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        if (!this.props.user) {
            return <Redirect
                to={{ pathname: "/login", state: { from: '/dashboard' } }}
            ></Redirect>
        }
        return (
            <Redirect to="/dashboard"></Redirect>
        )
    }

}



