import React, { FC } from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

interface Props {
  rating: number;
}

const Rating: FC<Props> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;
	
  const fullStarElements = Array.from({ length: fullStars }, (_, index) => (
    <FaStar key={`full-star-${index}`} color='yellow' />
  ));

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <FaStarHalf key="half-star" color='yellow' />;
  }

  return (
    <div className='flex'>
      {fullStarElements} {halfStarElement}
    </div>
  );
};

export default Rating;