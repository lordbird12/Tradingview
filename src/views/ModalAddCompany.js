import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import AddCompany from './AddCompany';

const ModalAddCompany = (props) => {
  const {
    buttonLabel,
    className,
    employeeID,
    updateComponent,
    menu_save

  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  return (
    <div>
      <Button className="btn btn-block" color="primary" onClick={toggle} size='md' style={{ display: menu_save == 1 ? "" : "none" }}  > <i className="fa fa-plus"></i> Add Company</Button>
      <Modal isOpen={modal} toggle={toggle} class="modal custom-modal fade" size='lg' >
        <ModalHeader toggle={toggle} ><h4 style={{ position: "absolute" }}>ADD COMPANY</h4></ModalHeader>
        <ModalBody >
          <AddCompany
            menu_save={menu_save}
            updateComponent={updateComponent}
          />
        </ModalBody>

      </Modal>
    </div>
  );
}

export default ModalAddCompany;