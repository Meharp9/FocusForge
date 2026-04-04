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

interface AddHabitPayload {
  title: string;
  goal_value: number;
  unit: string;
  start_date: string;
  end_date: string | null;
}

export const addHabit = createAsyncThunk(
  'habits/add',
  async ({ title, goal_value, unit, start_date, end_date }: AddHabitPayload, { dispatch }) => {
    await addHabitApi(title, goal_value, unit, start_date, end_date);
    dispatch(fetchHabits());
  }
);

export const toggleHabit = createAsyncThunk(
  'habits/toggle',
  async ({ id, date }: { id: number; date: string }, { dispatch }) => {
    dispatch(optimisticToggle({ id, date }));
    try {
      const data = await toggleHabitApi(id, date);
      dispatch(updateXp({ xp_earned: data.xp_earned, level: data.level }));
      dispatch(fetchHabits());
    } catch {
      dispatch(optimisticToggle({ id, date }));
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
    optimisticToggle(state, action: { payload: { id: number; date: string } }) {
      const { id, date } = action.payload;
      const habit = state.habits.find((h) => h.id === id);
      if (!habit) return;
      const todayStr = new Date().toISOString().split('T')[0];
      const day = habit.week?.find((d) => d.date === date);
      if (day) {
        if (day.status === 'completed') {
          day.status = date < todayStr ? 'missed' : 'pending';
        } else {
          day.status = 'completed';
        }
      }
      if (date === todayStr) {
        habit.completed_today = !habit.completed_today;
      }
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
