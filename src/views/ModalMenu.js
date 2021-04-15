import React, { useState } from 'react';
import {Container, Row, Col,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Menu from './Manu';

const ModalMenu = (props) => {
  const {
    buttonLabel,
    className,
    permissionID,
    updateComponent,
    menu_edit
   
  } = props;

  const [modal, setModal] = useState(false);


  const toggle = () => setModal(!modal);


  return (
    <div>
      <Button className ="btn btn-primary" color="primary" onClick={toggle} size = 'sm' style={{ width: 40, }} > <i className="fa fa-bars"></i></Button>
      <Modal isOpen={modal} toggle={toggle} class="modal custom-modal fade" size ='lg' >
          <ModalHeader toggle={toggle} className="" ><h4 style={{position:'absolute'}}>Edit Permission</h4></ModalHeader>
        <ModalBody >
        <Menu
        permission_ID ={permissionID}
        menuEdit8 = {menu_edit}
        />
        </ModalBody>
       
       
      </Modal>
    </div>
  );
}

export default ModalMenu;