import React, { Component } from "react";
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import API from '../api/API';
import Progressbar from './progressbar';
import { Link } from "react-router-dom";

import ModalAddCompany from './ModalAddCompany';
import ModalEditCompany from './ModalEditCompany';
import DialogDeleteCompany from './DialogDeleteCompany';


export default class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressOpen: true,

            menu_view_3: [],
            menu_save_3: [],
            menu_edit_3: [],
            menu_delete_3: [],

            Company: [],

            columns: [{
                dataField: 'No',
                text: 'NO',
                sort: true,
                // headerAttrs: { width: 50 },
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }


            }, {
                dataField: 'symbol',
                text: 'SYMBOL',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }


            }, {
                dataField: 'name',
                text: 'NAME',
                sort: true,
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: '',
                text: 'View',
                isDummyField: true,
                // headerAttrs: { width: 50 },
                formatter: this.ViewFormatter,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                },
                csvExport: false
            }, {
                dataField: '',
                text: 'EDIT',
                isDummyField: true,
                // headerAttrs: { width: 50 },
                formatter: this.EditFormatter,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                },
                csvExport: false
            }, {
                dataField: '',
                text: 'DEL',
                isDummyField: true,
                // headerAttrs: { width: 50 },
                formatter: this.DeleteFormatter,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                },
                csvExport: false
            }
            ]


        }

    }

    ViewFormatter = (cell, row) => {
        return (
            <button className="btn btn-dark" size='sm' style={{ width: 45, cursor: 'pointer' }} onClick={() => { this.viewCompany(row.id) }}><i class="fas fa-eye"></i></button>
        );

    };

    viewCompany(id) {
        localStorage.setItem('company_id', id)
        this.props.history.push("/Company");
        window.location.reload(false);
    }

    EditFormatter = (cell, row) => {
        return (
            <ModalEditCompany
                company_id={row.id}
                name={row.name}
                symbol={row.symbol}

                updateComponent={this.updateComponent}
                menu_edit={this.state.menu_edit_3}
            />
        );

    };

    DeleteFormatter = (cell, row) => {
        return (
            <DialogDeleteCompany
                company_id={row.id}

                updateComponent={this.updateComponent}
                menu_delete={this.state.menu_delete_3}
            />
        );

    };


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
                        menu_id: 3
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
                                menu_save_3: res.data.data.save,
                                menu_edit_3: res.data.data.edit,
                                menu_delete_3: res.data.data.delete,

                            });

                            if (res.data.data.view == 1) {

                                //get company page
                                axios.get(API.COMPANY, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                }).then(res => {

                                    console.log(res.data.data)
                                    this.setState({
                                        Company: res.data.data,
                                        progressOpen: false,
                                    });


                                }).catch(err => {
                                    this.setState({
                                        Company: [],
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
                                menu_save_3: [],
                                menu_edit_3: [],
                                menu_delete_3: [],
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

            <div class="page-wrapper">
                <Progressbar
                    Open={this.state.progressOpen}
                />

                <div class="content container-fluid">

                    {/* //header */}
                    <div class="page-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <h3 class="page-title">Company</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        Main Menu
                                        </li>
                                    <li class="breadcrumb-item active">Company</li>
                                </ul>
                            </div>


                        </div>
                    </div>
                    {/* //header */}

                    {/* body */}
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-lg-12 col-xl-12">
                            <ToolkitProvider
                                keyField="id"
                                data={this.state.Company}
                                columns={this.state.columns}
                                search
                                exportCSV={{
                                    fileName: 'company.csv',
                                    noAutoBOM: false,
                                    onlyExportFiltered: true,
                                    exportAll: false
                                }}
                            >
                                {
                                    props => (
                                        <div>
                                            <div class="row filter-row">
                                                <div class="col-sm-4 col-md-6  col-lg-v col-xl-8">
                                                </div>
                                                <div className="col-sm-4 col-md-3 col-xl-2">
                                                    <ModalAddCompany
                                                        updateComponent={this.updateComponent}
                                                        menu_save={this.state.menu_save_3}
                                                    />
                                                </div>
                                                <div className="col-sm-4 col-md-3 col-xl-2">
                                                    <ExportCSVButton className="btn btn-block btn-md btn-success" {...props.csvProps}><i class="fas fa-file-csv"></i> Export</ExportCSVButton>
                                                </div>
                                            </div>
                                            <div class="row mt-4 filter-row">
                                                <div className="col-8 col-md-10"><label for="text-input" className=" form-control-label float-right"></label>
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
                                                            data={this.state.Company}
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


                        </div>
                    </div>
                    {/* body */}
                </div>
            </div >


        );
    }
}
