import React, { Component } from "react";

import axios from 'axios';
// import qs from 'qs';

import API from '../api/API';
import Pagination from './Pagination';
// import Img from '../path/Img';
// import { Link } from "react-router-dom";
import Progressbar from './progressbar';
import SearchResults from 'react-filter-search';

export default class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            AllPage: [],
            pageOfItems: [],

            permission_id: this.props.permission_ID,

            PermissionList: [],
            employee_seach: '',
            employee_sort: 'Ascending order'

        }


    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

    }

   
    onSort = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        const params = {
            permission_id: this.state.permission_id,
            employee_sort: e.target.value
        };

        axios.post(API.GET_PERMISSION_EMPLOYEE, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            console.log(res.data.data)
            this.setState({
                // PermissionEmployeeList: res.data.data,
                AllPage: res.data.data,
                progressOpen: false


            });

        }).catch(err => {
            this.setState({
                AllPage: [],
                progressOpen: false
            });
        });

       
    }






    componentDidMount() {


        const params = {
            permission_id: this.state.permission_id,
            employee_sort: ''
        };

        axios.post(API.GET_PERMISSION_EMPLOYEE, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            console.log(res.data.data)
            this.setState({
                // PermissionEmployeeList: res.data.data,
                AllPage: res.data.data,
                progressOpen: false


            });

        }).catch(err => {
            this.setState({
                AllPage: [],
                progressOpen: false
            });
            window.localStorage.clear();
            this.props.history.push('/');
            window.location.reload(false)
        });

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

        return (
            <div>
                <Progressbar
                    Open={this.state.progressOpen}
                />
                <div class="content">
                    <div class="animated fadeIn">
                        <div class="row">
                            <div class="col-12 col-md-12">
                                <div class="card">
                                    <div >
                                        <div class="row">
                                            <div class="col-2 col-md-1"><label for="text-input" class=" form-control-label">Sreach</label></div>

                                            <div class="col-4 col-md-4">
                                                <select
                                                    name="employee_sort"
                                                    id="select"
                                                    class="form-control"
                                                    onChange={this.onSort.bind(this)}
                                                >
                                                    <option className="text-dark" value="Ascending order">เรียงจากน้อยไปมาก</option>
                                                    <option className="text-dark" value="Descending order">เรียงจากมากไปน้อย</option>
                                                </select>
                                            </div>

                                            <div class="col-6 col-md-4">
                                                <input type="text"
                                                    id="text-input"
                                                    name="employee_seach"
                                                    placeholder="Sreach"
                                                    class="form-control"
                                                    onChange={this.onchange.bind(this)}
                                                />
                                            </div>

                                        </div>
                                        <div class="row my-4">
                                            <div class="col-12 col-md-12">
                                                <table class="table text-center">
                                                    <thead style={{ backgroundColor: '#212529', color: 'white' }}>
                                                        <tr>
                                                            <th>ลำดับ</th>
                                                            <th>username</th>
                                                            <th >ชื่อ</th>
                                                            <th >ชื่อเล่น</th>
                                                            <th >เพิ่มโดย</th>
                                                        </tr>
                                                    </thead>
                                                    <SearchResults
                                                        value={this.state.employee_seach}
                                                        data={this.state.pageOfItems}
                                                        renderResults={results => (
                                                            <tbody>
                                                                {results.map((value, index) => (
                                                                    <tr key={index}>
                                                                        <td>  <span class="text-dark">{value.No}</span> </td>
                                                                        <td> <span class="text-dark">{value.username}</span> </td>
                                                                        <td> <span class="text-dark">{value.full_name}</span> </td>
                                                                        <td> <span class="text-dark">{value.nick_name}</span> </td>
                                                                        <td> <span class="text-dark">{value.created_by}</span> </td>
                                                                    </tr>
                                                                ))}

                                                            </tbody>
                                                        )}
                                                    />
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Pagination items={this.state.AllPage} onChangePage={this.onChangePage.bind(this)} />
                    </div>
                </div>
            </div>

        );
    }
}
