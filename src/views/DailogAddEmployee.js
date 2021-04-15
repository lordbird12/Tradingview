import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import qs from 'qs';
import API from '../api/API';
import Progressbar from './progressbar';

const DailogAddEmployee = (props) => {
  const {
    buttonLabel,
    className,
    permission_id,
    username,
    password,
    password_confrim,
    full_name,
    nick_name,
    updateComponent,
    menu_save

  } = props;

  const [modal, setModal] = useState(false);
  const [progressOpen, setprogressOpen] = useState(false);


  const toggle = () => setModal(!modal);


  const handleAddemployee = () => {


    const params = {
      permission_id,
      username: username,
      password,
      full_name,
      nick_name,
    };
    console.log(params)

    if (!params.permission_id) {
      alert('Please enter a permission')

    } else if (!params.username) {
      alert('Please enter a username')

    } else if (!params.password) {
      alert('Please enter a password')

    } else if (!params.full_name) {
      alert('Please enter a name')

    } else if (!params.nick_name) {
      alert('Please enter a nick name')

    } else if (params.password != password_confrim) {
      alert('Please enter a password match')

    } else {

      setprogressOpen(true)


      axios.post(API.ADD_USER, params, {
        headers: {
          'Content-Type': 'application/json',
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
      <Button className="btn btn-primary" onClick={toggle} size='md' style={{  display: menu_save == 1 ? "" : "none" }}  >Confirm</Button>
      <Modal isOpen={modal} toggle={toggle}class="modal custom-modal fade" size='sm' >
        <Progressbar
          Open={progressOpen}
        />
        <ModalBody >
          Confirm the addition of user information
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddemployee}>Confirm</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default DailogAddEmployee;