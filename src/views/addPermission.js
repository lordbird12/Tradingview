import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

import ModalManu_view from './ModalManu_view';
import ModalManu_save from './ModalManu_save';
import ModalManu_edit from './ModalManu_edit';
import ModalManu_delete from './ModalManu_delete';
import Progressbar from './progressbar';
import API from '../api/API';
// import API from '../api/API';

export default class AddPermission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressOpen: true,

            MenuID: [],
            MenuView: [],
            MenuSave: [],
            MenuEdit: [],
            MenuDelete: [],

            Menu: [],
        }
    }

    onchange = e => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log(e.target.value)

    }

    componentDidMount() {

        axios.get(API.MENU, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            console.log(res.data.data)
            this.setState({
                Menu: res.data.data,
                progressOpen: false,
            });


        }).catch(err => {
            this.setState({
                Menu: [],
                progressOpen: false,
            });

            window.localStorage.clear();
            this.props.history.push("/");
            window.location.reload(false);

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

        if (!this.props.permission_name) {
            alert('Please enter a name')

        } else {

            this.setState({
                progressOpen: true,
            });


            const { Menu, MenuID, MenuView, MenuSave, MenuEdit, MenuDelete } = this.state

            //ID
            Menu.map(e => MenuID.push(e.id))

            //View
            Menu.map(e => MenuView.push(e.view ? 1 : 0))

            //Save
            Menu.map(e => MenuSave.push(e.save ? 1 : 0))

            //Edit
            Menu.map(e => MenuEdit.push(e.edit ? 1 : 0))

            //Delete
            Menu.map(e => MenuDelete.push(e.delete ? 1 : 0))



            const params = {
                name: this.props.permission_name,
                menu_id: MenuID,
                menu_view: MenuView,
                menu_save: MenuSave,
                menu_edit: MenuEdit,
                menu_delete: MenuDelete,

            };
            console.log(params)


            axios.post(API.ADD_PERMISSION, params, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                console.log(res.data);

                if (res.data.code == 200) {

                    alert(res.data.message)
                    this.props.updateComponent()
                    this.componentDidMount();
                    document.getElementById("permission_name").value = "";

                    this.setState({
                        progressOpen: false,
                        MenuID: [],
                        MenuView: [],
                        MenuSave: [],
                        MenuEdit: [],
                        MenuDelete: [],

                    });


                }

            }).catch(err => {


                const errorMessage = JSON.parse(err.request.response)
                alert(errorMessage.message)
                this.props.updateComponent()
                this.componentDidMount();
                document.getElementById("permission_name").value = "";

                this.setState({
                    progressOpen: false,
                    MenuID: [],
                    MenuView: [],
                    MenuSave: [],
                    MenuEdit: [],
                    MenuDelete: [],

                });
            });


        }

    }

    render() {

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
                                            <th>NO</th>
                                            <th>NAME</th>
                                            <th>VIEW</th>
                                            <th>SAVE</th>
                                            <th>EDIT</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.state.Menu.map((value, index) => (
                                            <tr key={index}>
                                                <td>  <span className="name">{value.No}</span> </td>
                                                <td> <span className="name">{value.name}</span> </td>
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

                    <div className="row mt-5">
                        <div className="col-12">
                            <button type="submit"
                                className="float-right btn btn-block btn-md btn-primary"
                                onClick={this.handleSubmit}
                                style={{ color: "white", width: 90 }}
                            >
                                Save
                        </button>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}