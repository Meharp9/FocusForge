import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInApi, signUpApi, fetchProfileApi } from '@/lib/api';

interface AuthState {
  token: string | null;
  user: { id: number; email: string } | null;
  level: number;
  xpEarned: number;
  xpToNextLevel: number;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  user: null,
  level: 1,
  xpEarned: 0,
  xpToNextLevel: 100,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signUpApi(email, password);
    localStorage.setItem('access_token', data.access_token);
    return data;
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signInApi(email, password);
    localStorage.setItem('access_token', data.access_token);
    return data;
  }
);

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  return await fetchProfileApi();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.level = 1;
      state.xpEarned = 0;
      state.xpToNextLevel = 100;
      state.error = null;
      localStorage.removeItem('access_token');
    },
    clearError(state) {
      state.error = null;
    },
    updateXp(state, action: { payload: { xp_earned: number; level: number } }) {
      state.xpEarned = action.payload.xp_earned;
      state.level = action.payload.level;
      state.xpToNextLevel = action.payload.level * 100;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed.';
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed.';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = { id: action.payload.id, email: action.payload.email };
        state.level = action.payload.level;
        state.xpEarned = action.payload.xp_earned;
        state.xpToNextLevel = action.payload.level * 100;
      });
  },
});

export const { logout, clearError, updateXp } = authSlice.actions;
export default authSlice.reducer;
