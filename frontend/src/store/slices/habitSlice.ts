import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHabitsApi, addHabitApi, logHabitApi, deleteHabitApi } from '@/lib/api';
import { updateXp } from './authSlice';
import { Habit, HabitDayStatus } from '@/types/tasks';

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

interface LogHabitPayload {
  id: number;
  date: string;
  value: number;
  goalValue: number;
}

export const logHabit = createAsyncThunk(
  'habits/log',
  async ({ id, date, value, goalValue }: LogHabitPayload, { dispatch }) => {
    dispatch(optimisticLog({ id, date, value, goalValue }));
    try {
      const data = await logHabitApi(id, value, date);
      dispatch(updateXp({ xp_earned: data.xp_earned, level: data.level }));
      dispatch(fetchHabits());
    } catch {
      dispatch(fetchHabits()); // revert by re-fetching
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
    optimisticLog(state, action: { payload: LogHabitPayload }) {
      const { id, date, value, goalValue } = action.payload;
      const habit = state.habits.find((h) => h.id === id);
      if (!habit) return;
      const todayStr = new Date().toLocaleDateString('en-CA');
      const day = habit.week?.find((d) => d.date === date);
      if (day) {
        day.value = value;
        let status: HabitDayStatus;
        if (value <= 0) {
          status = date < todayStr ? 'missed' : 'pending';
        } else if (value >= goalValue) {
          status = 'completed';
        } else {
          status = 'partial';
        }
        day.status = status;
      }
      if (date === todayStr) {
        habit.completed_today = value >= goalValue;
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

export const { optimisticLog } = habitSlice.actions;
export default habitSlice.reducer;
