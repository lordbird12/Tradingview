import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';

const DailogAddCompany = (props) => {
    const {
        buttonLabel,
        className,
        name,
        symbol,

        updateComponent,
        menu_save

    } = props;

    const [modal, setModal] = useState(false);
    const [progressOpen, setprogressOpen] = useState(false);


    const toggle = () => setModal(!modal);


    const DailogAddCompany = () => {

        const params = {
            name: name,
            symbol: symbol,
        };
        console.log(params)

        if (!params.name) {
            alert('Please enter a name')

        } else if (!params.symbol) {
            alert('Please enter a symbol')
        } else {

            setprogressOpen(true)


            axios.post(API.COMPANY, params, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {

                if (res.data.code == 200) {

                    setprogressOpen(false)
                    alert(res.data.message)
                    toggle()
                    updateComponent()

                }

            }).catch(err => {

                const errorMessage = JSON.parse(err.request.response)
                setprogressOpen(false)
                alert(errorMessage.message)
                toggle()
                updateComponent()
            });

        }
    }

    return (
        <div>
            <Button className="btn btn-primary" onClick={toggle} size='md' style={{  display: menu_save == 1 ? "" : "none" }}  >Confirm</Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='sm' >
                <Progressbar
                    Open={progressOpen}
                />
                <ModalBody >
                    Confirm the addition of user information
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={DailogAddCompany}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
}

export default DailogAddCompany;