import React, { Component } from "react";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

import axios from 'axios';

import API from '../api/API';
import Progressbar from './progressbar';


import ModalEditDaily from './ModalEditDaily';
import DialogDeleteDaily from './DialogDeleteDaily';

import ModalEditOld from './ModalEditOld';
import DialogDeleteOld from './DialogDeleteOld';
import ModalImportOld from './ModalImportOld';
import DialogClearOld from './DialogClearOld';



export default class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            menu_save_3: [],
            menu_edit_3: [],
            menu_delete_3: [],

            company_id: localStorage.getItem('company_id'),
            Company: [],

            Daily: [],

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
                dataField: 'date',
                text: 'DATE',
                sort: true,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }

            }, {
                dataField: 'open',
                text: 'OPEN',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'high',
                text: 'HIGH',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'low',
                text: 'LOW',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }
            }, {
                dataField: 'close',
                text: 'CLOSE',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }
            }, {
                dataField: 'volume',
                text: 'VOLUME',
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
                text: 'DEL',
                isDummyField: true,
                formatter: this.DeleteFormatter,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                },
                csvExport: false
            }
            ],

            Old: [],

            columnsOld: [{
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
                dataField: 'date',
                text: 'DATE',
                sort: true,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }

            }, {
                dataField: 'price',
                text: 'PRICE',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'open',
                text: 'OPEN',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'high',
                text: 'HIGH',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }


            }, {
                dataField: 'low',
                text: 'LOW',
                sort: true,
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                }
            }, {
                dataField: 'volume',
                text: 'VOLUME',
                sort: true,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                }
            }, {
                dataField: 'change',
                text: 'CHANGE',
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
                formatter: this.OldEditFormatter,
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
                formatter: this.OldDeleteFormatter,
                align: 'center',
                headerStyle: {
                    // backgroundColor: 'black',
                    // color: 'white',
                    textAlign: 'center'
                },
                csvExport: false
            }
            ],



        }

    }

    EditFormatter = (cell, row) => {
        return (
            <ModalEditDaily
                daily_id={row.id}
                open={row.open}
                high={row.high}
                low={row.low}
                close={row.close}
                volume={row.volume}
                date={row.date}

                bid={row.bid}
                ask={row.ask}
                value={row.value}
                net={row.net}

                updateComponent={this.updateComponent}
                menu_edit={this.state.menu_edit_3}
            />
        );

    };

    DeleteFormatter = (cell, row) => {
        return (
            <DialogDeleteDaily
                daily_id={row.id}

                updateComponent={this.updateComponent}
                menu_delete={this.state.menu_delete_3}
            />
        );

    };


    //old

    OldEditFormatter = (cell, row) => {
        return (
            <ModalEditOld
                old_id={row.id}
                date={row.date}
                price={row.price}
                open={row.open}
                high={row.high}
                low={row.low}
                volume={row.volume}
                change={row.change}

                updateComponent={this.updateComponent}
                menu_edit={this.state.menu_edit_3}
            />
        );

    };

    OldDeleteFormatter = (cell, row) => {
        return (
            <DialogDeleteOld
                old_id={row.id}

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

                                //get daily page
                                const params = {
                                    company_id: this.state.company_id,
                                };
                                console.log(params)

                                axios.post(API.GET_DAILY, params, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {

                                    console.log(res.data.data)
                                    this.setState({
                                        Daily: res.data.data,
                                        progressOpen: false,
                                    });


                                }).catch(err => {
                                    this.setState({
                                        Daily: [],
                                        progressOpen: false,
                                    });

                                });
                                //

                                //get old page
                                //  const params = {
                                //     company_id: this.state.company_id,
                                // };
                                // console.log(params)

                                axios.post(API.GET_OLD, params, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(res => {

                                    console.log(res.data.data)
                                    this.setState({
                                        Old: res.data.data,
                                        progressOpen: false,
                                    });


                                }).catch(err => {
                                    this.setState({
                                        Old: [],
                                        progressOpen: false,
                                    });

                                });
                                //


                                //get company
                                axios.get(API.COMPANY + '/' + this.state.company_id, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + localStorage.getItem('token')
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
                                    <h3 class="page-title">Company</h3>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            Dashboard
                                        </li>
                                        <li class="breadcrumb-item active">Company</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* //header */}

                        {/* body */}

                        <div class="card mb-0">
                            <div class="card-body">
                                <div class="row mb-5">
                                    <div class="col-md-12">
                                        <div class="profile-view">
                                            <div class="profile-img-wrap">
                                                <div class="profile-img">
                                                    <img src="images/com-icon.png" width="50px"></img>
                                                </div>
                                            </div>
                                            <div class="profile-basic">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="profile-info">
                                                            <h1 class="user-name m-t-5 mb-1">{this.state.Company.name}</h1>
                                                            <h5 class="text-muted">{this.state.Company.symbol}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card tab-box">
                            <div class="row user-tabs">
                                <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
                                    <ul class="nav nav-tabs nav-tabs-bottom">
                                        {/* <li class="nav-item"><a href="#daily" data-toggle="tab" class="nav-link active">Daily Data</a></li> */}
                                        <li class="nav-item"><a href="#old" data-toggle="tab" class="nav-link">Old Data</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="tab-content">
                            {/* tab daily */}
                            <div id="daily" class="pro-overview tab-pane fade show active">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row mt-0">
                                            <div class="col-12">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4 class="card-title mb-0">Daily Data</h4>
                                                    </div>
                                                    <div class="card-body">

                                                        <div class="tab-content">
                                                            <div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <ToolkitProvider
                                                                            keyField="id"
                                                                            data={this.state.Daily}
                                                                            columns={this.state.columns}
                                                                            search
                                                                        >
                                                                            {
                                                                                props => (
                                                                                    <div >

                                                                                        <div class="row">
                                                                                            <div className="col-8 col-md-10"><label for="text-input" className=" form-control-label float-right"></label>
                                                                                            </div>
                                                                                            <div className="col-4 col-md-2">
                                                                                                <SearchBar {...props.searchProps} size='sm' />
                                                                                            </div>
                                                                                        </div>


                                                                                        <div class="row mt-2">
                                                                                            <div class="table table-striped custom-table mb-0">
                                                                                                <BootstrapTable size='sm'
                                                                                                    hover
                                                                                                    bordered={false}
                                                                                                    keyField='id'
                                                                                                    data={this.state.Daily}
                                                                                                    columns={this.state.columns}
                                                                                                    {...props.baseProps}
                                                                                                    filter={filterFactory()}
                                                                                                    pagination={paginationFactory(options)}
                                                                                                    wrapperClasses="table-responsive"
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </ToolkitProvider>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* tab daily */}

                            {/* tab old */}
                            <div class="tab-pane fade" id="old">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row mt-0">
                                            <div class="col-12">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <h4 class="card-title mb-0">Old Data</h4>
                                                    </div>
                                                    <div class="card-body">
                                                        <div class="tab-content">
                                                            <div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <ToolkitProvider
                                                                            keyField="id"
                                                                            data={this.state.Old}
                                                                            columns={this.state.columnsOld}
                                                                            search
                                                                            exportCSV={{
                                                                                fileName: 'Banks And Financial-FIN.csv',
                                                                                noAutoBOM: false,
                                                                                onlyExportFiltered: true,
                                                                                exportAll: false
                                                                            }}
                                                                        >
                                                                            {
                                                                                props => (
                                                                                    <div >
                                                                                        <div class="row filter-row">
                                                                                            <div class="col-md-3  col-lg-v col-xl-6">
                                                                                            </div>
                                                                                            <div class="col-sm-4 col-md-3 col-lg-v col-xl-2">
                                                                                                <ModalImportOld
                                                                                                    company_id={this.state.company_id}

                                                                                                    updateComponent={this.updateComponent}
                                                                                                    menu_save={this.state.menu_save_3}
                                                                                                />
                                                                                            </div>
                                                                                            <div class="col-sm-4 col-md-3 col-lg-v col-xl-2">
                                                                                                <DialogClearOld
                                                                                                    company_id={this.state.company_id}

                                                                                                    updateComponent={this.updateComponent}
                                                                                                    menu_delete={this.state.menu_delete_3}
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
                                                                                            <div class="table table-striped custom-table mb-0">
                                                                                                <BootstrapTable size='sm'
                                                                                                    hover
                                                                                                    bordered={false}
                                                                                                    keyField='id'
                                                                                                    data={this.state.Old}
                                                                                                    columns={this.state.columnsOld}
                                                                                                    {...props.baseProps}
                                                                                                    filter={filterFactory()}
                                                                                                    pagination={paginationFactory(options)}
                                                                                                    wrapperClasses="table-responsive"
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </ToolkitProvider>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* tab old */}

                        </div>




                        {/* body */}

                    </div>
                </div>
            </div >
        );
    }
}