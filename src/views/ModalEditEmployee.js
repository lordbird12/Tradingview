import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import EditEmployee from './EditEmployee';

const ModalEditEmployee = (props) => {
  const {
    buttonLabel,
    className,
    employeeID,
    updateComponent,
    menu_edit

  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  return (
    <div>
      <Button className="btn btn-dark" color="warning" onClick={toggle} size='sm' style={{ width: 40, display: menu_edit == 1 ? "" : "none" }}  > <i className="fa fa-edit"></i></Button>
      <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='lg' >
        <ModalHeader toggle={toggle} ><h4 style={{ position: "absolute" }}>EDIT USER</h4></ModalHeader>
        <ModalBody >
          <EditEmployee
            EMID={employeeID}
            toggle={toggle}
            update_Component={updateComponent}
          />
        </ModalBody>

      </Modal>
    </div>
  );
}

export default ModalEditEmployee;