import React, { useState, useEffect } from 'react';
import Navebar from '../Components/Navebar';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const PurchasedProduct = () => {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch projects when the component mounts
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/client/buyerprojects', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Filter projects based on the search query
                const filteredProjects = response.data.projects.filter((project) =>
                    project.Title.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setProjects(filteredProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [searchQuery, projects]);

    return (
        <div>
            <Navebar />
            <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '5vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '200px', marginBottom: '10px', marginTop: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', transition: 'border-color 0.3s ease-in-out', }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
            <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '15vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
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
        </div>
    );
};

export default PurchasedProduct;
