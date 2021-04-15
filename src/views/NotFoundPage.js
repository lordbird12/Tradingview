import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import API from '../api/API';

export default class NotFoundPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            menu_view_1: [],

        }

    }

    componentDidMount() {


        const params = {
            username: localStorage.getItem("username"),
            menu_id: 1
        };

        axios
            .post(API.GET_EMPLOYEE_ONE_GANT_MENU, params, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                // console.log(res.data.data);
                this.setState({
                    menu_view_1: res.data.data.view,
                });

                if (res.data.data.view == 1) {

                } else {
                    window.localStorage.clear();
                    this.props.history.push("/");
                    window.location.reload(false);
                }
            })
            .catch(err => {
                this.setState({
                    menu_view_1: [],
                });
                window.localStorage.clear();
                this.props.history.push("/");
                window.location.reload(false);
            });
    }


    render() {
        return (

            <div class="main-wrapper">

                <div class="error-box">
                    <h1>404</h1>
                    <h3><i class="fa fa-warning"></i> Oops! Page not found!</h3>
                    <p>The page you requested was not found.</p>
                    <Link to="/" class="btn btn-custom">Back to Home</Link>
                </div>

            </div>

        )
    }
}
