import React, { useState } from 'react';
import {Container, Row, Col,  Button, Modal, ModalHeader, ModalBody, ModalFooter,Progress  } from 'reactstrap';


const Progressbar = (props) => {
  const {
    buttonLabel,
    className,
    Open,
    id,
  } = props;


  return (
    <div>
      <Modal isOpen={Open}  className={className} size ='md' >
        <ModalBody>
        <Progress animated color='dark' value={100}/>
        </ModalBody>
       
      </Modal>
    </div>
  );
}

export default Progressbar;