// MyVerticallyCenteredModal.js
import React ,{ useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditIcon(props) 
{
    const [formData, setFormData] = useState({
        FullName: "",
        Email: "",
        Password: "",
        Interests: [],
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Check if the field is Interests and handle it as an array
        if (name === 'Interests') 
        {
          const interestsArray = value.replace(/^\s*,/, '').split(',').map(interest => interest.trim());
          setFormData({ ...formData, [name]: interestsArray });
        } 
        else 
        {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSaveChanges = () => {
        const token = localStorage.getItem('token');
    
        fetch('http://localhost:3001/api/client/profile/update', {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            // Handle success, e.g., close the modal or show a success message
            //console.log('Update successful', data);
            props.onHide();
          })
          .catch(error => {
            // Handle error, e.g., show an error message
            console.error('Error updating profile', error);
          });
      };
        
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>     
        <div>
            <h5 className="card-title" style={{ position: 'relative' }}>FULLNAME: </h5>
            <input type="text" id="fullname" name="FullName" value={formData.FullName}  onChange={handleChange} />
            <p className="card-text">Email: </p>
            <input type="email" id="email" name="Email" value={formData.Email} onChange={handleChange} />
            <p className="card-text">Password:</p>
            <input type="password" id="password" name="Password" value={formData.Password} onChange={handleChange} />
            <p className="card-text">Interests: </p>
            <input type="text" id="Interests" name="Interests" value={formData.Interests.join(', ')} placeholder=' enter , separated ' onChange={handleChange} />

            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={handleSaveChanges} > Save Changes </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditIcon;
