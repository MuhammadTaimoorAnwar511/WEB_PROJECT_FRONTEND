// MyVerticallyCenteredModal.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Style/Home/projectDetail.css'; 


function ProjectDetail(props) {
  const { project } = props;

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="ModalHeader" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ProjectDetailTitle">
          Project Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ProjectDetailContainer">
            <p><b>PROJECT ID:</b> {project._id}</p>
            <p><b>PROJECT Deadline:</b> {project.Deadline}</p>
            <p><b>PROJECT Title:</b> {project.Title}</p>
            <p><b>PROJECT Requirements:</b> {project.Requirements}</p>
            <p><b>PROJECT Description:</b> {project.Description}</p>
            <p><b>PROJECT UserId:</b> {project.UserId}</p>
            <p><b>PROJECT Username:</b> {project.Username}</p>
            <p><b>PROJECT FreelancerId:</b> {project.Assigned}</p>
            <p><b>PROJECT FreelancerName:</b> {project.AssignedUsername}</p>
            <p><b>PROJECT Keywords:</b> {project.Keywords.join(', ')} </p>
            <p className="ProjectDetailCreatedAt"><b>PROJECT createdAt:</b> {project.createdAt}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="ModalFooter">
        <Button variant="secondary" className="ButtonClose" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" className="ButtonSaveChanges">
          Edit Detail
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectDetail;
