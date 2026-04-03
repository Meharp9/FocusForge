import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questReducer from './slices/questSlice';
import pomodoroReducer from './slices/pomodoroSlice';
import timeBlockReducer from './slices/timeBlockSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quests: questReducer,
    pomodoro: pomodoroReducer,
    timeBlocks: timeBlockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
