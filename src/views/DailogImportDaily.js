import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';


const DailogImportDaily = (props) => {
    const {
        buttonLabel,
        className,
        fileExcel,
        fileName,

        menu_save,
        updateComponent,

    } = props;

    const [modal, setModal] = useState(false);
    const [progressOpen, setprogressOpen] = useState(false);


    const toggle = () => setModal(!modal);


    const handleImportExcel = () => {

        if (!fileExcel) {
            alert('กรุณาเลือกไฟล์ที่ต้องการ import')
        } else {
            setprogressOpen(true)

            const formData = new FormData();
            formData.append('select_file', fileExcel)

            axios.post(API.DAILY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            <Button className="float-right btn btn-flat m-b-30 m-t-30 btn-primary" onClick={toggle} size='sm' style={{  display: menu_save == 1 ? "" : "none" }} > <i class="fa  fa-upload"></i>  IMPORT</Button>
            <Modal isOpen={modal} toggle={toggle}className={className} size='md' >
                <Progressbar
                    Open={progressOpen}
                />
                <ModalBody >
                    Confirm to import file {fileName} ?
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleImportExcel}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
}

export default DailogImportDaily;