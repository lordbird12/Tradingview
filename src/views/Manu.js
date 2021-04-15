import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';
import ModalManu_view from './ModalManu_view';
import ModalManu_save from './ModalManu_save';
import ModalManu_edit from './ModalManu_edit';
import ModalManu_delete from './ModalManu_delete';

export default class Manu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            MenuList: [],

            ManuID: [],
            ManuView: [],
            ManuSave: [],
            ManuEdit: [],
            ManuDelete: [],

            permission_id: this.props.permission_ID

        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {

        const params = {
            permission_id: this.state.permission_id,
        };
        console.log(params)

        axios.post(API.GET_MENU_PERMISSION, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            console.log(res.data.data)
            this.setState({
                MenuList: res.data.data,
                progressOpen: false,


            });


        }).catch(err => {
            this.setState({
                MenuList: [],
                progressOpen: false,
            });

            // window.localStorage.clear();
            // this.props.history.push("/");
            // window.location.reload(false);

        });

    }

    handleManuView(value) {

        value.view = !value.view;
        console.log(value.view)
    }

    handleManuSave(value) {

        value.save = !value.save;
        console.log(value.save)
    }

    handleManuEdit(value) {

        value.edit = !value.edit;
        console.log(value.edit)
    }

    handleManuDelete(value) {

        value.delete = !value.delete;
        console.log(value.delete)
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            progressOpen: true,
        });


        const { MenuList, ManuID, ManuView, ManuSave, ManuEdit, ManuDelete } = this.state

        //ID
        MenuList.map(e => ManuID.push(e.id))

        //View
        MenuList.map(e => ManuView.push(e.view ? 1 : 0))

        //Save
        MenuList.map(e => ManuSave.push(e.save ? 1 : 0))

        //Edit
        MenuList.map(e => ManuEdit.push(e.edit ? 1 : 0))

        //Delete
        MenuList.map(e => ManuDelete.push(e.delete ? 1 : 0))




        const params = {
            menu_id: ManuID,
            menu_view: ManuView,
            menu_save: ManuSave,
            menu_edit: ManuEdit,
            menu_delete: ManuDelete,

        };
        console.log(params)

        axios.put(API.EDIT_MENU_PERMISSION + '/' + this.state.permission_id, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.data.code == 201) {

                alert(res.data.message)
                this.componentDidMount();

                this.setState({
                    ManuID: [],
                    ManuView: [],
                    ManuSave: [],
                    ManuEdit: [],
                    ManuDelete: [],
                    ManuChangdate: [],

                    MenuList: [],
                    progressOpen: false,

                });



            }

        })
            .catch(err => {

                const errorMessage = JSON.parse(err.request.response)
                alert(errorMessage.message)

                this.setState({
                    ManuID: [],
                    ManuView: [],
                    ManuSave: [],
                    ManuEdit: [],
                    ManuDelete: [],
                    ManuChangdate: [],

                    MenuList: [],
                    progressOpen: false,

                });

            });

    }


    render() {
        console.log(this.props.menuEdit8)

        return (
            <div>
                <Progressbar
                    Open={this.state.progressOpen}
                />
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-12">
                            <div class="table-responsive">
                                <table class="table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>View</th>
                                            <th>Save</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.MenuList.map((value, index) => (
                                            <tr key={index}>
                                                <td>  <span className="text-dark">{value.No}</span> </td>
                                                <td> <span className="text-dark">{value.name}</span> </td>
                                                <td>
                                                    < ModalManu_view
                                                        id={value.id}
                                                        select={value.view}
                                                        handleManuView={() => this.handleManuView(value)}
                                                    // manuEdit_11={this.props.manu_edit11}
                                                    />
                                                </td>
                                                <td>
                                                    < ModalManu_save
                                                        id={value.id}
                                                        select={value.save}
                                                        handleManuSave={() => this.handleManuSave(value)}
                                                    // manuEdit_11={this.props.manu_edit11}
                                                    />
                                                </td>
                                                <td>
                                                    < ModalManu_edit
                                                        id={value.id}
                                                        select={value.edit}
                                                        handleManuEdit={() => this.handleManuEdit(value)}
                                                    // manuEdit_11={this.props.manu_edit11}
                                                    />
                                                </td>
                                                <td>
                                                    < ModalManu_delete
                                                        id={value.id}
                                                        select={value.delete}
                                                        handleManuDelete={() => this.handleManuDelete(value)}
                                                    // manuEdit_11={this.props.manu_edit11}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <div className="row" style={{ display: this.state.permission_id == 1 ? "none" : "" }}>
                        <div className="col-12">
                            <button type="submit" className="float-right btn btn-flat m-b-30 m-t-30 btn-primary" onClick={this.handleSubmit} style={{ color: "white", display: this.props.menuEdit8 == 1 ? "" : "none" }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>





        );
    }
}
