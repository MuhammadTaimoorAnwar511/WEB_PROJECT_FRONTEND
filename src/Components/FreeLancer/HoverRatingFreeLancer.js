import ReactStars from "react-rating-stars-component";
import React from "react";

const HoverRatingFreeLancer = ({ freelancerId}) => {

  const ratingChanged = async (newRating) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/client/rate-freelancer/${freelancerId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: newRating }),
      });

      if (response.ok) {
        // Assuming your API returns updated freelancer data with average rating
        const data = await response.json();
      
      } else {
        console.error('Failed to update rating');
      }
    } catch (error) {
      console.error('Error during rating update:', error);
    }
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      activeColor="#ffd700"
    />
  );
};

export default HoverRatingFreeLancer;
