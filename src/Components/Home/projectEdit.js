import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Style/Home/projectDetail.css';

function ProjectEdit(props) {
  const { project } = props;
  const token = localStorage.getItem('token');

  const [editedProject, setEditedProject] = useState({
    _id: project._id,
    Deadline: project.Deadline,
    Title: project.Title,
    Requirements: project.Requirements,
    Description: project.Description,
    UserId: project.UserId,
    Username: project.Username,
    Assigned: project.Assigned,
    AssignedUsername: project.AssignedUsername,
    Keywords:  [],
  });

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === 'Keywords') {
      const keywordsArray = value.replace(/^\s*,/, '').split(',').map(keyword => keyword.trim());
      setEditedProject({
        ...editedProject,
        [fieldName]: keywordsArray,
      });
    } else {
      setEditedProject({
        ...editedProject,
        [fieldName]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/client/edit-project/${project._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProject),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const updatedProject = await response.json();
     // console.log('Project updated successfully:', updatedProject);

      setEditedProject({
        ...editedProject,
        Deadline: updatedProject.project.Deadline,
        Title: updatedProject.project.Title,
        Requirements: updatedProject.project.Requirements,
        Description: updatedProject.project.Description,
        Assigned: updatedProject.project.Assigned,
        AssignedUsername: updatedProject.project.AssignedUsername,
        Keywords: updatedProject.project.Keywords,
      });

      props.onHide();
      props.parentOnHide(); 
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="ModalHeader" closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ProjectDetailTitle">
          Edit Project Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ProjectDetailContainer">
          <p><b>PROJECT ID:</b> {editedProject._id}</p>
          <p><b>PROJECT Deadline:</b>{' '} <input type="text" value={editedProject.Deadline} onChange={(e) => handleFieldChange('Deadline', e.target.value)} /></p>
          <p><b>PROJECT Title:</b>{' '} <input type="text" value={editedProject.Title} onChange={(e) => handleFieldChange('Title', e.target.value)} /></p>
          <b>PROJECT Requirements:</b>{' '}<textarea type="text" value={editedProject.Requirements} onChange={(e) => handleFieldChange('Requirements', e.target.value)} />
          <p><b>PROJECT Description:</b>{' '} <textarea type="text" value={editedProject.Description} onChange={(e) => handleFieldChange('Description', e.target.value)} /></p>
          <p><b>PROJECT UserId:</b> {editedProject.UserId}</p>
          <p><b>PROJECT Username:</b> {editedProject.Username}</p>
          <p><b>PROJECT FreelancerId:</b> {editedProject.Assigned}</p>
          <p><b>PROJECT FreelancerName:</b> {editedProject.AssignedUsername}</p>
          <p><b>PROJECT Keywords:</b><input name="Keywords" type="text" value={editedProject.Keywords.join(', ')} onChange={(e) => handleFieldChange('Keywords', e.target.value)} /></p>
          <p className="ProjectDetailCreatedAt"><b>PROJECT createdAt:</b> {editedProject.createdAt}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="ModalFooter">
        <Button variant="secondary" className="ButtonClose" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" className="ButtonSaveChanges" onClick={handleSaveChanges}>
          Update Detail
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectEdit;