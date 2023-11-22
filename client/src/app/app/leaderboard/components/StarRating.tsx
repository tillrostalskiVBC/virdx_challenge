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
  const [hoverRating, setHoverRating] = useState(rating);

  const handleMouseEnter = (index: number) => {
    if (disabled) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoverRating(rating);
  };

  const handleClick = (index: number) => {
    if (disabled) return;
    onRating(index);
  };

  const getStarColour = (index: number) => {
    const relevantRating = disabled ? rating : hoverRating;
    return index < relevantRating ? "text-yellow-500" : "text-gray-300";
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`${
            !disabled && "cursor-pointer"
          } ${customClassName} ${getStarColour(index)}`}
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
