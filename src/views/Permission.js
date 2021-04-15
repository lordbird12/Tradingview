import React, { Component } from "react";

import axios from 'axios';
// import qs from 'qs';

import API from '../api/API';
// import Img from '../path/Img';
// import { Link } from "react-router-dom";
import Progressbar from './progressbar';
import DailogDeletePermission from './DailogDeletePermission'
import ModalMenu from './ModalMenu';
import ModalPermissionEm from './ModalPermissionEm';
import ModalEditPermissionEm from './ModalEditPermissionEm';
import AddPermission from './addPermission'

export default class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            menu_view_5: [],
            menu_save_5: [],
            menu_edit_5: [],
            menu_delete_5: [],

            PermissionList: [],
            permission_name: ""

        }
    }


    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value)

    }

    updateComponent = (props) => {

        this.setState({
            permission_name: ""
        });

        this.componentDidMount()
    }


    componentDidMount() {

        //check login
        const paramsLogin = {};

        axios
            .post(API.CHECK_lOGIN, paramsLogin, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {

                if (res.data.code == 200) {

                    const params = {
                        username: localStorage.getItem("username"),
                        menu_id: 5
                    };

                    axios
                        .post(API.GET_EMPLOYEE_ONE_GANT_MENU, params, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        .then(res => {
                            console.log(res.data.data);
                            this.setState({
                                menu_view_5: res.data.data.view,
                                menu_save_5: res.data.data.save,
                                menu_edit_5: res.data.data.edit,
                                menu_delete_5: res.data.data.delete,

                            });


                            if (res.data.data.view == 1) {


                                //get permission
                                axios.get(API.GET_PERMISSION, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {

                                    console.log(res.data.data)
                                    this.setState({
                                        PermissionList: res.data.data,
                                        progressOpen: false,
                                    });


                                }).catch(err => {
                                    this.setState({
                                        PermissionList: [],
                                        progressOpen: false,
                                    });

                                });

                                //

                            } else {
                                window.localStorage.clear();
                                this.props.history.push("/");
                                window.location.reload(false);
                            }

                        })
                        .catch(err => {
                            this.setState({
                                menu_view_5: [],
                                menu_save_5: [],
                                menu_edit_5: [],
                                menu_delete_5: [],
                            });
                            window.localStorage.clear();
                            this.props.history.push("/");
                            window.location.reload(false);
                        });


                } else {
                    window.localStorage.clear();
                    this.props.history.push("/");
                    window.location.reload(false);
                }

            })
            .catch(err => {

                window.localStorage.clear();
                this.props.history.push("/");
                window.location.reload(false);
            });

    }


    render() {

        return (
            <div>
                <Progressbar
                    Open={this.state.progressOpen}
                />

                <div class="page-wrapper">
                    <div class="content container-fluid">

                        {/* //header */}
                        <div class="page-header">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h3 class="page-title">Permission</h3>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            Main Menu
                                        </li>
                                        <li class="breadcrumb-item active">Permission</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        {/* //header */}

                        {/* body */}
                        <div class="row">
                            <div class="col-12 col-md-5" style={{ display: this.state.menu_save_5 == 1 ? "" : "none" }}>
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0">Add Permission</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-5 col-md-5">
                                                <h4>Permission Name</h4>
                                            </div>

                                            <div class="col-6 col-md-5">
                                                <input type="text"
                                                    id="permission_name"
                                                    name="permission_name"
                                                    placeholder="Permission Name"
                                                    class="form-control"
                                                    onChange={this.onchange.bind(this)}
                                                />
                                            </div>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-12 col-md-12">
                                                <AddPermission
                                                    permission_name={this.state.permission_name}
                                                    updateComponent={this.updateComponent}
                                                />
                                            </div>
                                        </div>

                                    </div>






                                </div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title mb-0">Permission</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-striped mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>PERMISSION NAME</th>
                                                        <th>MENU</th>
                                                        <th>DEL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.state.PermissionList.map((value, index) => (
                                                        <tr key={index}>
                                                            <td>  <span class="name">{value.No}</span> </td>
                                                            <td> <span class="name">{value.name}</span> </td>
                                                            <td>
                                                                <ModalMenu
                                                                    permissionID={value.id}
                                                                    menu_edit={this.state.menu_edit_5}
                                                                />
                                                            </td>

                                                            <td style={{ display: value.id == 1 ? "none" : "" }}>
                                                                <DailogDeletePermission
                                                                    permissionID={value.id}
                                                                    updateComponent={this.updateComponent}
                                                                    menu_delete={this.state.menu_delete_5}
                                                                />

                                                            </td>
                                                            <td style={{ display: value.id == 1 ? "" : "none" }}></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* body */}
                    </div>
                </div>

            </div>
        );
    }
}
