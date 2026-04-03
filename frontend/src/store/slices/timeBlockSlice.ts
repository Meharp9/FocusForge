import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTimeBlocksApi, addTimeBlockApi, deleteTimeBlockApi } from '@/lib/api';

export interface TimeBlockItem {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  category: string;
}

interface TimeBlockState {
  blocks: TimeBlockItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TimeBlockState = {
  blocks: [],
  loading: false,
  error: null,
};

export const fetchTimeBlocks = createAsyncThunk('timeBlocks/fetch', async () => {
  return await fetchTimeBlocksApi();
});

export const addTimeBlock = createAsyncThunk(
  'timeBlocks/add',
  async ({ title, start_time, end_time, category }: { title: string; start_time: string; end_time: string; category: string }, { dispatch }) => {
    await addTimeBlockApi(title, start_time, end_time, category);
    dispatch(fetchTimeBlocks());
  }
);

export const deleteTimeBlock = createAsyncThunk(
  'timeBlocks/delete',
  async (id: number, { dispatch }) => {
    await deleteTimeBlockApi(id);
    dispatch(fetchTimeBlocks());
  }
);

const timeBlockSlice = createSlice({
  name: 'timeBlocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeBlocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeBlocks.fulfilled, (state, action) => {
        state.loading = false;
        state.blocks = action.payload;
      })
      .addCase(fetchTimeBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch time blocks.';
      });
  },
});

export default timeBlockSlice.reducer;
