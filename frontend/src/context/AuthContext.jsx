import { createContext, useEffect, useMemo, useState } from 'react';
import { login, signup } from '../services/authService.js';

const TOKEN_KEY = 'workout-planner-token';
const USER_KEY = 'workout-planner-user';

export const AuthContext = createContext(null);

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === TOKEN_KEY && !event.newValue) {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  function storeSession(response) {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setUser(response.user);
  }

  async function signUp(credentials) {
    const response = await signup(credentials);
    storeSession(response);
    return response.user;
  }

  async function signIn(credentials) {
    const response = await login(credentials);
    storeSession(response);
    return response.user;
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && localStorage.getItem(TOKEN_KEY)),
      signUp,
      signIn,
      signOut,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
