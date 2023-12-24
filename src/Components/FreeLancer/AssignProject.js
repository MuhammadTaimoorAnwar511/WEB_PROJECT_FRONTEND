import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../Style/Home/projectDetail.css';

// ... (other imports and code)

function AssignProject(props) {
    const { freelancer, onHide } = props;
    const token = localStorage.getItem('token');

    const [projectDetails, setProjectDetails] = useState({
        Deadline: null, // Use null as the initial value for the DatePicker
        Title: '',
        Requirements: '',
        Description: '',
        Budget: '',
        Keywords: '',
    });

    const handleChange = (name, value) => {
        // If the name is 'Keywords', validate and update the state
        if (name === 'Keywords') {
            const isValidKeywords = /^[^,]+(,[^,]+)*$/.test(value);

            if (isValidKeywords) {
                setProjectDetails((prevDetails) => ({
                    ...prevDetails,
                    [name]: value.split(',').map((keyword) => keyword.trim()),
                }));
            } else {
                console.error('Invalid Keywords format');
            }
        } else {
            // For other input fields, update the state directly
            setProjectDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const handleAssignClick = async () => {
        try {
            // Check if freelancer exists and has _id before accessing its properties
            if (freelancer && freelancer._id) {
                const response = await fetch('http://localhost:3001/api/client/create-project?Assigned=' + freelancer._id, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(projectDetails),
                });

                if (response.ok) {
                    console.log('Project assigned successfully');
                    onHide(); // Close the modal after successful assignment
                } else {
                    const errorResponse = await response.json();
                    console.error('Failed to assign project:', errorResponse);

                    // Check if the error response contains insufficient balance message
                    if (errorResponse.error === 'Insufficient balance. Please top up.') {
                        // Show an alert to the user
                        alert('Insufficient balance. Please top up.');
                    }
                }
            } else {
                console.error('Freelancer or its ID is null or undefined');
            }
        } catch (error) {
            console.error('Error during project assignment:', error);
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
                    {freelancer ? (
                        <>
                            <p><b>FreelancerId: {freelancer._id}</b></p>
                            <p><b>FreelancerName: {freelancer.FullName}</b></p>
                        </>
                    ) : null}
                    <p><b>PROJECT Deadline:</b>{' '}
                        <DatePicker
                            selected={projectDetails.Deadline}
                            onChange={(date) => handleChange('Deadline', date)}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </p>
                    <p><b>PROJECT Title:</b>{' '} <input type="text" name="Title" onChange={(e) => handleChange('Title', e.target.value)} /></p>
                    <p><b>PROJECT Requirements:</b>{' '}<textarea type="text" name="Requirements" onChange={(e) => handleChange('Requirements', e.target.value)} /></p>
                    <p><b>PROJECT Description:</b>{' '} <textarea type="text" name="Description" onChange={(e) => handleChange('Description', e.target.value)} /></p>
                    <p><b>PROJECT Budget:</b> <input type="text" name="Budget" onChange={(e) => handleChange('Budget', e.target.value)} /></p>
                    <p><b>PROJECT Keywords:</b><input name="Keywords" type="text" onChange={(e) => handleChange('Keywords', e.target.value)} /></p>
                </div>
            </Modal.Body>
            <Modal.Footer className="ModalFooter">
                <Button variant="secondary" className="ButtonClose" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" className="ButtonSaveChanges" onClick={handleAssignClick}>
                    Assign
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AssignProject;
