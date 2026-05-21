import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser as loginService } from '../services/userService';

const AuthContext = createContext(null);

const normalizeRole = (role) => (role || 'viewer').toLowerCase();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        setAuth(JSON.parse(saved));
      } catch {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = async (credentials) => {
    const email = credentials.email.trim().toLowerCase();
    let data;
    try {
      data = await loginService({ ...credentials, email });
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Unable to reach the login server. Check that the backend is running.');
      }
      throw error;
    }
    const role = normalizeRole(data.role || data.type);

    if (role === 'viewer') {
      throw new Error('Viewers are not allowed to log in.');
    }

    const nextAuth = {
      token: data.token,
      type: role,
      role,
      firstName: data.firstName,
      email,
    };
    localStorage.setItem('auth', JSON.stringify(nextAuth));
    localStorage.setItem('token', data.token);
    setAuth(nextAuth);
    return nextAuth;
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setAuth(null);
  };

  const value = useMemo(
    () => ({ auth, login, logout, isAuthenticated: Boolean(auth?.token) }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
