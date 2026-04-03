import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHabitsApi, addHabitApi, toggleHabitApi, deleteHabitApi } from '@/lib/api';
import { updateXp } from './authSlice';
import { Habit } from '@/types/tasks';

interface HabitState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  loading: false,
  error: null,
};

export const fetchHabits = createAsyncThunk('habits/fetch', async () => {
  return await fetchHabitsApi();
});

export const addHabit = createAsyncThunk(
  'habits/add',
  async (title: string, { dispatch }) => {
    await addHabitApi(title);
    dispatch(fetchHabits());
  }
);

export const toggleHabit = createAsyncThunk(
  'habits/toggle',
  async (id: number, { dispatch }) => {
    dispatch(optimisticToggle(id));
    try {
      const data = await toggleHabitApi(id);
      dispatch(updateXp({ xp_earned: data.xp_earned, level: data.level }));
      dispatch(fetchHabits());
    } catch {
      dispatch(optimisticToggle(id));
      dispatch(fetchHabits());
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/delete',
  async (id: number, { dispatch }) => {
    await deleteHabitApi(id);
    dispatch(fetchHabits());
  }
);

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    optimisticToggle(state, action: { payload: number }) {
      const habit = state.habits.find((h) => h.id === action.payload);
      if (habit) habit.completed_today = !habit.completed_today;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch habits.';
      });
  },
});

export const { optimisticToggle } = habitSlice.actions;
export default habitSlice.reducer;
