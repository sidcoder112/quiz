


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import quizReducer from './slices/quizSlice';
import settingsReducer from './slices/settingsSlice';
import reviewReducer from './slices/reviewSlice'; 

const persistConfig = {
  key: 'root',
  storage,
};
const persistReviewConfig = {
  key:'review',
  storage
}
const persistSettingsConfig = {
  key:'settings',
  storage
}
const persistedQuizReducer = persistReducer(persistConfig, quizReducer);
const persistedReviewReducer = persistReducer(persistReviewConfig,reviewReducer)
const persistedSettingsReducer = persistReducer(persistSettingsConfig,settingsReducer)
export const store = configureStore({
  reducer: {
    quiz: persistedQuizReducer,
    settings: persistedSettingsReducer,
    review: persistedReviewReducer, 
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
