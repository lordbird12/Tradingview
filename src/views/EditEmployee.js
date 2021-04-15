import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import TimeField from "react-simple-timefield";
import CreatableSelect from "react-select/creatable";
import { Button } from 'reactstrap';

import API from "../api/API";
import DialogEditEmployee from "./DialogEditEmployee";
import Progressbar from "./progressbar";

export default class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressOpen: true,

            EMID: this.props.EMID,
            DetailEmployee: [],
            PermissionList: [],

            full_name: "",
            nick_name: "",
            permission_id:"",

        };
    }

    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value);
    };


    cancel = e => {
        e.preventDefault();
        this.props.toggle()



    }

    componentDidMount() {
        //get employee
        const params = {
            user_id: this.state.EMID
        };

        axios
            .post(API.GET_ONE_USER, params, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res.data.data);
                this.setState({
                    DetailEmployee: res.data.data,

                    full_name: res.data.data.full_name,
                    nick_name: res.data.data.nick_name,

                    permission_id: res.data.data.permission_id,

                    progressOpen: false
                });
            })
            .catch(err => {
                this.setState({
                    DetailEmployee: [],
                    progressOpen: false
                });
            });

        //


        //get dopdown permission
        axios.get(API.GET_PERMISSION, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            console.log(res.data.data)
            this.setState({
                PermissionList: res.data.data,
            });


        }).catch(err => {
            this.setState({
                PermissionList: [],
            });

        });
        //


    }

    render() {

        const { PermissionList } = this.state;

        let PermissionDopdown = PermissionList.length > 0
            && PermissionList.map((value, index) => {
                return (
                    <option className="text-dark" key={index} value={value.id}>{value.name}</option>

                )
            }, this);
        return (
            <div>
                <Progressbar Open={this.state.progressOpen} />

                <div class="content">
                    <div class="animated fadeIn">
                        <div class="row">
                            <div class="col-12 col-md-12">
                                <div class="card card-block">
                                    <div class="card-body" style={{ fontSize: 16 }}>
                                        <div class="row">

                                            <div class="col col-md-12">
                                                <div class="row form-group">
                                                    <div class="col col-md-4">
                                                        <label for="text-input" class=" form-control-label">
                                                            Name
                                                        </label>
                                                    </div>
                                                    <div class="col-12 col-md-8">
                                                        <input
                                                            type="text"
                                                            id="text-input"
                                                            name="full_name"
                                                            placeholder="Full Name"
                                                            class="form-control"
                                                            value={this.state.full_name}
                                                            onChange={this.onchange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col col-md-4">
                                                        <label for="text-input" class=" form-control-label">
                                                            Nick Name
                                                        </label>
                                                    </div>
                                                    <div class="col-12 col-md-8">
                                                        <input
                                                            type="text"
                                                            id="text-input"
                                                            name="nick_name"
                                                            placeholder="Nick Name"
                                                            class="form-control"
                                                            value={this.state.nick_name}
                                                            onChange={this.onchange.bind(this)}
                                                        />
                                                    </div>

                                                </div>
                                                <div class="row form-group">
                                                    <div class="col col-md-4">
                                                        <label for="text-input" class=" form-control-label">
                                                            Permission
                                                        </label>
                                                    </div>
                                                    <div class="col-12 col-md-8">
                                                        <select
                                                            name="permission_id"
                                                            id="select"
                                                            className="form-control"
                                                            onChange={this.onchange.bind(this)}
                                                            value={this.state.permission_id}
                                                        >
                                                            <option className="text-dark" value="">All</option>
                                                            {PermissionDopdown}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row my-2">
                                            <div class="col-6 col-md-6">
                                                <DialogEditEmployee
                                                    user_id={this.state.EMID}
                                                    full_name={this.state.full_name}
                                                    nick_name={this.state.nick_name}
                                                    permission_id={this.state.permission_id}
                                                    update_Component={this.props.update_Component}

                                                />
                                            </div>
                                            <div class="col-6 col-md-6">
                                                <Button className="btn btn-flat m-b-30 m-t-30 bg-dark" onClick={this.cancel} size='sm' style={{ color: "white", width: 100 }}  >CANCEL</Button>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>





                    </div>
                </div>
            </div>
        );
    }
}
