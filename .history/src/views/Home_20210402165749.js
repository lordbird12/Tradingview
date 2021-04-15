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

            HomeList: [],

            total_company: '0',
            total_max: '0',
            total_min: '0',
            user: '0',


            new_company: [],
            new_user: [],


            total_ten_high: [],
            total_ten_low: [],

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


        //run graph chart.js
        const script = document.createElement("script");

        script.src = "assets/js/chart.js";
        script.async = true;

        document.body.appendChild(script);
        //

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


                    //
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
                            console.log(res.data.data);
                            this.setState({
                                menu_view_1: res.data.data.view,

                            });

                            if (res.data.data.view == 1) {



                                //get home page
                                axios.get(API.GET_HOME_PAGE, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {

                                    // console.log(res.data.data)
                                    this.setState({
                                        HomeList: res.data.data,

                                        total_company: res.data.data.total_company,
                                        total_max: res.data.data.total_max,
                                        total_min: res.data.data.total_min,
                                        user: res.data.data.user,


                                        new_company: res.data.data.new_company,
                                        new_user: res.data.data.new_user,


                                        total_ten_high: res.data.data.total_ten_high,
                                        total_ten_low: res.data.data.total_ten_low,
                                    });


                                }).catch(err => {
                                    this.setState({
                                        HomeList: [],

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
                                menu_view_1: [],
                            });
                            window.localStorage.clear();
                            this.props.history.push("/");
                            window.location.reload(false);
                        });
                    //

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

            <div class="page-wrapper" >

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
                                        <h3>{this.state.total_company}</h3>
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
                                        <h3>{this.state.total_max}</h3>
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
                                        <h3>{this.state.total_min}</h3>
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
                                        <h3>{this.state.user}</h3>
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
                                                {this.state.total_ten_high.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{value.No}</td>
                                                            <td className="text-primary">{value.symbol}</td>
                                                            <td>{value.high}</td>
                                                            <td>{value.open}</td>
                                                            <td>
                                                                <span class="badge bg-inverse-success"><h5>+ {value.result}</h5></span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
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
                                                {this.state.total_ten_low.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{value.No}</td>
                                                            <td className="text-primary">{value.symbol}</td>
                                                            <td>{value.high}</td>
                                                            <td>{value.open}</td>
                                                            <td>
                                                                <span class="badge bg-inverse-danger"><h5>- {value.result}</h5></span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
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
                                                {this.state.new_company && this.state.new_company.length ? this.state.new_company.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-primary">{value.symbol}</td>
                                                            <td>{value.name}</td>
                                                        </tr>
                                                    );
                                                }) : <td colSpan={2}><div className="text-center">- Data Not found -</div></td>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <Link to="CompanyList">View all Company</Link>
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
                                                    <th>CREATED AT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.new_user && this.state.new_user.length ? this.state.new_user.map((value, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{value.no}</td>
                                                            <td>{value.username}</td>
                                                            <td>{value.name}</td>
                                                            <td>{value.created_at}</td>
                                                        </tr>
                                                    );
                                                }) : <td colSpan={4}><div className="text-center">- Data Not found -</div></td>}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <Link to="EmployeeList">View all User</Link>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div >

        );
    }
}
