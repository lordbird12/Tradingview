import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import API from '../api/API';
import DailogAddEmployee from './DailogAddEmployee'
import Progressbar from './progressbar';
import { Link } from 'react-router-dom';

export default class addEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            username: '',
            password: '',
            password_confrim: '',
            full_name: '',
            nick_name: '',

            permission_id: '',
            PermissionList: [],

        }
    }

    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value)

    }



    componentDidMount() {


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
                progressOpen: false,
            });


        }).catch(err => {
            this.setState({
                PermissionList: [],
                progressOpen: false,
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
                <Progressbar
                    Open={this.state.progressOpen}
                />


                <div class="card-body">
                    <form>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="select" class=" form-control-label">permission</label></div>
                            <div class="col-12 col-md-8">
                                <select class="select" name="permission_id" id="select" class="form-control" onChange={this.onchange.bind(this)}>
                                    <option className="text-dark" value=" ">Please select a permission</option>
                                    {PermissionDopdown}
                                </select>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Username</label></div>
                            <div class="col-12 col-md-8"><input type="text" id="text-input" name="username" placeholder="Username" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Password</label></div>
                            <div class="col-12 col-md-8"><input type="password" id="text-input" name="password" placeholder="์Password" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Confirm Password</label></div>
                            <div class="col-12 col-md-8"><input type="password" id="text-input" name="password_confrim" placeholder="Confirm Password" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                            <div class="col-12 col-md-8"><input type="text" id="text-input" name="full_name" placeholder="Full Name" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Nick Name</label></div>
                            <div class="col-12 col-md-8"><input type="text" id="text-input" name="nick_name" placeholder="Nick Name" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="text-right">
                            <DailogAddEmployee
                                permission_id={this.state.permission_id}
                                username={this.state.username}
                                password={this.state.password}
                                password_confrim={this.state.password_confrim}
                                full_name={this.state.full_name}
                                nick_name={this.state.nick_name}

                                menu_save={this.props.menu_save}
                                updateComponent={this.props.updateComponent}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
