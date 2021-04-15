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
                <div className="header">
                    <div className="header-left">
                        <Link to="/Home"  className="logo">
                            <img src="reward-logo1.png" width="70" height="55" alt="" />
                        </Link>
                    </div>

                    <a id="toggle_btn" href="javascript:void(0);">
                        <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>

                    <a id="mobile_btn" className="mobile_btn" href="#sidebar"
                    ><i className="fa fa-bars"></i></a>


                    <ul className="nav user-menu">
                        <li className="nav-item dropdown has-arrow main-drop">
                            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                                <span>{localStorage.getItem('username')}</span>
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">My Profile</a>
                                <a className="dropdown-item" href="#">Settings</a>
                                <a className="dropdown-item" onClick={this.handleLogout.bind(this)}>Logout</a>
                            </div>
                        </li>
                    </ul>

                    <div className="dropdown mobile-user-menu">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false"
                        ><i className="fa fa-ellipsis-v"></i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#">My Profile</a>
                            <a className="dropdown-item" href="#">Settings</a>
                            <a className="dropdown-item" href="login">Logout</a>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default withRouter(Nav)











