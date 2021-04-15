import React, { Component } from "react";
import axios from 'axios';
import SearchResults from 'react-filter-search';
import Pagination from './Pagination';
import API from '../api/API';
import Progressbar from './progressbar';
import { Link } from "react-router-dom";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressOpen: true,

            menu_view_1: [],

            list_group_exp: [],
            list_new_member: [],
            list_reward: [],

            count_member: '0',
            count_new_member: '0',
            count_member_trans_reward: '0',
            count_member_trans_reward_appove: '0',

        }

    }


    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    componentDidMount() {

        axios.get(API.GET_COMPANY, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then(res => {
      
            // console.warn(res.data.data)
            localStorage.setItem('companylist',JSON.stringify(res.data.data));
            // companylist.push(res.data.data);
      
          }).catch(err => {
            // console.err(err);
      
          });

    
        const script = document.createElement("script");

        script.src = "assets/js/chart.js";
        script.async = true;
    
        document.body.appendChild(script);
       
        // const params = {
        //     username: localStorage.getItem("username"),
        //     menu_id:1
        // };

        // axios
        //     .post(API.GET_EMPLOYEE_ONE_GANT_MENU, params, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: "Bearer " + localStorage.getItem("token")
        //         }
        //     })
        //     .then(res => {
        //         console.log(res.data.data);
        //         this.setState({
        //             menu_view_1: res.data.data.view,
        //         });

        //         if (res.data.data.view == 1) {

        //             //get home page
        //             axios.get(API.GET_HOME_PAGE, {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     Authorization: 'Bearer ' + localStorage.getItem('token')
        //                 }
        //             }).then(res => {

        //                 this.setState({

        //                     list_group_exp: res.data.list_group_exp,
        //                     list_new_member: res.data.list_new_member,
        //                     list_reward: res.data.list_reward,

        //                     count_member: res.data.count_member,
        //                     count_new_member: res.data.count_new_member,
        //                     count_member_trans_reward: res.data.count_member_trans_reward,
        //                     count_member_trans_reward_appove: res.data.count_member_trans_reward_appove,

        //                     progressOpen: false,
        //                 });


        //             }).catch(err => {
        //                 this.setState({
        //                     list_group_exp: [],
        //                     list_new_member: [],
        //                     list_reward: [],

        //                     count_member: '',
        //                     count_new_member: '',
        //                     count_member_trans_reward: '',
        //                     count_member_trans_reward_appove: '',


        //                     progressOpen: false,
        //                 });

        //             });
        //             //

        //         } else {
        //             window.localStorage.clear();
        //             this.props.history.push("/");
        //             window.location.reload(false);
        //         }
        //     })
        //     .catch(err => {
        //         this.setState({
        //             menu_view_1: [],
        //         });
        //         window.localStorage.clear();
        //         this.props.history.push("/");
        //         window.location.reload(false);
        //     });


    }


    render() {


        return (

            <div class="page-wrapper">

                <div class="content container-fluid">

                    <div class="page-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="page-title">Welcome Admin!</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <marquee><span>ระบบจะทำการถอนเงินให้ลูกค้าทุกๆ วันจันทร์หลังเวลา 00:00 น. เหลือเวลาอีก <span className="text-warning">{this.state.date_pre_withdraw}</span> วัน !!! จะถึงเวลาทำรายการแจ้งถอนเงินลูกค้าแล้ว</span></marquee>
                    <br />
                    <br /> */}


                    <div class="row filter-row">
                        {/* <div class="col-md-4 col-sm-4 col-lg-v col-xl-4">
                                    <a href="#" class="btn btn-secondary btn-block"> Add Company </a>
                                </div> */}
                        {/* <div class="col-md-4 col-sm-4 col-lg-v col-xl-4">
                            <a href="#" class="btn btn-secondary btn-block"> Import Daily Data </a>
                        </div> */}
                    </div>

                    <div class="row mt-5">
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-cubes"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>112</h3>
                                        <span>Company</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-usd"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>44</h3>
                                        <span>Max</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-diamond"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>37</h3>
                                        <span>Min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                            <div class="card dash-widget">
                                <div class="card-body">
                                    <span class="dash-widget-icon"><i class="fa fa-user"></i></span>
                                    <div class="dash-widget-info">
                                        <h3>218</h3>
                                        <span>User</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">Top 10 Company</h3>
                                            <div id="company-charts"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">Top 10 High</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-nowrap custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>SYMBOL</th>
                                                    <th>HIGH</th>
                                                    <th>OPEN</th>
                                                    <th>CHAGE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td><a href="invoice-view.html">PRF3A</a></td>
                                                    <td>1,075</td>
                                                    <td>1,015</td>
                                                    <td>
                                                        <span class="badge bg-inverse-success"><h5>+ 60</h5></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td><a href="invoice-view.html">GLO</a></td>
                                                    <td>2,070</td>
                                                    <td>2,030</td>
                                                    <td>
                                                        <span class="badge bg-inverse-success"><h5>+ 40</h5></span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">Top 10 Low</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-nowrap custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>SYMBOL</th>
                                                    <th>HIGH</th>
                                                    <th>OPEN</th>
                                                    <th>CHAGE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td><a href="invoice-view.html">PRF3A</a></td>
                                                    <td>1,075</td>
                                                    <td>1,015</td>
                                                    <td>
                                                        <span class="badge bg-inverse-danger"><h5>- 60</h5></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td><a href="invoice-view.html">GLO</a></td>
                                                    <td>2,070</td>
                                                    <td>2,030</td>
                                                    <td>
                                                        <span class="badge bg-inverse-danger"><h5>- 40</h5></span>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">New Company</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table custom-table table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th>SYMBOL</th>
                                                    <th>NAME</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><a href="invoice-view.html">PRF3A</a></td>
                                                    <td>PCOR PREF 3A</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="invoice-view.html">ABA</a></td>
                                                    <td>ABACORE CAPITAL</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <a href="payments.html">View all Company</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 d-flex">
                            <div class="card card-table flex-fill">
                                <div class="card-header">
                                    <h3 class="card-title mb-0">New User</h3>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table custom-table table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>USERNAME</th>
                                                    <th>NAME</th>
                                                    <th>PERMISSION</th>
                                                    <th>CREATED AT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>cocoi0123</td>
                                                    <td>Pongsakorn chai</td>
                                                    <td>Admin</td>
                                                    <td>admin</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>niwatrew34534</td>
                                                    <td>Niwatto</td>
                                                    <td>User</td>
                                                    <td>admin</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <a href="payments.html">View all User</a>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div >

        );
    }
}
