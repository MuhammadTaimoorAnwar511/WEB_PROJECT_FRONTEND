import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Style/Home/projectDetail.css';
import SampleProject from './SampleProject';

function DetailFreeLancer(props) 
{
  const { freelancer } = props;
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [freelancersamplesmodalShow, freelancersamplessetModalShow] = React.useState(false);

  
  if (!freelancer || typeof freelancer !== 'object' || !freelancer._id) {
    return null; 
  }
  const handleFreeLancerDetailClick = (freelancer) => {
    console.log("freelancersamplesmodalShow button is clicked");
    setSelectedFreelancer(freelancer);
    freelancersamplessetModalShow(true);
  };

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
          </div>
        </Modal.Body>
        <Modal.Footer className="ModalFooter">
          <Button variant="secondary" className="ButtonClose" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="outline-primary" className="ButtonClose" onClick={() => handleFreeLancerDetailClick(freelancer)}>
            Sample Projects
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add the SampleProject component here with props */}
      <SampleProject show={freelancersamplesmodalShow} onHide={() => freelancersamplessetModalShow(false)} freelancer={selectedFreelancer} />
    </>
  );
}
export default DetailFreeLancer;
