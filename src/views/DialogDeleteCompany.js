import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';

const DialogDeleteCompany = (props) => {
    const {
        buttonLabel,
        className,
        company_id,
        updateComponent,
        menu_delete,

    } = props;

    const [modal, setModal] = useState(false);


    const toggle = () => setModal(!modal);


    const handleDelete = () => {

        axios.delete(API.COMPANY + '/' + company_id, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {

            if (res.data.code == 201) {

                alert(res.data.message)
                updateComponent()
                toggle()

            }

        }).catch(err => {

            const errorMessage = JSON.parse(err.request.response)
            alert(errorMessage.message)
            toggle()
        });


    }

    return (
        <div>
            <Button className="btn btn-danger" onClick={toggle} size='sm' style={{ width: 45, display: menu_delete == 1 ? "" : "none" }} > <i className="fa fa-trash"></i></Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='sm' >
                <ModalBody >
                    Confirm delete of user information
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDelete}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
}

export default DialogDeleteCompany;