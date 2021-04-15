import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import DailogImportOld from './DailogImportOld';

const ModalImportOld = (props) => {
    const {
        buttonLabel,
        className,
        company_id,

        updateComponent,
        menu_save

    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const [File, setFile] = useState('');
    const [FileName, setFileName] = useState('');

    return (
        <div>
            <Button className="btn btn-block btn" color="primary" onClick={toggle} size='md' style={{ display: menu_save == 1 ? "" : "none" }}  > <i className="fa fa-upload"></i>  Import data</Button>
            <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='lg' >
                <ModalHeader toggle={toggle} ><h4 style={{ position: "absolute" }}>Import Old Data </h4></ModalHeader>
                <ModalBody>

                    <div class="row form-group">
                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">File Excel</label></div>
                        <div class="col-12 col-md-8">
                            <div class="col-12 col-md-9">
                                <Input
                                    type="file"
                                    name="File"
                                    onChange={e => {
                                        setFile(e.target.files[0])
                                        setFileName(e.target.files[0].name)
                                    }}
                                />
                                <span class="help-block">
                                    <i class="fa  fa-upload"></i>{" "}
                                    <label style={{ color: "#007bff" }}>
                                        file .xls .xlsx .csv
                                  </label>
                                </span>
                                <br />
                                <div class="row mt-2">
                                    <button className="btn btn-sm btn-link" onClick={() => { window.open(API.BASE_URL + '/api/download_file/old.csv') }}>fomat data</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-12 text-right">
                            <DailogImportOld
                                company_id={company_id}
                                fileExcel={File}
                                fileName={FileName}

                                updateComponent={updateComponent}
                                menu_save={menu_save}
                            />
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    );
}

export default ModalImportOld;