import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSessionsApi, completeSessionApi } from '@/lib/api';
import { updateXp } from './authSlice';

interface PomodoroState {
  sessionsToday: number;
  loading: boolean;
}

const initialState: PomodoroState = {
  sessionsToday: 0,
  loading: false,
};

export const fetchSessions = createAsyncThunk('pomodoro/fetchSessions', async () => {
  const data = await fetchSessionsApi();
  return data.sessions_today;
});

export const completeSession = createAsyncThunk(
  'pomodoro/completeSession',
  async (duration: number, { dispatch }) => {
    const data = await completeSessionApi(duration);
    dispatch(updateXp({ xp_earned: data.xp_earned, level: data.level }));
    return data.sessions_today;
  }
);

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.sessionsToday = action.payload;
      })
      .addCase(completeSession.fulfilled, (state, action) => {
        state.sessionsToday = action.payload;
      });
  },
});

export default pomodoroSlice.reducer;
