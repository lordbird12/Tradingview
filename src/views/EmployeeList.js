import React, { Component } from "react";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import axios from 'axios';

import API from '../api/API';
import Progressbar from './progressbar';


import ModalAddEmployee from './ModalAddEmployee';
import ModalEditEmployee from './ModalEditEmployee';
import ModalResetPasswordEmployee from './ModalResetPasswordEmployee';
import DialogDeleteEmployee from './DialogDeleteEmployee';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            menu_save_4: [],
            menu_edit_4: [],
            menu_delete_4: [],


            EmployeeList: [],
            PermissionList: [],

            user_permission: '',


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
                dataField: 'username',
                text: 'USERNAME',
                sort: true,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }

            }, {
                dataField: 'full_name',
                text: 'NAME',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'nick_name',
                text: 'NICK NAME',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'name',
                text: 'PERMISSION',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }
            }, {
                dataField: 'create_by',
                text: 'CREATE BY',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
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
                dataField: '',
                text: 'EDIT',
                isDummyField: true,
                formatter: this.EditFormatter,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                },
                csvExport: false
            }, {
                dataField: '',
                text: 'RESET PASSWAORD',
                isDummyField: true,
                formatter: this.ResetPasswordFormatter,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                },
                csvExport: false
            }, {
                dataField: '',
                text: 'DEL',
                isDummyField: true,
                formatter: this.ChangeStatusFormatter,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                },
                csvExport: false
            }
            ]



        }

    }

    EditFormatter = (cell, row) => {
        return (
            <ModalEditEmployee
                employeeID={row.id}
                updateComponent={this.updateComponent}
                menu_edit={this.state.menu_edit_4}
            />
        );

    };

    ResetPasswordFormatter = (cell, row) => {
        return (
            <ModalResetPasswordEmployee
                employeeID={row.id}
                username={row.username}
                updateComponent={this.updateComponent}
                menu_edit={this.state.menu_edit_4}
            />
        );

    };

    ChangeStatusFormatter = (cell, row) => {
        return (
            <DialogDeleteEmployee
                employeeID={row.id}
                updateComponent={this.updateComponent}
                menu_delete={this.state.menu_delete_4}
            />
        );

    };


    onFilter = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        //get employee page
        const params = {
            user_permission: e.target.value,
        };
        console.log(params)

        axios.post(API.GET_USER_PAGE, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            console.log(res.data.data)
            this.setState({
                EmployeeList: res.data.data,
                AllPage: res.data.data,
                pageOfItems: res.data.data,
                progressOpen: false,
            });


        }).catch(err => {
            this.setState({
                EmployeeList: [],
                AllPage: [],
                pageOfItems: [],
                progressOpen: false,
            });


        });
        //

    }




    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

    }


    updateComponent = (props) => {

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
                        menu_id: 4
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
                                menu_save_4: res.data.data.save,
                                menu_edit_4: res.data.data.edit,
                                menu_delete_4: res.data.data.delete,

                            });

                            if (res.data.data.view == 1) {

                                //get employee page
                                const params = {
                                    user_permission: this.state.user_permission,
                                };
                                console.log(params)

                                axios.post(API.GET_USER_PAGE, params, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {

                                    console.log(res.data.data)
                                    this.setState({
                                        EmployeeList: res.data.data,
                                        progressOpen: false,
                                    });


                                }).catch(err => {
                                    this.setState({
                                        EmployeeList: [],
                                        progressOpen: false,
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

                            } else {
                                window.localStorage.clear();
                                this.props.history.push("/");
                                window.location.reload(false);
                            }
                        })
                        .catch(err => {
                            this.setState({
                                menu_save_4: [],
                                menu_edit_4: [],
                                menu_delete_4: [],
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



        const { PermissionList } = this.state;

        let PermissionDopdown = PermissionList.length > 0
            && PermissionList.map((value, index) => {
                return (
                    <option className="text-dark" key={index} value={value.name}>{value.name}</option>

                )
            }, this);


        const { SearchBar } = Search;
        const { ExportCSVButton } = CSVExport;


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
            sizePerPage: 50

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
                                    <h3 class="page-title">User</h3>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            Main Menu
                                        </li>
                                        <li class="breadcrumb-item active">User</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* //header */}

                        {/* body */}


                        <ToolkitProvider
                            keyField="id"
                            data={this.state.EmployeeList}
                            columns={this.state.columns}
                            search
                            exportCSV={{
                                fileName: 'user.csv',
                                noAutoBOM: false,
                                onlyExportFiltered: true,
                                exportAll: false
                            }}
                        >
                            {
                                props => (
                                    <div >
                                        <div class="row filter-row">
                                            <div class="col-md-6 col-sm-4 col-lg-v col-xl-8">
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-lg-v col-xl-2">
                                                <ModalAddEmployee
                                                    updateComponent={this.updateComponent}
                                                    menu_save={this.state.menu_save_4}
                                                />
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-lg-v col-xl-2">
                                                <ExportCSVButton className="btn btn-block btn-md btn-success" {...props.csvProps}><i class="fas fa-file-csv"></i> Export</ExportCSVButton>
                                            </div>
                                        </div>
                                        <div class="row mt-4 filter-row">
                                            <div className="col-4 col-md-8"><label for="text-input" className=" form-control-label float-right">Sreach</label>
                                            </div>
                                            <div className="col-4 col-md-2">
                                                <select
                                                    name="user_permission"
                                                    id="select"
                                                    className="form-control"
                                                    onChange={this.onFilter.bind(this)}
                                                >
                                                    <option className="text-dark" value="">All</option>
                                                    {PermissionDopdown}
                                                </select>
                                            </div>


                                            <div className="col-4 col-md-2">
                                                <SearchBar {...props.searchProps} size='sm' />
                                            </div>
                                        </div>


                                        <div class="row mt-2">
                                            <div className="col-12 col-md-12">
                                                <div class="table table-striped custom-table mb-0">
                                                    <BootstrapTable size='sm'
                                                        hover
                                                        bordered={false}
                                                        keyField='id'
                                                        data={this.state.EmployeeList}
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