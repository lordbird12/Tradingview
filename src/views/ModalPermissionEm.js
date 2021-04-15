import React, { useState } from 'react';
import {Container, Row, Col,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import PemissionEmployeeList from './PemissionEmployeeList';

const ModalPermissionEm = (props) => {
  const {
    buttonLabel,
    className,
    permissionID,
    permission_name,
    updateComponent,
   
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  

  return (
    <div>
      <Button className ="btn btn-info" color="info" onClick={toggle} size = 'sm' style={{ width: 40, }}  > <i className="fa fa-user"></i></Button>
      <Modal isOpen={modal} toggle={toggle} class="modal custom-modal fade" size ='lg' >
          <ModalHeader toggle={toggle} className ="bg-info"><h4 style={{position:"absolute",color:'white'}}>รายชื่อผู้ใช้งาน {permission_name}</h4></ModalHeader>
        <ModalBody >
        <PemissionEmployeeList
        permission_ID ={permissionID}
        />
        </ModalBody>
        </Modal>
    </div>
  );
}

export default ModalPermissionEm;