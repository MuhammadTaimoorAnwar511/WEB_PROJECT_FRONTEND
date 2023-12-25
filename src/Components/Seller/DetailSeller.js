import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../Style/Home/projectDetail.css';
import SellerProjectsSeller from './SampleProjectSeller';

function DetailSeller(props) {
    const { seller } = props;

    // Check if the seller data is valid
    if (!seller || typeof seller !== 'object' || !seller._id || !Array.isArray(seller.Specialities)) {
        return null;
    }

    return (
        <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="ModalHeader" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="ProjectDetailTitle">
                        Seller Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ProjectDetailContainer">
                        <p><b>Seller ID:</b> {seller._id}</p>
                        <p><b>Full Name:</b> {seller.FullName}</p>
                        <p><b>Email:</b> {seller.Email}</p>
                        <p><b>Contact: </b>{seller.Contact}</p>
                        <p><b>Specialities:</b> {seller.Specialities.join(', ')}</p>
                        <p><b>Experience: </b>{seller.Experience}</p>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer className="ModalFooter">
                    <Button variant="secondary" className="ButtonClose" onClick={props.onHide}>
                        Close
                    </Button>
                    {/* Assuming you have a component named SampleProject for sellers */}
                    <SellerProjectsSeller seller={seller} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailSeller;
