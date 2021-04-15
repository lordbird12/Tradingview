import React, { Component } from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';

export default class EditPermissionEmployeeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            permission_id: this.props.permission_ID,

            listEmPerGroup: [],
            employee: [],
            selected: [],
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = (selected) => {
        this.setState({ selected });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            progressOpen: true,
        });

        const employeeId = localStorage.getItem('username')
        const { selected, permission_id } = this.state

        const params = {
            permission_id: permission_id,
            user_select: selected,
            update_by:employeeId

        };
        console.log(params)

        axios.post(API.SELECT_EMPLOYEE_TO_PERMISSION, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            if (res.data.code == 200) {
                this.setState({
                    progressOpen: false,

                    listEmPerGroup: [],
                    employee: [],
                    selected: [],

                });

                alert('ดำเนินการแก้ไขประเภทสิทธิ์การเข้าใช้งานสำเร็จ')
                this.componentDidMount();
              
            } else {
                alert('ดำเนินการแก้ไขประเภทสิทธิ์การเข้าใช้งานผิดพลาด กรุณาดำเนินการให้ถูกต้อง')
                this.componentDidMount();
            }


        }).catch(err => {
            this.setState({
                progressOpen: false,

                listEmPerGroup: [],
                employee: [],
                selected: [],

            });
           
        });

    }

    componentDidMount() {


        axios.get(API.GET_EMPLOYEE_ALL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data.data)
            this.setState({
                employee: res.data.data,
                progressOpen: false,
            });
        }).catch(err => this.setState({
            employee: [],
            progressOpen: false,
        }));


        const params = {
            permission_id: this.state.permission_id,
            employee_filter: '',
            employee_seach: '',
            employee_sort: ''
        };

        axios.post(API.GET_PERMISSION_EMPLOYEE, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data.data)

            res.data.data.map(e => {
                this.state.selected.push(e.id)

            });
            this.setState({
                listEmPerGroup: res.data.data,
            });


        }).catch(err => {
            this.setState({
                listEmPerGroup: []
            })

        });


    }

    render() {


        const { selected } = this.state;

        return (
            <div className="animated fadeIn">
                  <Progressbar
                        Open={this.state.progressOpen}
                    />
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4 bg-dark text-light text-center">
                        รายชื่อทั้งหมด
                    </div>
                    <div className="col-2"></div>
                    <div className="col-4 bg-dark text-light text-center" >
                        รายชื่อใน group
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <DualListBox
                            canFilter
                            filterCallback={(option, filterInput) => {
                                if (filterInput === '') {
                                    return true;
                                }

                                return (new RegExp(filterInput, 'i')).test(option.label);
                            }}
                            filterPlaceholder="Sreach..."
                            options={this.state.employee}
                            selected={selected}
                            onChange={this.onChange}

                            preserveSelectOrder

                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="my-4 bg-success float-right btn btn-flat m-b-30 m-t-30" onClick={this.handleSubmit} style={{ color: "white" }}>บันทึก</button>
                    </div>
                </div>
            </div>
        );
    }
}

