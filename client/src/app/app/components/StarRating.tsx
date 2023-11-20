import React, { useState } from "react";

interface Props {
  totalStars?: number;
  onRating: (rating: number) => void;
  customClassName: string;
}

const StarRating = (props: Props) => {
  const { totalStars = 5, onRating, customClassName } = props;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
    onRating(index);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer ${customClassName} ${
            index < (hoverRating || rating)
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
