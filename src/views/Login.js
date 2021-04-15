import React, { Component } from "react";

import axios from 'axios';
// import qs from 'qs';

import API from '../api/API';
// import Img from '../path/Img';


import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

            username: "",
            password: "",

        }
        this.onchange = this.onchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value)

    }

    handleSubmit = e => {
        e.preventDefault();
        let { username, password } = this.state

        const params = {
            username,
            password
        };
        console.log(params)

        axios.post(API.Login, params, {
            headers: {
                'Content-Type': 'application/json',

            }
        })
            .then(res => {
                // console.log(res.data)

                if (res.data.code == 200) {

                    localStorage.setItem('username', res.data.data.username);
                    localStorage.setItem('token', res.data.token);

                    this.props.history.push("/Home");
                    window.location.reload(false);

                } else {
                    alert('Incorrect username or password')
                    window.localStorage.clear();
                    this.props.history.push("/");
                    window.location.reload(false);
                }

            }).catch(err => { window.location.reload(false); });



    }

    componentDidMount() {
    }


    render() {
        return (
            <div class="account-page">

                <div class="main-wrapper">
                    <div class="account-content">
                        {/* <a href="job-list.html" class="btn btn-primary apply-btn">Apply Job</a> */}
                        <div class="container">


                            <div class="account-logo">
                                <h1>Tradingview</h1>
                            </div>


                            <div class="account-box">
                                <div class="account-wrapper">
                                    <h3 class="account-title">Login</h3>
                                    <p class="account-subtitle">Access to our dashboard</p>


                                    <form action="index.html">

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col">
                                                    <label>Username</label>
                                                </div>

                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                placeholder="username"
                                                onChange={this.onchange}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.onchange}
                                            />
                                        </div>
                                        <div class="form-group text-center">
                                            <button class="btn btn-primary account-btn" type="submit" onClick={this.handleSubmit}>Login</button>
                                        </div>
                                        {/* <div class="account-footer">
                                            <p>Don't have an account yet? <a href="register.html">Register</a></p>
                                        </div> */}
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>








        );
    }
}
