import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import HoverRatingFreeLancer from './HoverRatingFreeLancer';
import DetailFreeLancer from './DetailFreeLancer';
import AssignProject from './AssignProject';
import ChatFreelancer from './ChatFreelancer';

function FreeLancerCard() {

    const [freelancers, setFreelancers] = useState([]);// to store all freelancer data 
    const [modalShow, setModalShow] = React.useState(false);//to handel assigned project 
    const [freelancerdetailmodalShow, freelancerdetailsetModalShow] = React.useState(false);//to handel freelancerdetail
    const [selectedFreelancer, setSelectedFreelancer] = useState(null);// to select specific frellancer
    const [searchTerm, setSearchTerm] = useState('');//TO SEARCH FREELANCER

    useEffect(() => {
        console.log("FreeLancerCard use effect trigger");
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3001/api/client/search-allfreelancers', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFreelancers(data.freelancers);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchData();

    }, [freelancers]);

    const handleAssignProjectClick = (freelancer) => {
        console.log("assigned button is clicked");
        setSelectedFreelancer(freelancer);
        setModalShow(true);
    };
    const handleFreeLancerDetailClick = (freelancer) => {
        console.log("handleFreeLancerDetail button is clicked");
        setSelectedFreelancer(freelancer);
        freelancerdetailsetModalShow(true);
    };


    return (
        <div>
            <div>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '200px', marginBottom: '10px', marginTop: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', transition: 'border-color 0.3s ease-in-out', }} />
            </div>
            <div>
                <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }} >FreeLancerMarketPlace</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                {freelancers.filter((freelancer) =>
                    freelancer.FullName.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((freelancer) => (
                    <Card key={freelancer._id} style={{ width: '18rem', margin: '10px' }}>
                        {/* Add other card content based on the freelancer data */}
                        <Card.Img variant="top" src="/FreeLancerPic.jpg" style={{ width: '100%', height: '150px' }} />
                        <Card.Body>

                            <Card.Title>{freelancer.FullName}</Card.Title>
                            <Card.Text>
                                <p><b>Email: </b>{freelancer.Email}</p>
                                <p><b>Speciality: </b>{freelancer.Specialities.join(', ')}</p>
                            </Card.Text>
                            <span>
                                <Button variant="outline-primary" style={{ marginRight: '10px' }} onClick={() => handleAssignProjectClick(freelancer)} > Assign Project </Button>
                                <Button variant="outline-primary" style={{ marginRight: '10px' }} onClick={() => handleFreeLancerDetailClick(freelancer)} > View Detail </Button>
                            </span>
                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                <HoverRatingFreeLancer freelancerId={freelancer._id} />
                                <span style={{ marginLeft: '5px' }}>{freelancer.AvgRating.toFixed(1)}</span>
                                <ChatFreelancer freelancerId={freelancer._id} freelancerName={freelancer.FullName} />
                            </div>
                        </Card.Body>
                    </Card>
                ))}
                {/* DEFINE IN COMPONENT */}
                <AssignProject show={modalShow} onHide={() => setModalShow(false)} freelancer={selectedFreelancer} />
                {/* DEFINE IN COMPONENT */}
                <DetailFreeLancer show={freelancerdetailmodalShow} onHide={() => freelancerdetailsetModalShow(false)} freelancer={selectedFreelancer} />

            </div>
        </div>
    );
}

export default FreeLancerCard;
