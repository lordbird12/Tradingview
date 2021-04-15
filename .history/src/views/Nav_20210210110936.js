import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';

import API from '../api/API';

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = e => {
        e.preventDefault();

        const params = {
            token: localStorage.getItem('token')
        };

        axios.post(API.Logout, params, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                console.log(res.data)

                if (res.data.code == 200) {

                    alert('ทำการออกจากระบบสำเร็จ')
                    window.localStorage.clear();
                    this.props.history.push("/");
                    // window.location.reload(false);

                }

            }).catch(err => {
                window.localStorage.clear();
                this.props.history.push("/");
                //     window.location.reload(false);

            });

    }

    render() {

        return (
            <div>
                <div class="header">
                    <div class="header-left">
                        <Link to="/Home"  class="logo">
                            <img src="reward-logo1.png" width="70" height="55" alt="" />
                        </Link>
                    </div>

                    <a id="toggle_btn" href="javascript:void(0);">
                        <span class="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>

                    <a id="mobile_btn" class="mobile_btn" href="#sidebar"
                    ><i class="fa fa-bars"></i></a>


                    <ul class="nav user-menu">
                        <li class="nav-item dropdown has-arrow main-drop">
                            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                                <span>{localStorage.getItem('username')}</span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">My Profile</a>
                                <a class="dropdown-item" href="#">Settings</a>
                                <a class="dropdown-item" onClick={this.handleLogout.bind(this)}>Logout</a>
                            </div>
                        </li>
                    </ul>

                    <div class="dropdown mobile-user-menu">
                        <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        ><i class="fa fa-ellipsis-v"></i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">My Profile</a>
                            <a class="dropdown-item" href="#">Settings</a>
                            <a class="dropdown-item" href="login">Logout</a>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default withRouter(Nav)











