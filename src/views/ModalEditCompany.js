import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';


const ModalEditCompany = (props) => {
    const {
        buttonLabel,
        className,
        company_id,
        name,
        symbol,
        updateComponent,
        menu_edit

    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [Name, setName] = useState(name);
    const [Symbol, setSymbol] = useState(symbol);

    const [progressOpen, setprogressOpen] = useState(false);


    const handleEdit = () => {

        const params = {
            name: Name,
            symbol: Symbol,
        };
        console.log(params)

        if (!params.name) {
            alert('Please enter a name')

        } else if (!params.symbol) {
            alert('Please enter a symbol')
        } else {

            axios.put(API.COMPANY + '/' + company_id, params, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {

                if (res.data.code == 201) {

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
            <Button className="btn btn-warning" color="warning" onClick={toggle} size='sm' style={{ width: 40, display: menu_edit == 1 ? "" : "none" }}  > <i className="fa fa-edit"></i></Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='lg' >
                <ModalHeader toggle={toggle} ><h4 style={{ position: "absolute" }}>EDIT COMPANY</h4></ModalHeader>
                <Progressbar
                    Open={progressOpen}
                />
                <ModalBody>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Name<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Name"
                                    value={Name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Symbol<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Symbol"
                                    value={Symbol}
                                    onChange={e => setSymbol(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEdit}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </div>
    );
}

export default ModalEditCompany;