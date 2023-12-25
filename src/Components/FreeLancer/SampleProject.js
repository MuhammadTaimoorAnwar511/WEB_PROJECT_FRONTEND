import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SampleProject(props) {
  const { freelancer } = props;
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
          View Samples {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Freelancer: {freelancer.FullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {freelancer.Samples.length === 0 ? (
            <p><h1>No sample projects uploaded by the freelancer {freelancer.FullName}. </h1></p>
          ) : (
            <Row xs={1} md={2} className="g-4">
              {freelancer.Samples.map((sample, idx) => (
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
      </Modal>
    </>
  );
}

export default SampleProject;
