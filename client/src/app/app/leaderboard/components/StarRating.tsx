import React, { useState } from "react";

interface Props {
  totalStars?: number;
  onRating: (rating: number) => void;
  rating: number;
  disabled?: boolean;
  customClassName: string;
}

const StarRating = (props: Props) => {
  const { totalStars = 5, onRating, customClassName, rating, disabled } = props;
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (disabled) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (disabled) return;
    onRating(index);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`${!disabled && "cursor-pointer"} ${customClassName} ${
            index < rating ? "text-yellow-500" : "text-gray-300"
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
