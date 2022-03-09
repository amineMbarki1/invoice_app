/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback(({ userId, token, name }) => {
    setToken(token);
    setUserId(userId);
    setUserName(name);

    localStorage.setItem('user', JSON.stringify({ userId, token, name }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUserName(null);

    localStorage.setItem('user', null);
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.token)
      login({ name: userData.name, userId: userData.id, token: userData.token });
  }, [login]);

  return { token, userId, userName, login, logout };
};

export default useAuth;
