import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Define the missing functions from your image
  const handleClick = (currentIndex) => setRating(currentIndex);
  const handleMouseEnter = (currentIndex) => setHover(currentIndex);
  const handleMouseLeave = () => setHover(0);

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        const starValue = index + 1; // Use this instead of index += 1

        return (
          <FaStar
            key={starValue}
            // Use camelCase for React events as shown in your image
            onClick={() => handleClick(starValue)}
            onMouseMove={() => handleMouseEnter(starValue)}
            onMouseLeave={() => handleMouseLeave()}
            // Change color based on current rating or hover state
            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size={40}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
