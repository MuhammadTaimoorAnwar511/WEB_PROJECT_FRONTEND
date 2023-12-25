// SellerCard.js

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DetailSeller from './DetailSeller';
import ChatSeller from './ChatSeller';

function SellerCard() {

    const [sellers, setSellers] = useState([]); // to store all seller data
    const [modalShow, setModalShow] = React.useState(false); // to handle assigned project
    const [sellerDetailModalShow, setSellerDetailModalShow] = React.useState(false); // to handle seller detail
    const [selectedSeller, setSelectedSeller] = useState(null); // to select a specific seller
    const [searchTerm, setSearchTerm] = useState(''); // TO SEARCH SELLER

    useEffect(() => {
        console.log("SellerCard useEffect triggered");
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3001/api/client/search-allseller', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setSellers(data.sellers);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchData();

    }, [sellers]);

    const handleAssignProjectClick = (seller) => {
        console.log("Assign Project button is clicked");
        setSelectedSeller(seller);
        setModalShow(true);
    };

    const handleSellerDetailClick = (seller) => {
        console.log("Seller Detail button is clicked");
        setSelectedSeller(seller);
        setSellerDetailModalShow(true);
    };

    return (
        <div>
            <div>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '200px',
                        marginBottom: '10px',
                        marginTop: '10px',
                        padding: '8px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease-in-out',
                    }}
                />
            </div>
            <div>
                <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }}>Seller MarketPlace</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {sellers.filter((seller) =>
                    seller.FullName.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((seller) => (
                    <Card key={seller._id} style={{ width: '18rem', margin: '10px' }}>
                        {/* Add other card content based on the seller data */}
                        <Card.Img variant="top" src="/FreeLancerPic.jpg" style={{ width: '100%', height: '150px' }} />
                        <Card.Body>
                            <Card.Title>{seller.FullName}</Card.Title>
                            <Card.Text>
                                <p>
                                    <b>Email: </b>
                                    {seller.Email}
                                </p>
                                <p>
                                    <b>Experience: </b>
                                    {seller.Experience}
                                </p>
                                <p>
                                    <b>Contact: </b>
                                    {seller.Contact}
                                </p>

                            </Card.Text>
                            <span>
                                <Button variant="outline-primary" style={{ marginRight: '10px' }} onClick={() => handleSellerDetailClick(seller)} >
                                    View Detail
                                </Button>
                            </span>
                            <span> {/* DEFINE IN component ChatSeller */}
                                <ChatSeller sellerId={seller._id} sellerName={seller.FullName} />
                            </span>

                        </Card.Body>
                    </Card>
                ))}

                {/* Assuming you have a DetailSeller component */}
                <DetailSeller show={sellerDetailModalShow} onHide={() => setSellerDetailModalShow(false)} seller={selectedSeller} />
            </div>
        </div>
    );
}

export default SellerCard;
