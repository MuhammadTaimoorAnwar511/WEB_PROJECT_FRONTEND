import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SampleProject(props) {
  const { show, onHide, freelancer } = props;

  if (!freelancer || !freelancer.Samples || !Array.isArray(freelancer.Samples)) {
    return null;
  }

  return (
    <Row xs={1} md={2} className="g-4">
      {freelancer.Samples.map((project, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>{project.Title}</Card.Title>
              <Card.Text>{project.Description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SampleProject;
