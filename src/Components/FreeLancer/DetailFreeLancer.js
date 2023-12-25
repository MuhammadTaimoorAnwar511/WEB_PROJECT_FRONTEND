import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Style/Home/projectDetail.css';
import SampleProject from './SampleProject';

function DetailFreeLancer(props) {
  const { freelancer } = props;

  const selectedFreelancer = (props.freelancer);


  console.log("seleted freelance" + selectedFreelancer);
  if (!freelancer || typeof freelancer !== 'object' || !freelancer._id || !Array.isArray(freelancer.Samples)) {
    return null;
  }


  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="ModalHeader" closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="ProjectDetailTitle">
            Freelancer Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ProjectDetailContainer">
            <p><b>Freelancer ID:</b> {freelancer._id}</p>
            <p><b>Full Name:</b> {freelancer.FullName}</p>
            <p><b>Email:</b> {freelancer.Email}</p>
            <p><b>Specialities:</b> {freelancer.Specialities.join(', ')}</p>
            <p><b>Samples Project:</b></p>
          </div>
        </Modal.Body>
        <Modal.Footer className="ModalFooter">
          <Button variant="secondary" className="ButtonClose" onClick={props.onHide}>
            Close
          </Button>
          <SampleProject freelancer={selectedFreelancer} />
          
        </Modal.Footer>
      </Modal>

    </>
  );
}
export default DetailFreeLancer;
