import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HoverRatingSeller from './HoverRatingSeller';

function SellerProjectsSeller(props) {
    const { seller } = props;
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [sellerProjects, setSellerProjects] = useState(null);

    useEffect(() => {
        const fetchSellerProjects = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/client/sellerprojects/${seller?._id}`);
                const data = await response.json();

                if (response.ok) {
                    setSellerProjects(data.projects);
                } else {
                    setSellerProjects([]); // Set empty array for sellers with no projects
                    console.log(data.message); // Log the error message
                }
            } catch (error) {
                console.error('Error fetching seller projects:', error);
            }
        };

        fetchSellerProjects();
    }, [seller, sellerProjects]);

    const handleShow = (breakpoint) => {
        setFullscreen(breakpoint);
        setShow(true);
    };

    const handleBuyClick = async (projectId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/client/buyproject/${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({}),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Handle success, e.g., update state or show a success message
                console.log('Project bought successfully!');
                alert('Project purchased successfully!');
            } else {
                // Check for the specific error messages and display an alert
                if (responseData.message === 'Buyer has already purchased this project') {
                    alert('You have already purchased this project.');
                } else if (responseData.message === 'Insufficient balance. Please top up your account.') {
                    alert('Insufficient balance. Please top up your account.');
                } else {
                    // Handle other errors, e.g., show a generic error message
                    console.error('Error buying project:', response.statusText);
                    alert('Error buying project. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error buying project:', error.message);
            alert('Error buying project. Please try again.');
        }
    };



    return (
        <>
            {values.map((v, idx) => (
                <Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
                    View Seller Projects {typeof v === 'string' && `below ${v.split('-')[0]}`}
                </Button>
            ))}
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Seller: {seller?.FullName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {sellerProjects !== null ? (
                        sellerProjects.length === 0 ? (
                            <p>No projects uploaded by the seller {seller?.FullName}.</p>
                        ) : (
                            <Row xs={1} md={2} className="g-4">
                                {sellerProjects.map((project, idx) => (
                                    <Col key={idx}>
                                        <Card>
                                            {project?.ImagePaths && project.ImagePaths.length > 0 && (
                                                <Card.Img variant="top" src={project.ImagePaths[0]} />
                                            )}
                                            <Card.Body>
                                                {project?.Title && <Card.Title>{project.Title}</Card.Title>}
                                                {project?._id && <Card.Text>ID: {project._id}</Card.Text>}
                                                {project?.Description && <Card.Text>{project.Description}</Card.Text>}
                                                {project?.Technologies && (
                                                    <Card.Text>Technologies: {project.Technologies.join(', ')}</Card.Text>
                                                )}
                                                <Card.Text>Average Rating: {project.AvgRating.toFixed(1)}</Card.Text>
                                                {project?.Price && <Card.Text>Price: {project.Price}</Card.Text>}
                                                <HoverRatingSeller projectId={project._id} />
                                                <span className="float-end">
                                                    <Button variant="outline-primary" onClick={() => handleBuyClick(project._id)}>
                                                        Buy
                                                    </Button>
                                                </span>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SellerProjectsSeller;
