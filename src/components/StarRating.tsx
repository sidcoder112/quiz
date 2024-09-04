import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../slices/reviewSlice';

const StarRating: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [thankYou, setThankYou] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (rating > 0) {
      dispatch(addReview({ rating }));
      setRating(0);
      setThankYou(true);
      console.log('Review submitted:', { rating });
    } else {
      console.log('Rating must be greater than 0');
    }
  };

  return (
    <div>
      {!thankYou ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </>
      ) : (
        <p className="mt-4 text-green-600">Thank you for your review!</p>
      )}
    </div>
  );
};

export default StarRating;
