import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  rating: number;

}

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
      console.log('Review added:', action.payload);
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
