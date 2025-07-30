import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuthAPI } from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const authAPI = useAuthAPI();

  // Configurar interceptor de axios para agregar token automáticamente
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Cleanup function para remover el interceptor
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        const result = await authAPI.getMe();
        if (result.success) {
          setUser(result.data.user);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const result = await authAPI.login(email, password);
    if (result.success) {
      setToken(result.data.token);
      localStorage.setItem('token', result.data.token);
      setUser(result.data.user);
      return { success: true, user: result.data.user };
    } else {
      return { success: false, message: result.error };
    }
  };

  const register = async (nombre, email, password, tipo) => {
    const result = await authAPI.register(nombre, email, password, tipo);
    if (result.success) {
      setToken(result.data.token);
      localStorage.setItem('token', result.data.token);
      setUser(result.data.user);
      return { success: true };
    } else {
      return { success: false, message: result.error };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);