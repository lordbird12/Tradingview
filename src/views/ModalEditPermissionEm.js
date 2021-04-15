import React, { useState } from 'react';
import {Container, Row, Col,  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import EditPermissionEmployeeList from './EditPermissionEmployeeList';

const ModalEditPermissionEm = (props) => {
  const {
    buttonLabel,
    className,
    permissionID,
    permission_name,
    updateComponent,
    menu_edit
   
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

 
  return (
    <div>
      <Button className ="btn btn-success" color="success" onClick={toggle} size = 'sm' style={{ width: 40, display:menu_edit == 1 ?"":"none"}}> <i className="fa fa-user"></i></Button>
      <Modal isOpen={modal} toggle={toggle} class="modal custom-modal fade" size ='lg' >
          <ModalHeader toggle={toggle} className ="bg-success"><h4 style={{position:"absolute",color:'white'}}>อัปเดดพนักงาน {permission_name}</h4></ModalHeader>
        <ModalBody >
        <EditPermissionEmployeeList
        permission_ID ={permissionID}
        menuEdit8 = {menu_edit}
        />
        </ModalBody>
      
        </Modal>
    </div>
  );
}

export default ModalEditPermissionEm;