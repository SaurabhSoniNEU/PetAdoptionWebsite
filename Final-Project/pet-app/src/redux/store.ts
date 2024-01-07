// store.ts
import { configureStore } from '@reduxjs/toolkit';
import adoptionReducer from './reducers';

const store = configureStore({
  reducer: {
    adoption: adoptionReducer,
  },
});

export default store;

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
