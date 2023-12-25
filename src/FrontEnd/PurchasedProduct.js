import React, { useState, useEffect } from 'react';
import Navebar from '../Components/Navebar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const PurchasedProduct = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects when the component mounts
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/client/buyerprojects', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [projects]);

    return (
        <div>
            <Navebar />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {projects.map((project) => (
                    <Card key={project._id} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Img variant="top" src={project.ImageUrl[0]} />
                        <Card.Body>
                            <Card.Title>{project.Title}</Card.Title>
                            <Card.Text>{project.Description}</Card.Text>
                            <Card.Text>Price: ${project.Price}</Card.Text>
                            <Card.Text>Average Rating: {project.AvgRating.toFixed(1)}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PurchasedProduct;
