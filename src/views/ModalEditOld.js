import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';


const ModalEditOld = (props) => {
    const {
        buttonLabel,
        className,
        old_id,
        date,
        price,
        open,
        high,
        low,
        volume,
        change,

        updateComponent,
        menu_edit

    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [Date, setDate] = useState(date);
    const [Price, setPrice] = useState(price);
    const [Open, setOpen] = useState(open);
    const [High, setHigh] = useState(high);
    const [Low, setLow] = useState(low);
    const [Volume, setVolume] = useState(volume);
    const [Change, setChange] = useState(change);


    const [progressOpen, setprogressOpen] = useState(false);


    const handleEdit = () => {

        const params = {

            date: Date,
            price: Price,
            open: Open,
            high: High,
            low: Low,
            volume: Volume,
            change: Change,
        };
        console.log(params)

        if (!params.date) {
            alert('Please enter a date')

        } else if (!params.price) {
            alert('Please enter a price')
        } else if (!params.open) {
            alert('Please enter a open')
        } else if (!params.high) {
            alert('Please enter a high')
        } else if (!params.low) {
            alert('Please enter a low')
        } else if (!params.volume) {
            alert('Please enter a volume')
        } else if (!params.change) {
            alert('Please enter a change')
        } else {

            axios.put(API.OLD + '/' + old_id, params, {
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
                <ModalHeader toggle={toggle} ><h4 style={{ position: "absolute" }}>EDIT OLD DATA</h4></ModalHeader>
                <Progressbar
                    Open={progressOpen}
                />
                <ModalBody>
                    <div class="row">
                        {/* <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Date<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Date"
                                    value={Date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                        </div> */}
                         <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Price<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Price"
                                    value={Price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Open<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Open"
                                    value={Open}
                                    onChange={e => setOpen(e.target.value)}
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">High<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="High"
                                    value={High}
                                    onChange={e => setHigh(e.target.value)}
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Low<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Low"
                                    value={Low}
                                    onChange={e => setLow(e.target.value)}
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Volume<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Volume"
                                    value={Volume}
                                    onChange={e => setVolume(e.target.value)}
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="col-form-label">Change<span
                                    class="text-danger">*</span></label>
                                <Input
                                    type="text"
                                    name="Change"
                                    value={Change}
                                    onChange={e => setChange(e.target.value)}
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

export default ModalEditOld;