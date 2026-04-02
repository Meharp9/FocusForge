import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuestsApi, addQuestApi, completeQuestApi, deleteQuestApi } from '@/lib/api';
import { updateXp } from './authSlice';
import { Task } from '@/types/tasks';
import type { RootState } from '../store';

interface QuestState {
  quests: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestState = {
  quests: [],
  loading: false,
  error: null,
};

export const fetchQuests = createAsyncThunk('quests/fetch', async () => {
  return await fetchQuestsApi();
});

export const addQuest = createAsyncThunk(
  'quests/add',
  async ({ title, type }: { title: string; type: string }, { dispatch }) => {
    await addQuestApi(title, type);
    dispatch(fetchQuests());
  }
);

export const completeQuest = createAsyncThunk(
  'quests/complete',
  async (id: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const quest = state.quests.quests.find((q) => q.id === id);
    const previousCompleted = quest?.completed ?? false;

    // Optimistic toggle
    dispatch(toggleQuestCompleted(id));

    try {
      const data = await completeQuestApi(id);
      dispatch(updateXp({ xp_earned: data.xp_earned, level: data.level }));
    } catch {
      // Revert on failure
      if (quest && quest.completed === previousCompleted) {
        dispatch(toggleQuestCompleted(id));
      }
      dispatch(fetchQuests());
    }
  }
);

export const deleteQuest = createAsyncThunk(
  'quests/delete',
  async (id: number, { dispatch }) => {
    await deleteQuestApi(id);
    dispatch(fetchQuests());
  }
);

const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    toggleQuestCompleted(state, action: { payload: number }) {
      const quest = state.quests.find((q) => q.id === action.payload);
      if (quest) quest.completed = !quest.completed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.loading = false;
        state.quests = action.payload;
      })
      .addCase(fetchQuests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quests.';
      });
  },
});

export const { toggleQuestCompleted } = questSlice.actions;
export default questSlice.reducer;
