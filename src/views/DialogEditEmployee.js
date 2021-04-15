import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';

const DialogEditEmployee = (props) => {
    const {
        buttonLabel,
        className,
        user_id,
        full_name,
        nick_name,
        permission_id,
        update_Component

    } = props;

    const [modal, setModal] = useState(false);
    const [progressOpen, setprogressOpen] = useState(false);

    const toggle = () => setModal(!modal);


    const handleEditemployee = () => {

        setprogressOpen(true)

        if (!full_name || !nick_name || !permission_id) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            setprogressOpen(false)
            toggle()
        } else {

            const params = {
                permission_id: permission_id,
                full_name: full_name,
                nick_name: nick_name,
            };


            axios.put(API.EDIT_USER + '/' + user_id, params, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {

                if (res.data.code == 201) {

                    alert(res.data.message)
                    setprogressOpen(false)
                    toggle()
                    update_Component()


                }

            }).catch(err => {

                const errorMessage = JSON.parse(err.request.response)
                setprogressOpen(false)
                alert(errorMessage.message)
                toggle()
            });

        }
    }


    return (
        <div>
            <Button className="float-right btn btn-flat m-b-30 m-t-30" color="primary" onClick={toggle} size='sm' style={{ color: "white", width: 100 }}  >SAVE</Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='md' >
                <Progressbar
                    Open={progressOpen}
                />
                <ModalBody >
                    Confirm correction of user information
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEditemployee}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
}

export default DialogEditEmployee;