import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';

const ModalResetPasswordEmployee = (props) => {
    const {
        buttonLabel,
        className,
        employeeID,
        username,
        updateComponent,
        menu_edit

    } = props;

    const [modal, setModal] = useState(false);

    const [new_password, setnew_password] = useState('');

    const toggle = () => setModal(!modal);

    const handleReset = () => {

        const params = {
            username: username,
            new_password: new_password
        };

        if (!params.new_password) {
            alert('Please enter a new password')
        } else {

            axios.put(API.RESET_PASSWORD + '/' + employeeID, params, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {

                if (res.data.code == 201) {

                    alert(res.data.message)
                    toggle()
                    updateComponent()

                }

            }).catch(err => {

                const errorMessage = JSON.parse(err.request.response)
                alert(errorMessage.message)
                toggle()
                updateComponent()
            });

        }
    }



    return (
        <div>
            <Button className="btn btn-dark" color="success" onClick={toggle} size='sm' style={{ width: 40, display: menu_edit == 1 ? "" : "none" }}  > <i className="fa fa-key"></i></Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='lg' >
                <ModalHeader toggle={toggle} ><h4 style={{ position: "absolute" }}>RESET PASSWORD</h4></ModalHeader>
                <ModalBody >
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <label>Username</label>
                        </div>
                        <div className="col-12 col-md-12">
                            <Input
                                type="text"
                                name="username"
                                value={username}
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12 col-md-12">
                            <label>New Password</label>
                        </div>
                        <div className="col-12 col-md-12">
                            <Input
                                type="text"
                                name="new_password"
                                value={new_password}
                                onChange={e => setnew_password(e.target.value)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleReset}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalResetPasswordEmployee;