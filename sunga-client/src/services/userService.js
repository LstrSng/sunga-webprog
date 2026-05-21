const API_BASE = `${import.meta.env.VITE_API_URL}/users`;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: getHeaders(),
    ...options,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = data?.message || response.statusText || 'Request failed';
    throw new Error(error);
  }
  return data;
};

export const fetchUsers = () => request('/');
export const createUser = (user) => request('/', {
  method: 'POST',
  body: JSON.stringify(user),
});
export const updateUser = (id, user) => request(`/${id}`, {
  method: 'PUT',
  body: JSON.stringify(user),
});
export const deleteUser = (id) => request(`/${id}`, {
  method: 'DELETE',
});
export const loginUser = (credentials) => request('/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});
