import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SampleProject(props) {
  const { freelancer } = props;
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [sampleProjects, setSampleProjects] = useState([]);

  useEffect(() => {
    console.log(" smaple project use effect trigger");
    // Fetch sample projects based on freelancer._id
    const fetchSampleProjects = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/client/search-freelancer-by-id?freelancerId=${freelancer._id}`);
        const data = await response.json();
        setSampleProjects(data.freelancer.Samples);
      } catch (error) {
        console.error('Error fetching sample projects:', error);
      }
    };

    fetchSampleProjects();
  }, [sampleProjects]);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
        View Samples
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Freelancer: {freelancer.FullName}</Modal.Title>
        </Modal.Header>
        <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '5vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
          <Modal.Body>
            {sampleProjects.length === 0 ? (
              <p><h1>No sample projects uploaded by the freelancer {freelancer.FullName}. </h1></p>
            ) : (
              <Row xs={1} md={2} className="g-4">
                {sampleProjects.map((sample, idx) => (
                  <Col key={idx}>
                    <Card>
                      {sample?.ImagePaths && sample.ImagePaths.length > 0 && (
                        <Card.Img variant="top" src={sample.ImagePaths[0]} />
                      )}
                      <Card.Body>
                        {sample?.Title && <Card.Title>{sample.Title}</Card.Title>}
                        {sample?.Description && <Card.Text>{sample.Description}</Card.Text>}
                        {sample?.Technologies && (
                          <Card.Text>
                            Technologies: {sample.Technologies.join(', ')}
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default SampleProject;
