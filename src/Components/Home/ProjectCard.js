import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ProjectCard() {
  const [waitingProjects, setWaitingProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [deliveredProjects, setDeliveredProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);

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

  return (
    <div>
       <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }}>Projects Waiting for Approval</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {waitingProjects.length > 0 ? (
          <>
            {waitingProjects.map((project) => (
              <Card key={project._id} border="primary" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>Title: {project.Title}</Card.Title>
                  <Card.Text>Budget: {project.Budget}</Card.Text>
                  <Button variant="outline-primary">VIEW MORE DETAIL</Button>
                </Card.Body>
              </Card>
            ))}
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
                  <Card.Title>Title: {project.Title}</Card.Title>
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
    </div>
  );
}

export default ProjectCard;
