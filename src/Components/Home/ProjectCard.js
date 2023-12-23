import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProjectDetail from './projectDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ProjectCard() {


  const [waitingProjects, setWaitingProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [deliveredProjects, setDeliveredProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Function to fetch projects waiting for approval
    const fetchWaitingProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const status = 'WAITING FOR APPROVAL';
        const response = await fetch(`http://localhost:3001/api/client/projects/filter?status=${status}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setWaitingProjects(data.projects);
      } catch (error) {
        console.error('Error fetching waiting projects:', error);
      }
    };

    fetchWaitingProjects();
  }, [waitingProjects]);

  useEffect(() => {
    // Function to fetch approved projects
    const fetchApprovedProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const status = 'APPROVED';
        const response = await fetch(`http://localhost:3001/api/client/projects/filter?status=${status}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setApprovedProjects(data.projects);
      } catch (error) {
        console.error('Error fetching approved projects:', error);
      }
    };

    fetchApprovedProjects();
  }, [approvedProjects]);

  useEffect(() => {
    // Function to fetch delivered projects
    const fetchDeliveredProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/client/projects/deliveredhistory`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setDeliveredProjects(data.projects);
      } catch (error) {
        console.error('Error fetching delivered projects:', error);
      }
    };

    fetchDeliveredProjects();
  }, [deliveredProjects]);

  useEffect(() => {
    // Function to fetch rejected projects
    const fetchRejectedProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const status = 'REJECTED';
        const response = await fetch(`http://localhost:3001/api/client/projects/filter?status=${status}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setRejectedProjects(data.projects);
      } catch (error) {
        console.error('Error fetching rejected projects:', error);
      }
    };

    fetchRejectedProjects();
  }, [rejectedProjects]);


  const handleViewDetail = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };
  /////////////////////////////////////////
  const handleDeleteProject = async (projectId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3001/api/client/delete-project/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Log the response for more details
        console.error(`Failed to delete project: ${response.status}`, errorResponse);
        // Handle error cases based on the response status
        throw new Error(`Failed to delete project: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // "Project deleted successfully"
    } catch (error) {
      console.error('Error deleting project:', error.message);
    }
  };

  ////////////////////////////////////////

  return (
    <div>
      <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }}>Projects Waiting for Approval</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {waitingProjects.length > 0 ? (
          <>
            {waitingProjects.map((project) => (
              <div key={project._id}>
                <Card border="primary" style={{ width: '18rem', margin: '10px' }}>
                  <Card.Body>
                    <Card.Title>Title: {project.Title}
                      <span style={{ position: 'absolute', top: '11%', right: 0, transform: 'translateY(-50%)', marginLeft: '10px', }} >
                        <FontAwesomeIcon icon={faEdit} onClick={() => setModalShow(true)} />
                      </span>
                      <span style={{ position: 'absolute', top: '90%', right: 0, transform: 'translateY(-50%)', marginLeft: '10px', }} >
                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteProject(project._id)} />
                      </span>
                    </Card.Title>

                    <Card.Text>Budget: {project.Budget}</Card.Text>
                    <Button variant="outline-primary" onClick={() => handleViewDetail(project)}>
                      VIEW MORE DETAIL
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {selectedProject && (<ProjectDetail show={modalShow}
              onHide={() => {
                setModalShow(false);
                setSelectedProject(null);
              }}
              project={selectedProject} />)
            }
          </>
        ) : (
          <p>No projects waiting for approval.</p>
        )}
      </div>


      <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }}>Approved Projects</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {approvedProjects.length > 0 ? (
          <>
            {approvedProjects.map((project) => (
              <Card key={project._id} border="success" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>Title: {project.Title}</Card.Title>
                  <Card.Text>Budget: {project.Budget}</Card.Text>
                  <Button variant="outline-success">VIEW MORE DETAIL</Button>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <p>No approved projects.</p>
        )}
      </div>

      <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }}>Delivered Projects</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {deliveredProjects.length > 0 ? (
          <>
            {deliveredProjects.map((project) => (
              <Card key={project._id} border="info" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>ID: {project._id} </Card.Title>
                  <Card.Title>Title: {project.Title} </Card.Title>
                  <Card.Text>Budget: {project.Budget}</Card.Text>
                  <Button variant="outline-info">VIEW MORE DETAIL</Button>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <p>No delivered projects.</p>
        )}
      </div>

      <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }}>Rejected Projects</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {rejectedProjects.length > 0 ? (
          <>
            {rejectedProjects.map((project) => (
              <Card key={project._id} border="danger" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>Title: {project.Title}
                  <span style={{ position: 'absolute', top: '10%', right: 0, transform: 'translateY(-50%)', marginLeft: '10px', }} >
                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteProject(project._id)} />
                  </span>
                  </Card.Title>
                  <Card.Text>Budget: {project.Budget}</Card.Text>
                  <Button variant="outline-danger">VIEW MORE DETAIL</Button>
                </Card.Body>
              </Card>
            ))}
          </>
        ) : (
          <p>No rejected projects.</p>
        )}
      </div>
      {/* <div> <ProjectDetail show={modalShow} onHide={() => setModalShow(false)}  projectId={project._id} /> </div> */}
    </div>
  );
}

export default ProjectCard;
