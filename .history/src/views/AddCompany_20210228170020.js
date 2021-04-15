import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import API from '../api/API';
import Progressbar from './progressbar';
import { Link } from 'react-router-dom';
import DailogAddCompany from './DailogAddCompany';
import DailogImportCompany from './DailogImportCompany';


export default class AddCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            symbol: '',

            fileExcel: "",
            fileName: ""
        }
    }

    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value)

    }

    onchangeFile = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.files[0],
            fileName: e.target.files[0].name,
        });

        // console.log(e.target.files[0]);
    };



    componentDidMount() {
        //

    }

    render() {


        return (
            <div>
                <div class="card-body">
                    <form>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Name</label></div>
                            <div class="col-12 col-md-8"><input type="text" id="text-input" name="username" placeholder="Name" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">Symbol</label></div>
                            <div class="col-12 col-md-8"><input type="text" id="text-input" name="password" placeholder="symbol" class="form-control" onChange={this.onchange.bind(this)} /></div>
                        </div>

                        <div class="row mt-3 form-group">
                            <div class="col-12 col-md-12">
                                <div class="text-right">
                                    <DailogAddCompany
                                        name={this.state.name}
                                        symbol={this.state.symbol}

                                        menu_save={this.props.menu_save}
                                        updateComponent={this.props.updateComponent}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <form>
                        <div class="row mt-5 form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">File Excel</label></div>
                            <div class="col-12 col-md-8">
                                <div class="col-12 col-md-9">
                                    <input
                                        type="file"
                                        id="file-input"
                                        name="fileExcel"
                                        class="form-control-file"
                                        onChange={this.onchangeFile}
                                    />
                                    <span class="help-block">
                                        <i class="fa  fa-upload"></i>{" "}
                                        <label style={{ color: "#007bff" }}>
                                            file .xls .xlsx .csv
                                  </label>
                                    </span>
                                    <br />
                                    <div class="row mt-2">
                                        <button className="btn btn-sm btn-link" onClick={() => { window.open(API.BASE_URL + '/api/download_file/company.csv') }}>fomat data</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2 form-group">
                            <div class="col-12 col-md-12">
                                <div class="text-right">
                                    <DailogImportCompany
                                        fileExcel={this.state.fileExcel}
                                        fileName={this.state.fileName}

                                        menu_save={this.props.menu_save}
                                        updateComponent={this.props.updateComponent}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr />

                </div>
            </div>
        );
    }
}
