
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryEntry {
  userId: string;
  category: string | null;
  difficulty: string | null;
  score: number;
  totalQuestions: number;
  startTime?: string;
  endTime?: string;
}

interface QuizState {
  history: HistoryEntry[];
}

const initialState: QuizState = {
  history: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<HistoryEntry>) {
      const entry = action.payload;
      const exists = state.history.some(
        e =>
          e.userId === entry.userId &&
          e.category === entry.category &&
          e.difficulty === entry.difficulty &&
          e.score === entry.score &&
          e.totalQuestions === entry.totalQuestions &&
          e.startTime === entry.startTime &&
          e.endTime === entry.endTime
      );
      if (!exists) {
        state.history.push(entry);
      }
    },
    
    
  },
});

export const { addToHistory, } = quizSlice.actions;
export default quizSlice.reducer;





