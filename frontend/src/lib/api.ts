const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Auth APIs
export const signUpApi = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.detail || data.error || 'Sign up failed.');
  }
  return data;
};

export const signInApi = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/user/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.detail || data.error || 'Sign in failed.');
  }
  return data;
};

// Profile APIs
export const fetchProfileApi = async () => {
  const res = await fetch(`${API_URL}/user/profile`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch profile.');
  return data.profile;
};

// Pomodoro APIs
export const fetchSessionsApi = async () => {
  const res = await fetch(`${API_URL}/pomodoro/sessions`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch sessions.');
  return data;
};

export const completeSessionApi = async (duration: number = 25) => {
  const res = await fetch(`${API_URL}/pomodoro/complete`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ duration }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to log session.');
  return data;
};

// Time Block APIs
export const fetchTimeBlocksApi = async () => {
  const res = await fetch(`${API_URL}/time-blocks/list`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch time blocks.');
  return data.blocks;
};

export const addTimeBlockApi = async (title: string, start_time: string, end_time: string, category: string) => {
  const res = await fetch(`${API_URL}/time-blocks/add`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, start_time, end_time, category }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to add time block.');
  return data;
};

export const deleteTimeBlockApi = async (id: number) => {
  const res = await fetch(`${API_URL}/time-blocks/delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to delete time block.');
  return data;
};

// Quest APIs
export const fetchQuestsApi = async () => {
  const res = await fetch(`${API_URL}/quests/list`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch quests.');
  return data.quests;
};

export const addQuestApi = async (title: string, type: string) => {
  const res = await fetch(`${API_URL}/quests/add`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, type }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to add quest.');
  return data;
};

export const completeQuestApi = async (id: number) => {
  const res = await fetch(`${API_URL}/quests/complete/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to complete quest.');
  return data;
};

export const deleteQuestApi = async (id: number) => {
  const res = await fetch(`${API_URL}/quests/delete/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to delete quest.');
  return data;
};
