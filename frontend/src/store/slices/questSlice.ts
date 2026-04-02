import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchQuestsApi, addQuestApi, completeQuestApi, deleteQuestApi } from '@/lib/api';
import { Task } from '@/types/tasks';

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
  async (id: number, { dispatch }) => {
    await completeQuestApi(id);
    dispatch(fetchQuests());
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
  reducers: {},
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

export default questSlice.reducer;
