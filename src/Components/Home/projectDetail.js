// MyVerticallyCenteredModal.js
import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Style/Home/projectDetail.css'; 
import ProjectEdit from './projectEdit';

function ProjectDetail(props) {
  const { project } = props;
/////////////////////////////////// 
  const [showEditModal, setShowEditModal] = useState(false);

  //const handleEditModalShow = () =>{ setShowEditModal(true)};
  const handleEditModalShow = () => {setShowEditModal(true); 
    // props.onHide();
   };
  const handleEditModalClose = () => setShowEditModal(false);

//////////////////////////////////


  return (
    <>
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
            <p><b>PROJECT Budget:</b> {project.Budget}</p>
            <p><b>PROJECT UserId:</b> {project.UserId}</p>
            <p><b>PROJECT Username:</b> {project.Username}</p>
            <p><b>PROJECT FreelancerId:</b> {project.Assigned}</p>
            <p><b>PROJECT FreelancerName:</b> {project.AssignedUsername}</p>
            <p><b>PROJECT Keywords:</b> {project.Keywords.join(', ')} </p>
            <p className="ProjectDetailCreatedAt"><b>PROJECT createdAt:</b> {project.createdAt}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="ModalFooter">
        <Button variant="secondary" className="ButtonClose" onClick={props.onHide} >
          Close
        </Button>
        {/* <Button variant="primary" className="ButtonSaveChanges" onClick={handleEditModalShow}>
          Edit Detail
        </Button> */}
        {project.Status === 'WAITING FOR APPROVAL' && (
            <Button variant="primary" className="ButtonSaveChanges" onClick={handleEditModalShow}>
              Edit Detail
            </Button>
          )}
      </Modal.Footer>
    </Modal>
    <ProjectEdit show={showEditModal} onHide={handleEditModalClose} project={project} parentOnHide={props.onHide}/>
     {/* <ProjectEdit show={showEditModal} onHide={handleEditModalClose} project={project} /> */}

    </>    
  );
}

export default ProjectDetail;
