import React, { Component } from "react";
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import API from '../api/API';
import Progressbar from './progressbar';
import { Link } from "react-router-dom";
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';

import ModalEditDaily from './ModalEditDaily';
import DialogDeleteDaily from './DialogDeleteDaily';

import ModalImportDaily from './ModalImportDaily';
import DialogClearDaily from './DialogClearDaily';


export default class DailyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressOpen: true,

            menu_view_2: [],
            menu_save_2: [],
            menu_edit_2: [],
            menu_delete_2: [],

            Daily: [],

            date_start: '',
            format_date_start: "",
            date_end: '',
            format_date_end: "",


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
                dataField: 'company.symbol',
                text: 'SYMBOL',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }


            }, {
                dataField: 'company.name',
                text: 'NAME',
                sort: true,
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: 'date',
                text: 'DATE',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: 'open',
                text: 'open',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: 'high',
                text: 'HIGH',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: 'low',
                text: 'LOW',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: 'close',
                text: 'CLOSE',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }
            }, {
                dataField: 'volume',
                text: 'VOLUME',
                sort: true,
                align: 'center',
                headerStyle: {
                    textAlign: 'center'
                }
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
                menu_edit={this.state.menu_edit_2}
            />
        );

    };

    DeleteFormatter = (cell, row) => {
        return (
            <DialogDeleteDaily
                daily_id={row.id}
                updateComponent={this.updateComponent}
                menu_delete={this.state.menu_delete_2}
            />
        );

    };

    onChangeDateStart = date_start => {
        this.setState({
            date_start,
            format_date_start: format(date_start, 'yyyy-MM-dd')
        })

    }

    onChangeDateEnd = date_end => {
        this.setState({
            date_end,
            format_date_end: format(date_end, 'yyyy-MM-dd')
        })

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
                        menu_id: 2
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
                                menu_save_2: res.data.data.save,
                                menu_edit_2: res.data.data.edit,
                                menu_delete_2: res.data.data.delete,

                            });

                            if (res.data.data.view == 1) {


                                const params = {
                                    date_start: this.state.format_date_start,
                                    date_stop: this.state.format_date_end

                                };

                                //get daily page
                                axios.post(API.DAILY_LIST, params, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                }).then(res => {

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


                            } else {
                                window.localStorage.clear();
                                this.props.history.push("/");
                                window.location.reload(false);
                            }
                        })
                        .catch(err => {
                            this.setState({
                                menu_save_2: [],
                                menu_edit_2: [],
                                menu_delete_2: [],
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

    handleSreach = e => {
        e.preventDefault();

        this.setState({
            progressOpen: true,
        });

        const params = {
            date_start: this.state.format_date_start,
            date_stop: this.state.format_date_end

        };

        //get daily page
        axios.post(API.DAILY_LIST, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {

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
                                <h3 class="page-title">Daily</h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item">
                                        Main Menu
                                        </li>
                                    <li class="breadcrumb-item active">Daily</li>
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
                                data={this.state.Daily}
                                columns={this.state.columns}
                                search
                                exportCSV={{
                                    fileName: 'pse.csv',
                                    noAutoBOM: false,
                                    onlyExportFiltered: true,
                                    exportAll: false
                                }}
                            >
                                {
                                    props => (
                                        <div>
                                            <div class="row filter-row">
                                                <div class="col-md-3  col-lg-v col-xl-6">
                                                    {/* // */}
                                                </div>
                                                <div class="col-md-3 col-sm-4 col-lg-v col-xl-2">
                                                    <ModalImportDaily
                                                        updateComponent={this.updateComponent}
                                                        menu_save={this.state.menu_save_2}
                                                    />
                                                </div>
                                                <div className="col-md-3 col-4 col-sm-4 col-lg-v col-md-2 col-xl-2">
                                                    <ExportCSVButton className="btn btn-block btn-md btn-success" {...props.csvProps}><i class="fas fa-file-csv"></i> Export</ExportCSVButton>
                                                </div>
                                                <div class="col-md-3 col-sm-4 col-lg-v col-xl-2">
                                                    <DialogClearDaily
                                                        updateComponent={this.updateComponent}
                                                        menu_delete={this.state.menu_delete_2}
                                                    />
                                                </div>

                                            </div>
                                            <div class="row mt-4" />
                                            <div class="row mt-4 filter-row">
                                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1"><label for="text-input" className=" form-control-label float-right">date start</label>
                                                </div>
                                                <div className="col-xs-4">
                                                    <DatePicker
                                                        popperClassName="form-control"
                                                        size="sm"
                                                        format="dd-MM-y"
                                                        onChange={this.onChangeDateStart}
                                                        value={this.state.date_start}

                                                    />


                                                </div>
                                                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1"><label for="text-input" className=" form-control-label float-right">date end</label>
                                                </div>
                                                <div className="col-xs-4">
                                                    <DatePicker
                                                        popperClassName="form-control"
                                                        size="sm"
                                                        format="dd-MM-y"
                                                        onChange={this.onChangeDateEnd}
                                                        value={this.state.date_end}

                                                    />
                                                </div>
                                                <div className="col-2 col-sm-1 col-md-2 col-lg-2 col-xl-5">
                                                    <button className=" btn-dark btn-sm" onClick={this.handleSreach}>Sreach</button>
                                                </div>
                                                <div className="col-2 col-sm-12 col-md-2 col-lg-2 col-xl-2">
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
