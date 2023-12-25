import ReactStars from "react-rating-stars-component";
import React from "react";

const HoverRatingSeller = ({ projectId }) => {
  const ratingChanged = async (newRating) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/client/addReview/${projectId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Rating: newRating }),
      });

      if (response.ok) {
        // Assuming your API returns a success message
        const data = await response.json();
        console.log(data.Message); // Log the success message
      } else {
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Error during review addition:', error);
    }
  };

  return (
    <>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
    </>
  );
};

export default HoverRatingSeller;
