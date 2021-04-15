import React, { Component } from "react";
import { Button } from 'reactstrap';
import axios from 'axios';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import API from '../api/API';
import Progressbar from './progressbar';

export default class LogList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,
            menu_view_6: [],
            menu_save_6: [],
            LogList: [],


            LogType: [],
            log_type: '',

            Year: [],
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,

            btnSeach: false,

            columns: [{
                dataField: 'No',
                text: 'NO',
                sort: true,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }


            }, {
                dataField: 'created_at',
                text: 'DATE',
                sort: true,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }

            }, {
                dataField: 'description',
                text: 'DESCRIPTION',
                sort: true,
                headerStyle: {
                    //backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }


            }, {
                dataField: 'type',
                text: 'TYPE',
                sort: true,
                align: 'center',
                headerStyle: {
                    //backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }


            }, {
                dataField: 'username',
                text: 'UPDATE BY',
                sort: true,
                align: 'center',
                headerStyle: {
                    //backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }
            }
            ]



        }

    }



    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });




    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            btnSeach: true
        });
        //get log
        const params = {
            log_type: this.state.log_type,
            month: this.state.month,
            year: this.state.year

        };


        axios.post(API.LOG_LIST, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({
                LogList: res.data.data,

            });
        }).catch(err => {
            this.setState({
                LogList: [],

            })
        });


    }

    handleExportExcel = e => {
        e.preventDefault();
        window.open(API.BASE_URL + "/api/ExportLogExcel?log_type=" + this.state.log_type + "&month=" + this.state.month + "&year=" + this.state.year);

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
                        menu_id: 6
                    };

                    axios
                        .post(API.GET_EMPLOYEE_ONE_GANT_MENU, params, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        .then(res => {

                            this.setState({
                                menu_view_6: res.data.data.view,
                                menu_save_6: res.data.data.save,


                            });

                            if (res.data.data.view == 1) {

                                //get log
                                const params = {
                                    log_type: this.state.log_type,
                                    month: this.state.month,
                                    year: this.state.year

                                };

                                console.log(params)


                                axios.post(API.LOG_LIST, params, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {
                                    console.log(res)

                                    this.setState({
                                        LogList: res.data.data,

                                    });
                                }).catch(err => {
                                    this.setState({
                                        LogList: [],

                                    })

                                });
                                //

                                //get logType
                                axios.get(API.GET_LOG_TYPE, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {

                                    this.setState({
                                        LogType: res.data.data,
                                        progressOpen: false,
                                    });
                                }).catch(err => {
                                    this.setState({
                                        LogType: [],
                                        progressOpen: false,
                                    })

                                });


                                axios.get(API.GET_DOPDOWN_YEAR, {
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }
                                )
                                    .then(res => {

                                        this.setState({
                                            Year: res.data.data,
                                        });
                                    }).catch(err => this.setState({
                                        Year: [],
                                    }));

                            } else {
                                window.localStorage.clear();
                                this.props.history.push("/");
                                window.location.reload(false);
                            }

                        })
                        .catch(err => {
                            this.setState({
                                menu_view_6: [],
                                menu_save_6: []

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

        const { LogType, Year } = this.state;
        let LogtypelList = LogType.length > 0
            && LogType.map((value, index) => {
                return (
                    <option className="text-dark" key={index} value={value.type}>{value.type}</option>

                )
            }, this);

        let YearlList = Year.length > 0
            && Year.map((value, index) => {
                return (
                    <option className="text-dark" key={index} value={value.year}>{value.year}</option>

                )
            }, this);



        const { SearchBar } = Search;

        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                &nbsp;&nbsp;   Showing {from} to {to} of {size} Results
            </span>
        );

        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: false,
            hideSizePerPage: true,
            sizePerPage: 20

        };

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
                                    <h3 class="page-title">Log</h3>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            Main Menu
                                        </li>
                                        <li class="breadcrumb-item active">Log</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        {/* //header */}


                        {/* body */}
                        <ToolkitProvider
                            keyField="id"
                            data={this.state.LogList}
                            columns={this.state.columns}
                            search
                        >
                            {
                                props => (
                                    <div >
                                        <div class="row filter-row">
                                            <div className="col-12 col-md-1"><label for="text-input" className=" form-control-label">Sreach</label></div>

                                            <div className="col-12 col-md-2">
                                                <select
                                                    name="year"
                                                    id="year"
                                                    className="form-control"
                                                    onChange={this.onchange}
                                                >
                                                    <option value="">-เลือก Year-</option>
                                                    {YearlList}
                                                </select>
                                            </div>

                                            <div className="col-12 col-md-2">
                                                <select
                                                    name="month"
                                                    id="month"
                                                    className="form-control"
                                                    onChange={this.onchange}
                                                >
                                                    <option value="">-เลือก Month-</option>
                                                    <option className="text-dark" value="01" >January</option>
                                                    <option className="text-dark" value="02">February</option>
                                                    <option className="text-dark" value="03">March</option>
                                                    <option className="text-dark" value="04">April</option>
                                                    <option className="text-dark" value="05">May</option>
                                                    <option className="text-dark" value="06">June</option>
                                                    <option className="text-dark" value="07">July</option>
                                                    <option className="text-dark" value="08">August</option>
                                                    <option className="text-dark" value="09">September</option>
                                                    <option className="text-dark" value="10">October</option>
                                                    <option className="text-dark" value="11">November </option>
                                                    <option className="text-dark" value="12">December</option>
                                                </select>
                                            </div>

                                            <div className="col-12 col-md-2">
                                                <select
                                                    name="log_type"
                                                    id="log_type"
                                                    className="form-control"
                                                    value={this.state.log_type}
                                                    onChange={this.onchange}
                                                >
                                                    <option value="">All Type</option>
                                                    {LogtypelList}
                                                </select>
                                            </div>

                                            <div className="col-12 col-md-2">
                                                <button className="btn btn-sm btn-block btn-dark" onClick={this.handleSubmit}>Sreach</button>

                                            </div>
                                            <div className="col-12 col-md-2">

                                                <button className="btn btn-sm btn-block btn-success" style={{ display: this.state.menu_save_6 == 1 ? "" : "none" }} onClick={this.handleExportExcel} disabled={this.state.btnSeach ? false : true}><i class="fas fa-file-csv"></i> Export</button>
                                            </div>

                                        </div>
                                        <div class="row mt-3">
                                            <div className="col-7 col-md-10"></div>
                                            <div className="col-5 col-md-2">
                                                <SearchBar {...props.searchProps} size='sm' />
                                            </div>
                                        </div>

                                        <div class="row my-2">
                                            <div className="col-12 col-md-12">
                                                <div class="table table-striped custom-table mb-0">
                                                    <BootstrapTable size='sm'
                                                        hover
                                                        bordered={false}
                                                        keyField='id'
                                                        data={this.state.LogList}
                                                        columns={this.state.columns}
                                                        {...props.baseProps}
                                                        filter={filterFactory()}
                                                        pagination={paginationFactory(options)}
                                                        wrapperClasses="table-responsive"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                        {/* body */}


                    </div>
                </div>
            </div>



        );
    }
}