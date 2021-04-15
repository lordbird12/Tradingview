import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';

const DialogClearDaily = (props) => {
    const {
        buttonLabel,
        className,
        updateComponent,
        menu_delete,

    } = props;

    const [modal, setModal] = useState(false);


    const toggle = () => setModal(!modal);


    const handleDelete = () => {

        const params = {
            //
        };

        axios.post(API.CLEAR_ALL_DAILY_DATA, params, {
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
            <Button className="btn btn-block btn-danger" onClick={toggle} size='md' style={{ display: menu_delete == 1 ? "" : "none" }} > <i className="fa fa-trash"></i> Clear All</Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='sm' >
                <ModalBody >
                    Confirm delete all data
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleDelete}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
}

export default DialogClearDaily;