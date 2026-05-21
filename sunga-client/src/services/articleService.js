const API_BASE = `${import.meta.env.VITE_API_URL}/articles`;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const request = async (path = '', options = {}) => {
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

export const fetchArticles = async () => {
  const data = await request('/');
  return data.articles || [];
};

export const fetchArticle = (slug) => request(`/${slug}`);

export const createArticle = (article) =>
  request('/', {
    method: 'POST',
    body: JSON.stringify(article),
  });

export const updateArticle = (id, article) =>
  request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(article),
  });

export const updateArticleStatus = (id, isActive) =>
  request(`/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });

export const deleteArticle = (id) =>
  request(`/${id}`, {
    method: 'DELETE',
  });
